function parseObjectToStrings(obj) {
  let strings = [];

  Object.entries(obj).map(line => {
    strings.push(`${line[0]}=${line[1]}`);
  });

  return strings.join('\r\n');
}

exports.parseObjectToStrings = parseObjectToStrings;