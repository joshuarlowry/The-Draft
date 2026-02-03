const yaml = require('js-yaml');

module.exports = function (eleventyConfig) {
  // Add YAML support for data files
  eleventyConfig.addDataExtension('yml', (contents) => yaml.load(contents));

  // Pass through static assets
  eleventyConfig.addPassthroughCopy('src/styles');

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

  // Filter: Get a citation by ID from citations data
  eleventyConfig.addFilter('getCitationById', function (citations, id) {
    return citations.find((citation) => citation.id === id);
  });

  // Filter: Get a source by ID from sources data
  eleventyConfig.addFilter('getSourceById', function (sources, id) {
    return sources.find((source) => source.id === id);
  });

  // Filter: Get a reading bundle by ID
  eleventyConfig.addFilter('getBundleById', function (bundles, id) {
    return bundles.find((bundle) => bundle.id === id);
  });

  // Filter: Get a concept by ID
  eleventyConfig.addFilter('getConceptById', function (concepts, id) {
    return concepts.find((concept) => concept.data.id === id);
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
    const parts = [`${author}. (${year}). <em>${title}</em>.`];

    if (container && container !== author) {
      parts.push(`${container}.`);
    }

    if (url) {
      parts.push(`<a href="${url}">${url}</a>`);
    }

    return parts.join(' ');
  };

  const renderCitation = (citation, sources = []) => {
    const source = getSourceFromCitation(citation, sources);
    const inlineCitation = getApaInlineCitation(source);
    return `<blockquote class="citation-block">
<p class="citation-quote">“${citation.quote}” <span class="citation-inline">(${inlineCitation})</span></p>
</blockquote>`;
  };

  // Filter: Render block content with citation placeholders resolved
  eleventyConfig.addFilter('renderWithCitations', function (content, citations, sources = []) {
    if (!content || !citations) return content;

    // Replace [[cite:ID]] placeholders with rendered citation blockquotes
    return content.replace(/\[\[cite:([^\]]+)\]\]/g, function (match, citationId) {
      const citation = citations.find((c) => c.id === citationId.trim());
      if (citation) {
        return renderCitation(citation, sources);
      }
      return match; // Return original if citation not found
    });
  });

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
    function (citationIds = [], citations = [], sources = []) {
      if (!Array.isArray(citationIds) || citationIds.length === 0) return '';

      const sourceIds = citationIds
        .map((id) => citations.find((citation) => citation.id === id))
        .filter(Boolean)
        .map((citation) => citation.source_id);
      const uniqueSourceIds = [...new Set(sourceIds)];
      const entries = uniqueSourceIds
        .map((id) => sources.find((source) => source.id === id))
        .filter(Boolean)
        .map((source) => `<li class="citation-item">${formatApaReference(source)}</li>`)
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
