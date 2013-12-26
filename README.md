# pathos

Decompose a javascript object into a set of path/value slices.

[![build status](https://secure.travis-ci.org/eugeneware/pathos.png)](http://travis-ci.org/eugeneware/pathos)

## Installation

This module is installed via npm:

``` bash
$ npm install pathos
```

## Example Usage

### Transform an object into paths/values

Take an object, and convert it to a list of paths and values.

``` js
var pathos = require('pathos');

// object to slice up
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

// slice the object
var paths = pathos.slice(o);

// the result is a list of key value pairs, where the keys are the paths and
// the values are the leaves
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
```

### Walk an object given a path

If you have a path, and an object, you can walk the object's path and then
return what is pointed to:

``` js
var pathos = require('pathos');

// object to walk
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

// find what is pointed to by the path [ 'cars', '1', 'make' ])
var ret = pathos.walk(o, [ 'cars', '1', 'make' ]);

expect(ret).to.equal('Toyota');
```

## License

### Copyright (c) 2013, Eugene Ware
#### All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.
3. Neither the name of Eugene Ware nor the names of its contributors
   may be used to endorse or promote products derived from this software
   without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY EUGENE WARE ''AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL EUGENE WARE BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
