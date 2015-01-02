"use strict"

const test = require('tape')
const {Iterable} = require('./common')

const {concat} = require('../')

test('concat over Set', t => {
  let setA = new Set([1,2,3])
  let setB = new Set([4,5,6])
  t.deepEqual(
    Array.from(concat(setA, setB)),
    Array.from(setA).concat(Array.from(setB))
  )
  t.end()
})

test('concat over Map', t => {
  let mapA = new Map([['one', 1], ['two', 2], ['three', 3]])
  let mapB = new Map([['four', 4], ['five', 5], ['six', 6]])
  t.deepEqual(
    Array.from(concat(mapA, mapB)),
    Array.from(mapA).concat(Array.from(mapB))
  )
  t.end()
})

test('concat over generic iterator', t => {
  let itemsA = new Iterable([1,2,3])
  let itemsB = new Iterable([4,5,6])
  t.deepEqual(
    Array.from(concat(itemsA, itemsB)),
    Array.from(itemsA()).concat(Array.from(itemsB()))
  )
  t.end()
})

test('concat with generator', t => {
  let size = 3
  let nums = concat(function* () {
    while(size--) yield size
    size = 3
  }, function* () {
    while(size--) yield size
  })

  t.deepEqual(Array.from(nums), [2,1,0,2,1,0])
  t.end()
})

test('concat Set and generic iterator', t => {
  let setA = new Set([1,2,3])
  let itemsB = new Iterable([4,5,6])
  t.deepEqual(
    Array.from(concat(setA, itemsB)),
    Array.from(setA).concat(Array.from(itemsB()))
  )
  t.end()
})
