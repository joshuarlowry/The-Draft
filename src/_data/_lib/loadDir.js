const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Reads all YAML files from a directory and returns their contents as a flat
 * array.  Each file should contain a single YAML document (an object, not a
 * list).  Files are sorted by name so output order is deterministic across
 * platforms.
 */
module.exports = function loadDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'))
    .sort()
    .map((f) => yaml.load(fs.readFileSync(path.join(dir, f), 'utf8')))
    .filter(Boolean);
};
