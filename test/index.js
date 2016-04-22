var expect = require('expect.js'),
    pathos = require('..');

describe('pathos', function() {
  it('should be able to slice an object', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    var paths = pathos.slice(o);
    expect(paths).to.eql(
      [ { key: [ 'name' ], value: 'Eugene' },
        { key: [ 'number' ], value: 42 },
        { key: [ 'tags' ], value: [] },
        { key: [ 'tags', 0 ], value: 'tag1' },
        { key: [ 'tags', 1 ], value: 'tag2' },
        { key: [ 'tags', 2 ], value: 'tag3' },
        { key: [ 'cars' ], value: [] },
        { key: [ 'cars', 0, 'make' ], value: 'Toyota' },
        { key: [ 'cars', 0, 'model' ], value: 'Camry' },
        { key: [ 'cars', 1, 'make' ], value: 'Toyota' },
        { key: [ 'cars', 1, 'model' ], value: 'Corolla' } ]);
    expect(typeof paths[3].key[1]).to.equal('number');
    expect(typeof paths[7].key[1]).to.equal('number');
    done();
  });

  it('should be able to slice an object with an empty array', function(done) {
    var o = {
      tags: [],
    };

    var paths = pathos.slice(o);
    expect(paths).to.eql(
      [ { key: [ 'tags' ], value: [] } ]);
    done();
  });

  it('should be able to slice a top level array', function(done) {
    var o = ['tag1', 'tag2', 'tag3'];

    var paths = pathos.slice(o);
    expect(paths).to.eql([
      { key: [], value: [] },
      { key: [ 0 ], value: 'tag1' },
      { key: [ 1 ], value: 'tag2' },
      { key: [ 2 ], value: 'tag3' }
    ]);
    done();
  });

  it('should be able to build an object from a top level array slice', function(done) {
    var o = ['tag1', 'tag2', 'tag3'];

    var paths = [
      { key: [], value: [] },
      { key: [ 0 ], value: 'tag1' },
      { key: [ 1 ], value: 'tag2' },
      { key: [ 2 ], value: 'tag3' }
    ];

    var result = pathos.build(paths);
    expect(Array.isArray(result)).to.equal(true);
    expect(result).to.eql(o);
    done();
  });

  it('should be able to build an object from empty array paths', function(done) {
    var o = {
      tags: [],
      moreTags: ['do', 're', 'mi']
    };

    var paths = [
      { key: [ 'tags' ], value: [] },
      { key: [ 'moreTags' ], value: [] },
      { key: [ 'moreTags', 0 ], value: 'do' },
      { key: [ 'moreTags', 1 ], value: 're' },
      { key: [ 'moreTags', 2 ], value: 'mi' }
    ];

    var result = pathos.build(paths);
    expect(result).to.eql(o);
    done();
  });

  it('should default to the slice method', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    // default method is slice
    var paths = pathos(o);
    expect(paths).to.eql(
      [ { key: [ 'name' ], value: 'Eugene' },
        { key: [ 'number' ], value: 42 },
        { key: [ 'tags' ], value: [] },
        { key: [ 'tags', 0 ], value: 'tag1' },
        { key: [ 'tags', 1 ], value: 'tag2' },
        { key: [ 'tags', 2 ], value: 'tag3' },
        { key: [ 'cars' ], value: [] },
        { key: [ 'cars', 0, 'make' ], value: 'Toyota' },
        { key: [ 'cars', 0, 'model' ], value: 'Camry' },
        { key: [ 'cars', 1, 'make' ], value: 'Toyota' },
        { key: [ 'cars', 1, 'model' ], value: 'Corolla' } ]);
    done();
  });

  it('should be able to walk a path', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    var ret = pathos.walk(o, [ 'cars', '1', 'make' ]);
    expect(ret).to.equal('Toyota');

    done();
  });

  it('should be able to retrieve the root of an object', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    var ret = pathos.walk(o, []);
    var expected = JSON.parse(JSON.stringify(o));
    expect(ret).to.eql(expected);
    done();
  });

  it('should be able to build an object from paths', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    var paths =
      [ { key: [ 'name' ], value: 'Eugene' },
        { key: [ 'number' ], value: 42 },
        { key: [ 'tags', '0' ], value: 'tag1' },
        { key: [ 'tags', '1' ], value: 'tag2' },
        { key: [ 'tags', '2' ], value: 'tag3' },
        { key: [ 'cars', '0', 'make' ], value: 'Toyota' },
        { key: [ 'cars', '0', 'model' ], value: 'Camry' },
        { key: [ 'cars', '1', 'make' ], value: 'Toyota' },
        { key: [ 'cars', '1', 'model' ], value: 'Corolla' } ];

    var result = pathos.build(paths);
    expect(result).to.eql(o);
    expect(Array.isArray(result.tags)).to.equal(false);
    expect(Array.isArray(result.cars)).to.equal(false);

    done();
  });

  it('should be able to build an object from paths (arrays)', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    var paths =
      [ { key: [ 'name' ], value: 'Eugene' },
        { key: [ 'number' ], value: 42 },
        { key: [ 'tags', 0 ], value: 'tag1' },
        { key: [ 'tags', 1 ], value: 'tag2' },
        { key: [ 'tags', 2 ], value: 'tag3' },
        { key: [ 'cars', 0, 'make' ], value: 'Toyota' },
        { key: [ 'cars', 0, 'model' ], value: 'Camry' },
        { key: [ 'cars', 1, 'make' ], value: 'Toyota' },
        { key: [ 'cars', 1, 'model' ], value: 'Corolla' } ];

    var result = pathos.build(paths);
    expect(result).to.eql(o);
    expect(Array.isArray(result.tags)).to.equal(true);
    expect(Array.isArray(result.cars)).to.equal(true);
    done();
  });

  it('should be able to set an object field with a path and value',
    function(done) {
      var o = {
        name: 'Eugene',
        number: 42,
        tags: ['tag1', 'tag2', 'tag3'],
        cars: [
          {
            make: 'Toyota',
            model: 'Camry'
          },
          {
            make: 'Toyota',
            model: 'Corolla'
          }
        ]
      };

      pathos.set(o, [ 'cars', '1', 'make' ], 'Toyoda');
      var expected1 = {
        name: 'Eugene',
        number: 42,
        tags: ['tag1', 'tag2', 'tag3'],
        cars: [
          {
            make: 'Toyota',
            model: 'Camry'
          },
          {
            make: 'Toyoda',
            model: 'Corolla'
          }
        ]
      };
      expect(o).to.eql(expected1);

      pathos.set(o, [ 'cars', '1', 'make' ], { old_name: 'Toyota', new_name: 'Toyota' });
      var expected2 = {
        name: 'Eugene',
        number: 42,
        tags: ['tag1', 'tag2', 'tag3'],
        cars: [
          {
            make: 'Toyota',
            model: 'Camry'
          },
          {
            make: { old_name: 'Toyota', new_name: 'Toyota' },
            model: 'Corolla'
          }
        ]
      };
      expect(o).to.eql(expected2);

      done();
    });

  it('should handle setting of new properties', function(done) {
    var o = {
      nothing: 'here'
    }
    pathos.set(o, [ 'cars', '1', 'make' ], 'Toyoda');
    var expected = {
      nothing: 'here',
      cars: {
        '1': {
          make: 'Toyoda'
        }
      }
    };
    expect(o).to.eql(expected);
    done();
  });

  it('should be able to visit every key-value pair', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    var paths = [];
    function visit(key, value) {
      paths.push({ key: key, value: value });
    }

    pathos.visit(o, visit);
    expect(paths).to.eql(
      [ { key: [ 'name' ], value: 'Eugene' },
        { key: [ 'number' ], value: 42 },
        { key: [ 'tags' ], value: [] },
        { key: [ 'tags', '0' ], value: 'tag1' },
        { key: [ 'tags', '1' ], value: 'tag2' },
        { key: [ 'tags', '2' ], value: 'tag3' },
        { key: [ 'cars' ], value: [] },
        { key: [ 'cars', '0', 'make' ], value: 'Toyota' },
        { key: [ 'cars', '0', 'model' ], value: 'Camry' },
        { key: [ 'cars', '1', 'make' ], value: 'Toyota' },
        { key: [ 'cars', '1', 'model' ], value: 'Corolla' } ]);
    done();
  });

  it('should be able to rename a field', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    function rename(key, value) {
      if (key[key.length - 1] === 'make') {
        key[key.length - 1] = 'manufacturer';
        return {
          key: key,
          value: value
        };
      } else {
        return true;
      }
    }

    pathos.rewrite(o, rename);
    var expected = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          manufacturer: 'Toyota',
          model: 'Camry'
        },
        {
          manufacturer: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    expect(o).to.eql(expected);

    done();
  });

  it('should be able to change a fields\'s value', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    function change(key, value) {
      if (key[key.length - 1] === 'make') {
        return {
          key: key,
          value: 'Toyoda'
        };
      } else {
        return true;
      }
    }

    pathos.rewrite(o, change);
    var expected = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyoda',
          model: 'Camry'
        },
        {
          make: 'Toyoda',
          model: 'Corolla'
        }
      ]
    };

    expect(o).to.eql(expected);

    done();
  });

  it('should be able to remove a field', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    var expected = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota'
        },
        {
          make: 'Toyota'
        }
      ]
    };

    function remove1(key, value) {
      return key[key.length - 1] !== 'model';
    }
    pathos.rewrite(o, remove1);
    expect(o).to.eql(expected);

    function remove2(key, value) {
      if (key[key.length - 1] === 'model') {
        return {
          key: key
        };
      }
      return true;
    }
    pathos.rewrite(o, remove2);
    expect(o).to.eql(expected);

    done();
  });

  it('should be able to set an object field with a path and value',
    function(done) {
      var o = {
        name: 'Eugene',
        number: 42,
        tags: ['tag1', 'tag2', 'tag3'],
        cars: [
          {
            make: 'Toyota',
            model: 'Camry'
          },
          {
            make: 'Toyota',
            model: 'Corolla'
          }
        ]
      };

      pathos.set(o, [ 'cars', '1', 'make' ], 'Toyoda');
      var expected1 = {
        name: 'Eugene',
        number: 42,
        tags: ['tag1', 'tag2', 'tag3'],
        cars: [
          {
            make: 'Toyota',
            model: 'Camry'
          },
          {
            make: 'Toyoda',
            model: 'Corolla'
          }
        ]
      };
      expect(o).to.eql(expected1);

      pathos.set(o, [ 'cars', '1', 'make' ], { old_name: 'Toyota', new_name: 'Toyota' });
      var expected2 = {
        name: 'Eugene',
        number: 42,
        tags: ['tag1', 'tag2', 'tag3'],
        cars: [
          {
            make: 'Toyota',
            model: 'Camry'
          },
          {
            make: { old_name: 'Toyota', new_name: 'Toyota' },
            model: 'Corolla'
          }
        ]
      };
      expect(o).to.eql(expected2);

      done();
    });

  it('should handle setting of new properties', function(done) {
    var o = {
      nothing: 'here'
    }
    pathos.set(o, [ 'cars', '1', 'make' ], 'Toyoda');
    var expected = {
      nothing: 'here',
      cars: {
        '1': {
          make: 'Toyoda'
        }
      }
    };
    expect(o).to.eql(expected);
    done();
  });

  it('should be able to visit every key-value pair', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    var paths = [];
    function visit(key, value) {
      paths.push({ key: key, value: value });
    }

    pathos.visit(o, visit);
    expect(paths).to.eql(
      [ { key: [ 'name' ], value: 'Eugene' },
        { key: [ 'number' ], value: 42 },
        { key: [ 'tags' ], value: [] },
        { key: [ 'tags', '0' ], value: 'tag1' },
        { key: [ 'tags', '1' ], value: 'tag2' },
        { key: [ 'tags', '2' ], value: 'tag3' },
        { key: [ 'cars' ], value: [] },
        { key: [ 'cars', '0', 'make' ], value: 'Toyota' },
        { key: [ 'cars', '0', 'model' ], value: 'Camry' },
        { key: [ 'cars', '1', 'make' ], value: 'Toyota' },
        { key: [ 'cars', '1', 'model' ], value: 'Corolla' } ]);
    done();
  });

  it('should be able to rename a field', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    function rename(key, value) {
      if (key[key.length - 1] === 'make') {
        key[key.length - 1] = 'manufacturer';
        return {
          key: key,
          value: value
        };
      } else {
        return true;
      }
    }

    pathos.rewrite(o, rename);
    var expected = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          manufacturer: 'Toyota',
          model: 'Camry'
        },
        {
          manufacturer: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    expect(o).to.eql(expected);

    done();
  });

  it('should be able to change a fields\'s value', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    function change(key, value) {
      if (key[key.length - 1] === 'make') {
        return {
          key: key,
          value: 'Toyoda'
        };
      } else {
        return true;
      }
    }

    pathos.rewrite(o, change);
    var expected = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyoda',
          model: 'Camry'
        },
        {
          make: 'Toyoda',
          model: 'Corolla'
        }
      ]
    };

    expect(o).to.eql(expected);

    done();
  });

  it('should be able to remove a field', function(done) {
    var o = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota',
          model: 'Camry'
        },
        {
          make: 'Toyota',
          model: 'Corolla'
        }
      ]
    };

    var expected = {
      name: 'Eugene',
      number: 42,
      tags: ['tag1', 'tag2', 'tag3'],
      cars: [
        {
          make: 'Toyota'
        },
        {
          make: 'Toyota'
        }
      ]
    };

    function remove1(key, value) {
      return key[key.length - 1] !== 'model';
    }
    pathos.rewrite(o, remove1);
    expect(o).to.eql(expected);

    function remove2(key, value) {
      if (key[key.length - 1] === 'model') {
        return {
          key: key
        };
      }
      return true;
    }
    pathos.rewrite(o, remove2);
    expect(o).to.eql(expected);

    done();
  });
});
