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

  // Filter: Get a source by ID from sources data
  eleventyConfig.addFilter('getSourceById', function(sources, id) {
    return sources.find(source => source.id === id);
  });

  // Filter: Get a reading bundle by ID
  eleventyConfig.addFilter('getBundleById', function(bundles, id) {
    return bundles.find(bundle => bundle.id === id);
  });

  // Filter: Get a concept by ID
  eleventyConfig.addFilter('getConceptById', function(concepts, id) {
    return concepts.find(concept => concept.data.id === id);
  });

  const renderCitation = (citation, sources = []) => {
    const source = sources.find(item => item.id === citation.source_id) || {};
    const title = citation.title || source.title || citation.attribution || 'Untitled source';
    const url = citation.url || source.url;
    const linkedTitle = url ? `<a href="${url}">${title}</a>` : title;
    const metaItems = [
      citation.author || source.author ? `Author: ${citation.author || source.author}` : null,
      citation.publisher || source.publisher ? `Publisher: ${citation.publisher || source.publisher}` : null,
      citation.journal || source.journal ? `Journal: ${citation.journal || source.journal}` : null,
      citation.repository || source.repository ? `Repository: ${citation.repository || source.repository}` : null,
      citation.published || source.published ? `Published: ${citation.published || source.published}` : null,
      citation.accessed || source.accessed ? `Accessed: ${citation.accessed || source.accessed}` : null,
      url ? `URL: <a href="${url}">${url}</a>` : null
    ].filter(Boolean);
    const metaList = metaItems.length
      ? `<ul class="citation-meta">${metaItems.map(item => `<li>${item}</li>`).join('')}</ul>`
      : '';
    return `<blockquote>
<p class="citation-quote"><strong>"${citation.quote}"</strong></p>
<p class="citation-title">— <em>${linkedTitle}</em></p>
${metaList}
</blockquote>`;
  };

  // Filter: Render block content with citation placeholders resolved
  eleventyConfig.addFilter('renderWithCitations', function(content, citations, sources = []) {
    if (!content || !citations) return content;

    // Replace [[cite:ID]] placeholders with rendered citation blockquotes
    return content.replace(/\[\[cite:([^\]]+)\]\]/g, function(match, citationId) {
      const citation = citations.find(c => c.id === citationId.trim());
      if (citation) {
        return renderCitation(citation, sources);
      }
      return match; // Return original if citation not found
    });
  });

  // Shortcode: Render a citation as a blockquote
  eleventyConfig.addShortcode('citation', function(citations, sources, id) {
    let citationId = id;
    let sourceList = sources;
    if (typeof sources === 'string') {
      citationId = sources;
      sourceList = [];
    }
    const citation = citations.find(c => c.id === citationId);
    if (!citation) return `<!-- Citation ${citationId} not found -->`;
    return renderCitation(citation, sourceList);
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
