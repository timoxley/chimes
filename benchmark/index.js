const {map} = require('../')
const {Iterable} = require('../test/common')
const assert = require('assert')

let fn = (value, i) => value * i
let items = [1,2,3,4,5,6,7,8,9]
for (let i = 0; i < 20; i++) {
  items = items.concat(items)
}
console.time('array#map')
let a = items.map(fn)
console.timeEnd('array#map')
console.time('chimes.map')
let b = Array.from(map(items, fn))
console.timeEnd('chimes.map')
assert.deepEqual(a, b)
