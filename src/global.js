const fs = require('fs');

function parseObjectToStrings(obj) {
  let strings = [];

  Object.entries(obj).map(line => {
    strings.push(`${line[0]}=${line[1]}`);
  });

  return strings.join('\r\n');
}

exports.parseObjectToStrings = parseObjectToStrings;

function mkdirIfNotExists(path) {
  if (fs.existsSync(path)) return;

  fs.mkdirSync(path, { recursive: true });
}

exports.mkdirIfNotExists = mkdirIfNotExists;