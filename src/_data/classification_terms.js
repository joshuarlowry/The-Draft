const slugify = (value) => {
  if (value === undefined || value === null) return '';
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const FIELD_MAP = {
  tag: 'tags',
  topic: 'topics',
  category: 'categories',
};

module.exports = function (data) {
  const summaries = Array.isArray(data.source_summaries) ? data.source_summaries : [];
  const terms = [];
  const seen = new Set();

  const addTerm = (type, label) => {
    if (!label) return;
    const slug = slugify(label);
    const key = `${type}:${slug}`;
    if (seen.has(key)) return;
    seen.add(key);
    terms.push({
      type,
      field: FIELD_MAP[type],
      label,
      slug,
    });
  };

  summaries.forEach((summary) => {
    (summary.tags || []).forEach((tag) => addTerm('tag', tag));
    (summary.topics || []).forEach((topic) => addTerm('topic', topic));
    (summary.categories || []).forEach((category) => addTerm('category', category));
  });

  return terms.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type.localeCompare(b.type);
    }
    return a.label.localeCompare(b.label);
  });
};
