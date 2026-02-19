module.exports = {
  layout: 'layouts/take.njk',
  date: '2026-01-01',
  eleventyComputed: {
    takeCitationIds: (data) => data.citations || [],
  },
};
