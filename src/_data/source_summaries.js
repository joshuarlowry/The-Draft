const path = require('path');
const loadDir = require('./_lib/loadDir');

module.exports = () => loadDir(path.join(__dirname, 'source_summaries'));
