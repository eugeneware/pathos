module.exports = slice;
module.exports.slice = slice;
function slice(data) {
  var paths = [];
  function storePaths(key, value) {
    paths.push({ key: key, value: value });
  }
  visit(data, storePaths);
  return paths;
}

module.exports.visit = visit;
function visit(data, fn, parts) {
  if (typeof parts === 'undefined') {
    parts = [];
  }

  if (Array.isArray(data)) {
    fn(parts, []);
  }

  if (data !== null && typeof data === 'object') {
    return visitChildren();
  } else {
    fn(parts, data);
    return;
  }

  function visitChildren() {
    var keys = Object.keys(data);
    keys.forEach(function (key) {
      var value = data[key];
      if (Array.isArray(data)) {
        key = parseInt(key, 10);
      }
      if (typeof value === 'object') {
        visit(value, fn, parts.concat(key));
      } else {
        fn(parts.concat(key), data[key]);
      }
    });

    return;
  }
}

module.exports.rewrite = rewrite;
function rewrite(data, fn, parts, root) {
  if (typeof parts === 'undefined') {
    parts = [];
    root = data;
  }

  if (data !== null && typeof data === 'object') {
    return visitChildren();
  } else {
    fn(parts, data);
    return;
  }

  function visitChildren() {
    var keys = Object.keys(data);
    keys.forEach(function (key) {
      var value = data[key];
      if (typeof value === 'object') {
        rewrite(value, fn, parts.concat(key), root);
      } else {
        var result = fn(parts.concat(key), data[key]);
        if (result === true || typeof result === 'undefined') {
          // do nothing
          return;
        } else if (result === false) {
          // explicitly remove this path
          delete data[key];
        } else if (typeof result.key !== 'undefined') {
          if (typeof result.value === 'undefined' ||
              result.key !== key) {
            // ask to remove key, or key name has changed
            delete data[key];
          }

          set(root, result.key, result.value);
        }
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
    if (obj && obj[prop] !== undefined) {
      obj = obj[prop];
    } else {
      return;
    }
  }
  return obj;
}

module.exports.build = build;
function build(paths) {
  var o = { };
  paths.forEach(function (path) {
    o = buildPath(o, path.key, path.value);
  });
  return o;
}

function buildPath(obj, path, value) {
  var root = obj;
  path = path.slice();
  if (path.length === 0 && typeof value !== 'undefined') {
    root = value;
  }
  while (path.length > 0) {
    var prop = path.shift();
    if (obj[prop] !== undefined) {
      obj = obj[prop];
    } else if (path.length) {
      if (typeof path[0] === 'number') {
        obj[prop] = [];
      } else {
        obj[prop] = {};
      }
      obj = obj[prop];
    } else {
      obj[prop] = value;
    }
  }
  return root;
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
    if (typeof value === 'undefined') {
      delete obj[prop];
    } else {
      obj[prop] = value;
    }
  }
  return o;
}
