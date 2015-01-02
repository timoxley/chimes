"use strict"

const test = require('tape')
const {Iterable} = require('./common')

const {every, value} = require('../')

test('every over Set', t => {
  let fn = (value, i) => value % 2 === 0
  t.ok(value(every(new Set([2,4,6]), fn)))
  t.notOk(value(every(new Set([1,2,3]), fn)))
  t.end()
})

test('every over Map', t => {
  let fn = ([key, value], i) => (key + value) % 2 === 0
  t.ok(value(every(new Map([[2, 2], [2, 4], [2, 6]]), fn)))
  t.notOk(value(every(new Map([[1, 2], [2, 4], [1, 6]]), fn)))
  t.end()
})

test('every over generic iterator', t => {
  let iterator = Iterable([1,2,3])
  let fn = (value, i) => value % 2 === 0
  t.ok(value(every(new Iterable([2,4,6]), fn)))
  t.notOk(value(every(new Iterable([1,2,3]), fn)))
  t.end()
})

test('every with generator', t => {
  let fn = (value, i) => value % 2 === 0
  let size = 3
  let nums = every(function* () {
    while(--size) yield size
  }, fn)

  t.deepEqual(value(nums), [3,2,1].every(fn))
  t.end()
})

test('every iterator', t => {
  let fn = (value, i) => value % 2 === 0
  t.deepEqual(Array.from(every(new Set([2,4,6]), fn)), [true, true, true])
  t.deepEqual(Array.from(every(new Set([2,3,4,6]), fn)), [true, false])
  t.end()
})

test('every callback does not visit items after first failure', t => {
  t.plan(4)
  let getCounter = (value, i) => {
    t.ok(true, 'visited ' + value +' '+ i)
    return i < 2
  }
  let iterator = Iterable([0,1,2,3])
  t.notOk(value(every(iterator(), getCounter)))
})

test('every maintains counter', t => {
  let count = 0
  let getCounter = (value, i) => (value === i) && (value === count++)
  let iterator = Iterable([0,1,2,3])
  t.ok(value(every(iterator(), getCounter)))
  t.end()
})

test('every maintains iterator', t => {
  let getCounter = (value, i, it) => it === iter
  let iterator = Iterable([0,1,2,3])
  let iter = iterator()
  t.ok(value(every(iter, getCounter)))
  t.end()
})

test('every uses correct context', t => {
  let iterator = Iterable([1,2,3])

  let defaultContexts = Array.from(iterator())
  .map(function() { return this })

  t.ok(
    value(every(iterator(), matchContext(defaultContexts))),
    'gets default context'
  )

  let self = Symbol('context')
  let assignedContexts = Array.from(iterator())
  .map(function() { return this }, self)

  t.ok(
    value(every(iterator(), matchContext(assignedContexts), self)),
    'uses assigned context'
  )
  t.end()

  function matchContext(contexts) {
    return function(item, i) {
      return this == contexts[i]
    }
  }
})
