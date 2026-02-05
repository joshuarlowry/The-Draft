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

const checkDuplicateIds = (items, source) => {
  const ids = items.map(item => item.id).filter(Boolean);
  const seen = new Set();
  const duplicates = [];
  for (const id of ids) {
    if (seen.has(id)) {
      duplicates.push(id);
    }
    seen.add(id);
  }
  if (duplicates.length > 0) {
    console.warn(`⚠️  Warning: Duplicate IDs found in ${source}: ${duplicates.join(', ')}`);
  }
};

const main = () => {
  const startTime = Date.now();
  const people = loadYaml('people.yml');
  const sources = loadYaml('sources.yml');
  const sourceSummaries = loadYaml('source_summaries.yml');
  const citations = loadYaml('citations.yml');

  // Check for duplicate IDs in data sources
  checkDuplicateIds(citations, 'citations.yml');
  checkDuplicateIds(sources, 'sources.yml');
  checkDuplicateIds(people, 'people.yml');
  checkDuplicateIds(sourceSummaries, 'source_summaries.yml');

  // Build lookup maps for O(1) access
  const citationMap = new Map(citations.map(c => [c.id, c]));
  const sourceMap = new Map(sources.map(s => [s.id, s]));
  const peopleMap = new Map(people.map(p => [p.id, p]));
  const sourceSummaryMap = new Map(sourceSummaries.map(s => [s.source_id, s]));

  // Pre-load all blocks to avoid duplicate file reads
  const blockCache = new Map();
  const blocksDir = path.join(SRC, 'blocks', 'argument');
  if (fs.existsSync(blocksDir)) {
    const blockFiles = fs.readdirSync(blocksDir).filter(f => f.endsWith('.md'));
    for (const file of blockFiles) {
      const blockId = file.replace(/\.md$/, '');
      const content = fs.readFileSync(path.join(blocksDir, file), 'utf8');
      const data = parseFrontMatter(content);
      blockCache.set(blockId, { id: blockId, data });
    }
  }

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
        const cachedBlock = blockCache.get(blockId);
        if (!cachedBlock) return [];
        const citationIds = cachedBlock.data.citations || [];
        return citationIds
          .map((cid) => {
            const citation = citationMap.get(cid);
            return citation ? citation.source_id : null;
          })
          .filter(Boolean);
      });
      const articlePeopleIds = [...new Set(
        articleSourceIds.flatMap(sourceId => {
          const source = sourceMap.get(sourceId);
          if (!source) return [];
          return [...(source.author_ids || []), ...(source.mentioned_people_ids || [])];
        })
      )];
      const peopleSlugs = articlePeopleIds
        .map((pid) => {
          const person = peopleMap.get(pid);
          return person ? getPersonSlug(person) : null;
        })
        .filter(Boolean);

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
    const summary = sourceSummaryMap.get(source.id);
    const url = `${PATH_PREFIX}summaries/${source.id}/`;
    const peopleIds = [...(source.author_ids || []), ...(source.mentioned_people_ids || [])];
    const peopleSlugs = peopleIds
      .map((pid) => {
        const person = peopleMap.get(pid);
        return person ? getPersonSlug(person) : null;
      })
      .filter(Boolean);

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
  const duration = Date.now() - startTime;
  console.log(`Wrote ${items.length} items to ${outPath} in ${duration}ms`);
};

main();
