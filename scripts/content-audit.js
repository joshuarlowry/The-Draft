const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');

const repoRoot = path.resolve(__dirname, '..');

const requiredClassification = [
  'primary_domain',
  'secondary_domains',
  'perspective',
  'classification_rationale'
];

function loadYaml(relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  return yaml.load(fs.readFileSync(fullPath, 'utf8'));
}

function listMarkdown(relativeDir) {
  const fullDir = path.join(repoRoot, relativeDir);
  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(fullDir, file));
}

function parseFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parts = content.split('---');
  return yaml.load(parts[1]);
}

function countMissingClassification(files) {
  return files.reduce((count, file) => {
    const frontMatter = parseFrontMatter(file) || {};
    const missingField = requiredClassification.some((field) => !(field in frontMatter));
    return missingField ? count + 1 : count;
  }, 0);
}

function main() {
  const sources = loadYaml('src/_data/sources.yml');
  const sourceSummaries = loadYaml('src/_data/source_summaries.yml');
  const citations = loadYaml('src/_data/citations.yml');

  const articleFiles = listMarkdown('src/articles');
  const blockFiles = listMarkdown('src/blocks/argument');
  const conceptFiles = listMarkdown('src/concepts');

  const sourceIds = new Set(sources.map((source) => source.id));
  const summarySourceIds = new Set(sourceSummaries.map((summary) => summary.source_id));
  const citationIds = new Set(citations.map((citation) => citation.id));

  const summariesMissingSource = [...summarySourceIds].filter((id) => !sourceIds.has(id));
  const sourcesWithoutSummary = [...sourceIds].filter((id) => !summarySourceIds.has(id));
  const citationsMissingSource = citations
    .map((citation) => citation.source_id)
    .filter((sourceId) => !sourceIds.has(sourceId));

  const articleMissingClassification = countMissingClassification(articleFiles);
  const blockMissingClassification = countMissingClassification(blockFiles);
  const conceptMissingClassification = countMissingClassification(conceptFiles);

  const blockFrontmatter = blockFiles.map((filePath) => parseFrontMatter(filePath));
  const articleFrontmatter = articleFiles.map((filePath) => parseFrontMatter(filePath));

  const lowCitationBlocks = blockFrontmatter
    .filter((block) => (block.citations || []).length < 2)
    .map((block) => `${block.id}:${(block.citations || []).length}`);

  const usedBlockIds = new Set(articleFrontmatter.flatMap((article) => article.blocks || []));
  const orphanBlockIds = blockFrontmatter
    .filter((block) => !usedBlockIds.has(block.id))
    .map((block) => block.id);

  const missingCitationRefs = [];
  const citeRegex = /\[\[cite:([a-z0-9_\-]+)\]\]/g;

  for (const filePath of blockFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = [...content.matchAll(citeRegex)];
    for (const match of matches) {
      const citationId = match[1];
      if (!citationIds.has(citationId)) {
        missingCitationRefs.push(`${path.basename(filePath)} -> ${citationId}`);
      }
    }
  }

  const citedSourceIds = new Set(citations.map((citation) => citation.source_id));
  const uncitedSourceIds = [...sourceIds].filter((id) => !citedSourceIds.has(id));

  const domainCounts = articleFrontmatter.reduce((acc, article) => {
    acc[article.primary_domain] = (acc[article.primary_domain] || 0) + 1;
    return acc;
  }, {});

  const report = {
    inventory: {
      sources: sources.length,
      source_summaries: sourceSummaries.length,
      citations: citations.length,
      articles: articleFiles.length,
      blocks: blockFiles.length,
      concepts: conceptFiles.length
    },
    integrity: {
      summaries_missing_source: summariesMissingSource,
      sources_without_summary: sourcesWithoutSummary,
      citations_missing_source: citationsMissingSource,
      article_missing_classification: articleMissingClassification,
      block_missing_classification: blockMissingClassification,
      concept_missing_classification: conceptMissingClassification,
      missing_citation_placeholders: missingCitationRefs
    },
    composition: {
      blocks_with_fewer_than_two_citations: lowCitationBlocks,
      orphan_blocks: orphanBlockIds,
      sources_without_quote_extractions: uncitedSourceIds.length,
      article_primary_domains: domainCounts
    }
  };

  console.log(JSON.stringify(report, null, 2));
}

main();
