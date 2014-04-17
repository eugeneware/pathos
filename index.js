module.exports = slice;
module.exports.slice = slice;
function slice(parts, data) {
  if (arguments.length < 2) {
    data = parts;
    parts = [];
  }

  var paths = [];
  if (data !== null && typeof data === 'object') {
    return saveChildren();
  } else {
    paths.push({ key: parts, value: data });
    return paths;
  }

  function saveChildren() {
    var keys = Object.keys(data);
    keys.forEach(function (key) {
      var value = data[key];
      if (typeof value === 'object') {
        paths = paths.concat(slice(parts.concat(key), value));
      } else {
        paths.push({ key: parts.concat(key), value: data[key] });
      }
    });

    return paths;
  }
}

module.exports.visit = visit;
function visit(data, fn, parts) {
  if (typeof parts === 'undefined') {
    parts = [];
  }

  if (data !== null && typeof data === 'object') {
    return saveChildren();
  } else {
    fn(parts, data);
    return;
  }

  function saveChildren() {
    var keys = Object.keys(data);
    keys.forEach(function (key) {
      var value = data[key];
      if (typeof value === 'object') {
        visit(value, fn, parts.concat(key));
      } else {
        fn(parts.concat(key), data[key]);
      }
    });

    return;
  }
}

module.exports.walk = walk;
function walk(obj, path) {
  path = path.slice();
  while (path.length > 0) {
    var prop = path.shift();
    if (obj[prop] !== undefined) {
      obj = obj[prop];
    } else {
      return;
    }
  }
  return obj;
}

module.exports.build = build;
function build(paths) {
  var o = {};
  paths.forEach(function (path) {
    buildPath(o, path.key, path.value);
  });
  return o;
}

function buildPath(obj, path, value) {
  path = path.slice();
  while (path.length > 0) {
    var prop = path.shift();
    if (obj[prop] !== undefined) {
      obj = obj[prop];
    } else if (path.length) {
      obj[prop] = {};
      obj = obj[prop];
    } else {
      obj[prop] = value;
    }
  }
  return obj;
}

module.exports.set = set;
function set(o, path, value) {
  var obj = o;
  path = path.slice();
  while (path.length > 1) {
    var prop = path.shift();
    if (obj[prop] !== undefined) {
      obj = obj[prop];
    } else {
      obj[prop] = {};
      obj = obj[prop];
    }
  }
  if (path.length === 1) {
    var prop = path.shift();
    obj[prop] = value;
  }
  return o;
}
