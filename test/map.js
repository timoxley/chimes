"use strict"

const test = require('tape')
const {Iterable} = require('./common')

const {map} = require('../')

test('map over Set', t => {
  let fn = (value, i) => value * i
  let set = new Set([1,2,3])
  t.deepEqual(
    new Set(map(set, fn)),
    new Set(Array.from(set).map(fn))
  )
  t.end()
})

test('map over Map', t => {
  let mapFn = ([key, value], i) => [key, value * i]
  let data = new Map([['one', 1], ['two', 2], ['three', 3]])
  t.deepEqual(
    new Map(map(data, mapFn)),
    new Map(Array.from(data).map(mapFn))
  )
  t.end()
})

test('map over generic iterator', t => {
  let fn = (value, i) => value * i
  let iterator = Iterable([1,2,3])
  t.deepEqual(
    Array.from(map(iterator(), fn)),
    Array.from(iterator()).map(fn)
  )
  t.end()
})

test('map with generator', t => {
  let size = 3
  let nums = map(function* () {
    while(size--) yield size
  }, num => num * 2)

  t.deepEqual(Array.from(nums), [2,1,0].map(n => n * 2))
  t.end()
})

test('map maintains counter', t => {
  let getCounter = (value, i) => i
  let iterator = Iterable([1,2,3,4])
  t.deepEqual(
    Array.from(map(iterator(), getCounter)),
    [0, 1, 2, 3]
  )
  t.end()
})

test('map maintains iterator', t => {
  t.plan(4)
  let iterator = Iterable([1,2,3,4])
  let verifyIterator = (value, i, it) => t.equals(it, iter)
  let iter = iterator()
  Array.from(map(iter, verifyIterator))
  t.end()
})

test('map uses correct context', t => {
  let getContext = function() { return this }
  let iterator = Iterable([1,2,3])
  t.deepEqual(
    Array.from(map(iterator(), getContext)),
    Array.from(iterator()).map(getContext),
    'uses default context'
  )

  let self = Symbol('context')
  t.deepEqual(
    Array.from(map(iterator(), getContext, self)),
    Array.from(iterator()).map(getContext, self),
    'uses supplied context'
  )
  t.end()
})

