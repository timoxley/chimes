"use strict"

const test = require('tape')
const {Iterable} = require('./common')

const {first, value} = require('../')

test('first over Set', t => {
  t.deepEqual(value(first(new Set([2,4,6]))), 2)
  t.end()
})

test('first over Map', t => {
  let map = new Map()
  let firstKey = Symbol('firstKey')
  let firstValue = Symbol('firstValue')
  map.set(firstKey, firstValue)
  map.set('middle', Symbol('middle'))
  map.set('last', Symbol('last'))
  t.deepEqual(
    value(first(map)),
    [firstKey, firstValue]
  )
  t.end()
})

test('first over generic iterator', t => {
  let iterator = Iterable([1,2,3])
  t.deepEqual(value(first(iterator())), 1)
  t.end()
})

test('first with generator', t => {
  let size = 3
  let nums = first(function* () {
    while(size--) yield size
  })

  t.equal(value(nums), 2)
  t.end()
})

test('first over empty iterator', t => {
  let iterator = Iterable([])
  t.notOk(value(first(iterator())))
  t.end()
})
