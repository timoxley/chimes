"use strict"

const test = require('tape')
const {Iterable} = require('./common')

const {last, value} = require('../')

test('last over Set', t => {
  t.deepEqual(value(last(new Set([2,4,6]))), 6)
  t.end()
})

test('last over Map', t => {
  let map = new Map()
  let lastKey = Symbol('lastKey')
  let lastValue = Symbol('lastValue')
  map.set('first', Symbol('first'))
  map.set('middle', Symbol('middle'))
  map.set(lastKey, lastValue)
  t.deepEqual(
    value(last(map)),
    [lastKey, lastValue]
  )
  t.end()
})

test('last over generic iterator', t => {
  let iterator = Iterable([1,2,3])
  t.deepEqual(value(last(iterator())), 3)
  t.end()
})

test('last with generator', t => {
  let size = 3
  let nums = last(function* () {
    while(size--) yield size
  })

  t.equal(value(last(nums)), 0)
  t.end()
})

test('last over empty iterator', t => {
  let iterator = Iterable([])
  t.notOk(value(last(iterator())))
  t.end()
})
