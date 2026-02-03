const yaml = require('js-yaml');

module.exports = function(eleventyConfig) {
  // Add YAML support for data files
  eleventyConfig.addDataExtension('yml', contents => yaml.load(contents));

  // Pass through static assets
  eleventyConfig.addPassthroughCopy('src/styles');

  // Collection: All argument blocks
  eleventyConfig.addCollection('argumentBlocks', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/blocks/argument/*.md');
  });

  // Collection: All concepts
  eleventyConfig.addCollection('concepts', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/concepts/*.md');
  });

  // Collection: All articles
  eleventyConfig.addCollection('articles', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/articles/*.md');
  });

  // Filter: Get a block by ID from collections
  eleventyConfig.addFilter('getBlockById', function(blocks, id) {
    return blocks.find(block => block.data.id === id);
  });

  // Filter: Get a citation by ID from citations data
  eleventyConfig.addFilter('getCitationById', function(citations, id) {
    return citations.find(citation => citation.id === id);
  });

  // Filter: Get a reading bundle by ID
  eleventyConfig.addFilter('getBundleById', function(bundles, id) {
    return bundles.find(bundle => bundle.id === id);
  });

  // Filter: Get a concept by ID
  eleventyConfig.addFilter('getConceptById', function(concepts, id) {
    return concepts.find(concept => concept.data.id === id);
  });

  // Filter: Render block content with citation placeholders resolved
  eleventyConfig.addFilter('renderWithCitations', function(content, citations) {
    if (!content || !citations) return content;

    // Replace [[cite:ID]] placeholders with rendered citation blockquotes
    return content.replace(/\[\[cite:([^\]]+)\]\]/g, function(match, citationId) {
      const citation = citations.find(c => c.id === citationId.trim());
      if (citation) {
        return `<blockquote>
<p><strong>"${citation.quote}"</strong></p>
<p>— <em>${citation.attribution}</em></p>
</blockquote>`;
      }
      return match; // Return original if citation not found
    });
  });

  // Shortcode: Render a citation as a blockquote
  eleventyConfig.addShortcode('citation', function(citations, id) {
    const citation = citations.find(c => c.id === id);
    if (!citation) return `<!-- Citation ${id} not found -->`;
    return `<blockquote>
<p><strong>"${citation.quote}"</strong></p>
<p>— <em>${citation.attribution}</em></p>
</blockquote>`;
  });

  return {
    pathPrefix: '/The-Draft/',
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data'
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
};
