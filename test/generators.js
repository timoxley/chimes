"use strict"

const test = require('tape')
const {Iterable} = require('./common')

const {map, value} = require('../')

test('map with generator', t => {
  let size = 3
  let nums = map(function* () {
    while(size--) yield size
  }, num => num * 2)

  t.deepEqual(Array.from(nums), [2,1,0].map(n => n * 2))
  t.end()
})
