"use strict"

const test = require('tape')
const {Iterable} = require('./common')

const {filter} = require('../')

test('filter over Set', t => {
  let fn = (value, i) => value % 2 === 0
  let set = new Set([1,2,3])
  t.deepEqual(
    new Set(filter(set, fn)),
    new Set(Array.from(set).filter(fn))
  )
  t.end()
})

test('filter over Map', t => {
  let fn = ([key, value], i) => value % 2 === 0
  let map = new Map([['one', 1], ['two', 2], ['three', 3]])
  t.deepEqual(
    new Map(filter(map, fn)),
    new Map(Array.from(map).filter(fn))
  )
  t.end()
})

test('filter over generic iterator', t => {
  let fn = (value, i) => value % 2 === 0
  let iterator = Iterable([1,2,3])
  t.deepEqual(
    Array.from(filter(iterator(), fn)),
    Array.from(iterator()).filter(fn)
  )
  t.end()
})

test('filter with generator', t => {
  let fn = (value, i) => value % 2 === 0
  let size = 5
  let nums = filter(function* () {
    while(size--) yield size
  }, fn)

  t.deepEqual(Array.from(nums), [4,3,2,1,0].filter(fn))
  t.end()
})

test('filter maintains counter', t => {
  let getCounter = (value, i) => i % 2 === 0
  let iterator = Iterable([101,102,103,104])
  t.deepEqual(
    Array.from(filter(iterator(), getCounter)),
    [101,103]
  )
  t.end()
})

test('filter maintains iterator', t => {
  t.plan(4)
  let iterator = Iterable([1,2,3,4])
  let verifyIterator = (value, i, it) => t.equals(it, iter)
  let iter = iterator()
  Array.from(filter(iter, verifyIterator))
  t.end()
})

test('filter uses correct context', t => {

  let getContext = function() { return this }
  let iterator = Iterable([1,2,3,4])
  let contexts = Array.from(iterator()).map(getContext)
  filter(iterator(), function(v, i) {
    t.equal(this, contexts[i])
  })

  let self = Symbol('self')
  filter(iterator(), function() {
    t.equal(this, self)
  }, self),
  t.end()
})
