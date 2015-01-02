"use strict"

const test = require('tape')
const {Iterable} = require('./common')

const {every, value} = require('../')



test('map with generator', t => {
  let size = 3
  let nums = map(function* () {
    while(--size) yield size
  }, num => num * 2)

  let set = new Set(asyncSeries)
  t.deepEqual(Array.from(nums), [1,2,3].map(n => n * 2))
  t.end()
})
