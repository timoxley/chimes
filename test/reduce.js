"use strict"

const test = require('tape')
const {Iterable} = require('./common')

const {reduce, value} = require('../')

test('reduce over Set', t => {
  let fn = (init, value, i) => init + value + i
  let set = new Set([1,2,3])
  t.deepEqual(
    value(reduce(set, fn, 0)),
    Array.from(set).reduce(fn, 0)
  )
  t.end()
})

test('reduce over Map', t => {
  let fn = (init, [key, value], i) => init + value + i
  let map = new Map([['one', 1], ['two', 2], ['three', 3]])
  t.deepEqual(
    value(reduce(map, fn, 0)),
    Array.from(map).reduce(fn, 0)
  )
  t.end()
})

test('reduce over generic iterator', t => {
  let fn = (init, value, i) => init + value + i
  let iterator = Iterable([1,2,3])
  t.deepEqual(
    value(reduce(iterator(), fn, 0)),
    Array.from(iterator()).reduce(fn, 0)
  )
  t.end()
})

test('reduce with generator', t => {
  let fn = (init, value, i) => init + value + i
  let size = 3
  let nums = reduce(function* () {
    while(size--) yield size
  }, fn, 0)

  t.deepEqual(value(nums), [2,1,0].reduce(fn, 0))
  t.end()
})

test('gets correct value', t => {
  let items = [1,2,3,4]
  t.plan(items.length * 2 + 1)
  let getCounter = (result, value, i) => {
    t.equal(value, items[i])
    return value
  }
  let iterator = Iterable(items)
  t.deepEqual(
    value(reduce(iterator(), getCounter, 0)),
    Array.from(iterator()).reduce(getCounter, 0)
  )
  t.end()
})

test('reduce maintains counter', t => {
  let getCounter = (result, value, i) => result + i
  let iterator = Iterable([1,2,3,4])
  t.deepEqual(
    value(reduce(iterator(), getCounter, 0)),
    Array.from(iterator()).reduce(getCounter, 0)
  )
  t.end()
})

test('reduce maintains iterator', t => {
  t.plan(4)
  let iterator = Iterable([1,2,3,4])
  let verifyIterator = (result, value, i, it) => t.equals(it, iter)
  let iter = iterator()
  value(reduce(iter, verifyIterator, 0))
  t.end()
})

test('reduce uses correct context', t => {
  let getContext = function(result) { return result.concat(this) }
  let iterator = Iterable([1,2,3])
  t.deepEqual(
    value(reduce(iterator(), getContext, [])),
    Array.from(iterator()).reduce(getContext, []),
    'uses default context'
  )
  t.end()
})
