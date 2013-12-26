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
        { key: [ 'tags', '0' ], value: 'tag1' },
        { key: [ 'tags', '1' ], value: 'tag2' },
        { key: [ 'tags', '2' ], value: 'tag3' },
        { key: [ 'cars', '0', 'make' ], value: 'Toyota' },
        { key: [ 'cars', '0', 'model' ], value: 'Camry' },
        { key: [ 'cars', '1', 'make' ], value: 'Toyota' },
        { key: [ 'cars', '1', 'model' ], value: 'Corolla' } ]);
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
        { key: [ 'tags', '0' ], value: 'tag1' },
        { key: [ 'tags', '1' ], value: 'tag2' },
        { key: [ 'tags', '2' ], value: 'tag3' },
        { key: [ 'cars', '0', 'make' ], value: 'Toyota' },
        { key: [ 'cars', '0', 'model' ], value: 'Camry' },
        { key: [ 'cars', '1', 'make' ], value: 'Toyota' },
        { key: [ 'cars', '1', 'model' ], value: 'Corolla' } ]);
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
});
