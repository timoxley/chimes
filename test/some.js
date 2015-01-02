"use strict"

const test = require('tape')
const {Iterable} = require('./common')
const {some, value} = require('../')

test('some over Set', t => {
  let fn = (value, i) => value % 2 === 0
  t.ok(value(some(new Set([2,4,6]), fn)), 'all match')
  t.ok(value(some(new Set([1,2,3]), fn)), 'one match')
  t.notOk(value(some(new Set([1,3,5]), fn)), 'none match')
  t.end()
})

test('some over Map', t => {
  let fn = ([key, value], i) => (key + value) % 2 === 0
  t.ok(value(some(new Map([[2, 2], [2, 4], [2, 6]]), fn)))
  t.ok(value(some(new Map([[1, 2], [2, 4], [1, 6]]), fn)))
  t.notOk(value(some(new Map([[1, 2], [1, 4], [1, 6]]), fn)))
  t.end()
})

test('some over generic iterator', t => {
  let iterator = Iterable([1,2,3])
  let fn = (value, i) => value % 2 === 0
  t.ok(value(some(new Iterable([2,4,6]), fn)))
  t.ok(value(some(new Iterable([1,2,3]), fn)))
  t.notOk(value(some(new Iterable([1,3,5]), fn)))
  t.end()
})

test('some with generator', t => {
  let fn = (value, i) => value % 2 === 0
  let size = 3
  let nums = some(function* () {
    while(size--) yield size
  }, fn)

  t.ok(value(nums))
  t.end()
})

test('some callback does not visit further items after first pass', t => {
  t.plan(4)
  let getCounter = (value, i) => t.ok('visited') || i === 2
  let iterator = Iterable([0,1,2,3])
  t.ok(value(some(iterator(), getCounter)))
  t.end()
})

test('some maintains counter', t => {
  let getCounter = (value, i) => {
    let result = (i === 2)
    t.equal(value, i)
    return result
  }

  let iterator = Iterable([0,1,2,5])
  t.ok(value(some(iterator(), getCounter)))
  t.end()
})

test('some maintains iterator', t => {
  t.plan(5)
  let getCounter = (value, i, it) => {
    t.equal(it, iter)
    return i === 3
  }

  let iterator = Iterable([0,1,2,3])
  let iter = iterator()
  t.ok(value(some(iter, getCounter)))
  t.end()
})

test('some uses correct context', t => {
  let iterator = Iterable([1,2,3,4])

  let defaultContexts = Array.from(iterator())
  .map(function() { return this })

  t.ok(
    value(some(iterator(), matchContext(defaultContexts))),
    'gets default context'
  )

  let self = Symbol('context')
  let assignedContexts = Array.from(iterator())
  .map(function() { return this }, self)

  t.ok(
    value(some(iterator(), matchContext(assignedContexts), self)),
    'uses assigned context'
  )

  t.end()

  function matchContext(contexts) {
    return function(item, i) {
      t.ok(this == contexts[i], 'matches context');
      return i === 3
    }
  }
})

