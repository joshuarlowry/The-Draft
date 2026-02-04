#!/usr/bin/env node
/**
 * Builds a search index for The Draft.
 * Runs independently of Eleventy; output is consumed by the site.
 * Index format: { items: [{ title, url, summary, primary_domain, secondary_domains, people_slugs, tags }] }
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC = path.join(__dirname, '..', 'src');
const DIST = path.join(__dirname, '..', 'dist');
const PATH_PREFIX = '/The-Draft/';

const slugify = (value) => {
  if (value === undefined || value === null) return '';
  return value
    .toString()
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const getPersonSlug = (person) => {
  if (person.slug) return person.slug;
  if (person.id) return slugify(person.id);
  return '';
};

const loadYaml = (file) => {
  const p = path.join(SRC, '_data', file);
  if (!fs.existsSync(p)) return [];
  const raw = fs.readFileSync(p, 'utf8');
  return yaml.load(raw) || [];
};

const parseFrontMatter = (content) => {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  try {
    return yaml.load(match[1]) || {};
  } catch {
    return {};
  }
};

const main = () => {
  const people = loadYaml('people.yml');
  const sources = loadYaml('sources.yml');
  const sourceSummaries = loadYaml('source_summaries.yml');
  const citations = loadYaml('citations.yml');

  const items = [];

  // Articles (from file system)
  const articlesDir = path.join(SRC, 'articles');
  if (fs.existsSync(articlesDir)) {
    const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.md'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
      const data = parseFrontMatter(content);
      const id = data.id || file.replace(/\.md$/, '');
      const url = `${PATH_PREFIX}articles/${id}/`;
      const blockIds = data.blocks || [];
      const articleSourceIds = blockIds.flatMap((blockId) => {
        const blockFile = path.join(SRC, 'blocks', 'argument', `${blockId}.md`);
        if (!fs.existsSync(blockFile)) return [];
        const blockData = parseFrontMatter(fs.readFileSync(blockFile, 'utf8'));
        const citationIds = blockData.citations || [];
        return citationIds
          .map((cid) => (citations.find((c) => c.id === cid) || {}).source_id)
          .filter(Boolean);
      });
      const articlePeopleIds = [...new Set(
        (sources || [])
          .filter((s) => articleSourceIds.includes(s.id))
          .flatMap((s) => [...(s.author_ids || []), ...(s.mentioned_people_ids || [])])
      )];
      const peopleSlugs = articlePeopleIds
        .map((pid) => people.find((p) => p.id === pid))
        .filter(Boolean)
        .map(getPersonSlug);

      items.push({
        type: 'article',
        title: data.title || id,
        url,
        summary: data.summary || '',
        primary_domain: data.primary_domain || null,
        secondary_domains: Array.isArray(data.secondary_domains) ? data.secondary_domains : [],
        people_slugs: peopleSlugs,
        tags: (data.reading_tags || []).concat(data.topics || []).concat(data.categories || []),
      });
    }
  }

  // Blocks
  const blocksDir = path.join(SRC, 'blocks', 'argument');
  if (fs.existsSync(blocksDir)) {
    const files = fs.readdirSync(blocksDir).filter((f) => f.endsWith('.md'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(blocksDir, file), 'utf8');
      const data = parseFrontMatter(content);
      const id = data.id || file.replace(/\.md$/, '');
      const url = `${PATH_PREFIX}blocks/argument/${id}/`;
      const citationIds = data.citations || [];
      const sourceIds = citationIds
        .map((cid) => (citations.find((c) => c.id === cid) || {}).source_id)
        .filter(Boolean);
      const peopleIds = [...new Set(
        (sources || [])
          .filter((s) => sourceIds.includes(s.id))
          .flatMap((s) => [...(s.author_ids || []), ...(s.mentioned_people_ids || [])])
      )];
      const peopleSlugs = peopleIds
        .map((pid) => people.find((p) => p.id === pid))
        .filter(Boolean)
        .map(getPersonSlug);

      items.push({
        type: 'block',
        title: data.title || id,
        url,
        summary: '',
        primary_domain: data.primary_domain || null,
        secondary_domains: Array.isArray(data.secondary_domains) ? data.secondary_domains : [],
        people_slugs: peopleSlugs,
        tags: (data.tags || []).concat(data.topics || []).concat(data.categories || []),
      });
    }
  }

  // Concepts
  const conceptsDir = path.join(SRC, 'concepts');
  if (fs.existsSync(conceptsDir)) {
    const files = fs.readdirSync(conceptsDir).filter((f) => f.endsWith('.md'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(conceptsDir, file), 'utf8');
      const data = parseFrontMatter(content);
      const id = data.id || file.replace(/\.md$/, '');
      const url = `${PATH_PREFIX}concepts/${id}/`;

      items.push({
        type: 'concept',
        title: data.title || id,
        url,
        summary: '',
        primary_domain: data.primary_domain || null,
        secondary_domains: Array.isArray(data.secondary_domains) ? data.secondary_domains : [],
        people_slugs: [],
        tags: [],
      });
    }
  }

  // People
  for (const person of people) {
    const slug = getPersonSlug(person);
    if (!slug) continue;
    const url = `${PATH_PREFIX}people/${slug}/`;
    items.push({
      type: 'person',
      title: person.name,
      url,
      summary: person.profile_summary || person.summary || '',
      primary_domain: person.primary_domain || null,
      secondary_domains: Array.isArray(person.secondary_domains) ? person.secondary_domains : [],
      people_slugs: [slug],
      tags: [],
    });
  }

  // Sources (with summaries)
  for (const source of sources || []) {
    const summary = (sourceSummaries || []).find((s) => s.source_id === source.id);
    const url = `${PATH_PREFIX}summaries/${source.id}/`;
    const peopleIds = [...(source.author_ids || []), ...(source.mentioned_people_ids || [])];
    const peopleSlugs = peopleIds
      .map((pid) => people.find((p) => p.id === pid))
      .filter(Boolean)
      .map(getPersonSlug);

    items.push({
      type: 'source',
      title: source.title,
      url,
      summary: summary ? summary.summary : '',
      primary_domain: null,
      secondary_domains: [],
      people_slugs: peopleSlugs,
      tags: (summary?.tags || []).concat(source.tags || []),
    });
  }

  if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST, { recursive: true });
  }
  const outPath = path.join(DIST, 'search-index.json');
  fs.writeFileSync(outPath, JSON.stringify({ items }, null, 2), 'utf8');
  console.log(`Wrote ${items.length} items to ${outPath}`);
};

main();
