const yaml = require('js-yaml');

module.exports = function (eleventyConfig) {
  // Add YAML support for data files
  eleventyConfig.addDataExtension('yml', (contents) => yaml.load(contents));

  // Pass through static assets
  eleventyConfig.addPassthroughCopy('src/styles');
  eleventyConfig.addPassthroughCopy('src/images');

  // Collection: All argument blocks
  eleventyConfig.addCollection('argumentBlocks', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/blocks/argument/*.md');
  });

  // Collection: All concepts
  eleventyConfig.addCollection('concepts', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/concepts/*.md');
  });

  // Collection: All articles
  eleventyConfig.addCollection('articles', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/articles/*.md');
  });

  // Filter: Get a block by ID from collections
  eleventyConfig.addFilter('getBlockById', function (blocks, id) {
    return blocks.find((block) => block.data.id === id);
  });

  // Filter: Slugify a term for URLs
  eleventyConfig.addFilter('slugifyTerm', function (value) {
    if (value === undefined || value === null) return '';
    return value
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  });

  // Filter: Get a citation by ID from citations data
  eleventyConfig.addFilter('getCitationById', function (citations, id) {
    return citations.find((citation) => citation.id === id);
  });

  // Filter: Get a source by ID from sources data
  eleventyConfig.addFilter('getSourceById', function (sources, id) {
    return sources.find((source) => source.id === id);
  });

  // Filter: Get a source summary by source ID
  eleventyConfig.addFilter('getSourceSummaryById', function (summaries, id) {
    return summaries.find((summary) => summary.source_id === id);
  });

  const collectPeopleIdsForSource = (source = {}) => {
    const authorIds = Array.isArray(source.author_ids) ? source.author_ids : [];
    const mentionedIds = Array.isArray(source.mentioned_people_ids)
      ? source.mentioned_people_ids
      : [];
    return [...new Set([...authorIds, ...mentionedIds])];
  };

  // Filter: Get people by IDs
  eleventyConfig.addFilter('getPeopleByIds', function (people = [], ids = []) {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    return people.filter((person) => ids.includes(person.id));
  });

  // Filter: Get people for a single source
  eleventyConfig.addFilter('getPeopleBySource', function (people = [], source = {}) {
    const peopleIds = collectPeopleIdsForSource(source);
    if (peopleIds.length === 0) return [];
    return people.filter((person) => peopleIds.includes(person.id));
  });

  // Filter: Get people by multiple source IDs
  eleventyConfig.addFilter(
    'getPeopleBySourceIds',
    function (people = [], sources = [], sourceIds = []) {
      if (!Array.isArray(sourceIds) || sourceIds.length === 0) return [];
      const peopleIds = sourceIds
        .map((sourceId) => sources.find((source) => source.id === sourceId))
        .filter(Boolean)
        .flatMap((source) => collectPeopleIdsForSource(source));
      const uniqueIds = [...new Set(peopleIds)];
      return people.filter((person) => uniqueIds.includes(person.id));
    },
  );

  // Filter: Get a reading tag group by ID
  eleventyConfig.addFilter('getReadingTagById', function (tags, id) {
    return tags.find((tag) => tag.id === id);
  });

  // Filter: Get sources matching a reading tag
  eleventyConfig.addFilter('getSourcesByTag', function (sources, tagId) {
    return sources.filter((source) => Array.isArray(source.tags) && source.tags.includes(tagId));
  });

  // Filter: Get a concept by ID
  eleventyConfig.addFilter('getConceptById', function (concepts, id) {
    return concepts.find((concept) => concept.data.id === id);
  });

  // Filter: Collect unique citation IDs for a list of block IDs
  eleventyConfig.addFilter('collectBlockCitations', function (blockIds = [], blocks = []) {
    if (!Array.isArray(blockIds) || !Array.isArray(blocks)) return [];
    const citations = blockIds
      .map((id) => blocks.find((block) => block.data.id === id))
      .filter(Boolean)
      .flatMap((block) => (Array.isArray(block.data.citations) ? block.data.citations : []));
    return [...new Set(citations)];
  });

  // Filter: Collect unique source IDs for a list of block IDs
  eleventyConfig.addFilter(
    'collectBlockSourceIds',
    function (blockIds = [], blocks = [], citations = []) {
      if (!Array.isArray(blockIds) || !Array.isArray(blocks) || !Array.isArray(citations)) {
        return [];
      }
      const sourceIds = blockIds
        .map((id) => blocks.find((block) => block.data.id === id))
        .filter(Boolean)
        .flatMap((block) => (Array.isArray(block.data.citations) ? block.data.citations : []))
        .map((citationId) => citations.find((citation) => citation.id === citationId))
        .filter(Boolean)
        .map((citation) => citation.source_id)
        .filter(Boolean);
      return [...new Set(sourceIds)];
    },
  );

  // Filter: Get sources for a person ID
  eleventyConfig.addFilter('getSourcesByPersonId', function (sources = [], personId) {
    if (!personId) return [];
    return sources.filter((source) => {
      const peopleIds = collectPeopleIdsForSource(source);
      return peopleIds.includes(personId);
    });
  });

  const getSourceFromCitation = (citation, sources = []) =>
    sources.find((item) => item.id === citation.source_id) || {};

  const getApaAuthorInline = (source = {}) => {
    const author = source.author || source.publisher || source.repository || 'Unknown';
    if (author.includes(',')) {
      const firstAuthor = author.split(',')[0].trim();
      return `${firstAuthor} et al.`;
    }
    return author;
  };

  const getApaInlineCitation = (source = {}) => {
    const author = getApaAuthorInline(source);
    const year = source.published || 'n.d.';
    return `${author}, ${year}`;
  };

  const formatApaReference = (source = {}) => {
    const author = source.author || source.publisher || source.repository || 'Unknown';
    const year = source.published || 'n.d.';
    const title = source.title || 'Untitled source';
    const container = source.journal || source.publisher || source.repository;
    const url = source.url;
    const accessed = source.accessed;
    const parts = [`${author}. (${year}). <em>${title}</em>.`];

    if (container && container !== author) {
      parts.push(`${container}.`);
    }

    if (url) {
      if (accessed) {
        parts.push(`Accessed ${accessed}.`);
      }
      parts.push(`<a href="${url}">${url}</a>`);
    }

    return parts.join(' ');
  };

  const urlFilter = eleventyConfig.getFilter('url');
  const parseDateValue = (value) => {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed;
  };

  const renderCitation = (citation, sources = [], summaries = []) => {
    const source = getSourceFromCitation(citation, sources);
    const inlineCitation = getApaInlineCitation(source);
    const summary = summaries.find((entry) => entry.source_id === citation.source_id);
    const summaryLink = summary ? urlFilter(`/summaries/${citation.source_id}/`) : null;
    const sourceLink = source.url ? `<a href="${source.url}">Original source</a>` : '';
    const summaryAnchor = summaryLink ? `<a href="${summaryLink}">Summary</a>` : '';
    const links = [summaryAnchor, sourceLink]
      .filter(Boolean)
      .join(' <span aria-hidden="true">•</span> ');

    return `<blockquote class="citation-block">
<p class="citation-quote">“${citation.quote}” <span class="citation-inline">(${inlineCitation})</span></p>
${links ? `<p class="citation-links">${links}</p>` : ''}
</blockquote>`;
  };

  // Filter: Render block content with citation placeholders resolved
  eleventyConfig.addFilter(
    'renderWithCitations',
    function (content, citations, sources = [], summaries = []) {
      if (!content || !citations) return content;

      // Replace [[cite:ID]] placeholders with rendered citation blockquotes
      return content.replace(/\[\[cite:([^\]]+)\]\]/g, function (match, citationId) {
        const citation = citations.find((c) => c.id === citationId.trim());
        if (citation) {
          return renderCitation(citation, sources, summaries);
        }
        return match; // Return original if citation not found
      });
    },
  );

  // Shortcode: Render a citation as a blockquote
  eleventyConfig.addShortcode('citation', function (citations, sources, id) {
    let citationId = id;
    let sourceList = sources;
    if (typeof sources === 'string') {
      citationId = sources;
      sourceList = [];
    }
    const citation = citations.find((c) => c.id === citationId);
    if (!citation) return `<!-- Citation ${citationId} not found -->`;
    return renderCitation(citation, sourceList);
  });

  eleventyConfig.addFilter(
    'renderCitationSection',
    function (citationIds = [], citations = [], sources = [], summaries = []) {
      if (!Array.isArray(citationIds) || citationIds.length === 0) return '';

      const sourceIds = citationIds
        .map((id) => citations.find((citation) => citation.id === id))
        .filter(Boolean)
        .map((citation) => citation.source_id);
      const uniqueSourceIds = [...new Set(sourceIds)];
      const entries = uniqueSourceIds
        .map((id) => sources.find((source) => source.id === id))
        .filter(Boolean)
        .map((source) => {
          const summary = summaries.find((entry) => entry.source_id === source.id);
          const summaryLink = summary ? urlFilter(`/summaries/${source.id}/`) : null;
          const links = [
            summaryLink ? `<a href="${summaryLink}">Summary</a>` : null,
            source.url ? `<a href="${source.url}">Original source</a>` : null,
          ]
            .filter(Boolean)
            .join(' <span aria-hidden="true">•</span> ');
          const linkMarkup = links ? `<div class="citation-links">${links}</div>` : '';
          return `<li class="citation-item">${formatApaReference(source)}${linkMarkup}</li>`;
        })
        .join('');

      if (!entries) return '';

      return `<section class="citation-section">
<h3>Citations</h3>
<ol class="citation-list">
${entries}
</ol>
</section>`;
    },
  );

  eleventyConfig.addFilter('rssDate', function (value) {
    const parsed = parseDateValue(value);
    if (!parsed) return '';
    return parsed.toUTCString();
  });

  eleventyConfig.addFilter('sortFeedItemsByDate', function (items = []) {
    return [...items].sort((itemA, itemB) => {
      const dateA = parseDateValue(itemA.date) || new Date(0);
      const dateB = parseDateValue(itemB.date) || new Date(0);

      if (dateA.getTime() !== dateB.getTime()) {
        return dateB - dateA;
      }

      return (itemA.title || '').localeCompare(itemB.title || '');
    });
  });

  eleventyConfig.addFilter('sortSummariesBySourceDate', function (summaries = [], sources = []) {
    return [...summaries].sort((summaryA, summaryB) => {
      const sourceA = sources.find((source) => source.id === summaryA.source_id) || {};
      const sourceB = sources.find((source) => source.id === summaryB.source_id) || {};
      const dateA = parseDateValue(sourceA.published || sourceA.accessed) || new Date(0);
      const dateB = parseDateValue(sourceB.published || sourceB.accessed) || new Date(0);

      if (dateA.getTime() !== dateB.getTime()) {
        return dateB - dateA;
      }

      return (sourceA.title || '').localeCompare(sourceB.title || '');
    });
  });

  return {
    pathPrefix: '/The-Draft/',
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data',
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
