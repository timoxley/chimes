# Chimes

`Array.prototype` iteration methods for any iterator.

The new iterable data structures in ES6 are hard to justify using as they're severely lacking in expressive power when compared to Arrays. This library's goal is to add all the expressive power of Arrays to anything iterable, including generators.

Current implementation is porcelain for future sugar.

update: Looks like map/filter may eventually be added to the Collection/Iterator prototype:

https://esdiscuss.org/notes/2014-11-19#5-8-map-prototype-map-and-map-prototype-filter-spec-set


## Installation

```
npm install chimes
```

Requires an ES6 transpiler such as [6to5](https://6to5.org/), [traceur](https://github.com/google/traceur-compiler) or a polyfill like [core-js](https://github.com/zloirock/core-js).

## Usage

Most methods work just as they do for `Array.prototype`, though they
take the iterable as the first argument and always return an iterator.

Note that even `every`, `some` & `reduce` return iterators – the last value in the iterator is the value you'd expect from the corresponding `Array.prototype` method.

An iterable is any object that implements `Symbol.iterator` or a generator.

```js
const {map} = require('chimes')

let set = new Set()
set.add(1)
set.add(2)
set.add(3)

let doubleSet = new Set(map(set, (value, i) => value * 2))
console.log(doubleSet.has(1)) // false
console.log(doubleSet.has(2)) // true
console.log(doubleSet.has(4)) // true
console.log(doubleSet.has(6)) // true
console.log(Array.from(doubleSet))
// [2,4,6]
```

## API

#### Methods Implemented

* map
* filter
* every
* some
* reduce
* concat

#### Helpers

* first
* last

* * *

### map(iterable, fn, context)

Creates a new Iterator with the results of lazily calling `fn` on every
element in the supplied `iterable`.

Array.prototype.map for Iterables.

```js
const {map} = require('chimes')

let set = new Set()
set.add(1)
set.add(2)
set.add(3)

let doubleSet = new Set(map(set, value => value * 2))
console.log(doubleSet.has(1)) // false
console.log(doubleSet.has(2)) // true
console.log(doubleSet.has(4)) // true
console.log(doubleSet.has(6)) // true
console.log(Array.from(doubleSet))
// [2,4,6]
```

**Parameters**

**iterable**: `Iterable`, Creates a new Iterator with the results of lazily calling `fn` on every
element in the supplied `iterable`.
**fn**: `function`, Will be invoked with: value, index & iteration object
**context**: `Mixed`, Optional. Value to use as this when executing `fn`.
**Returns**: `Iterator`


### filter(iterable, fn, context)

Creates a new Iterator with all elements in the supplied `iterable` that
pass the test implemented by `fn`. `fn` is applied lazily.

Array.prototype.filter for iterables.

```js
const {filter} = require('chimes')

let isEven = value => value % 2 === 0
let size = 5
let evenNumbers = filter(function* () {
  while(size--) yield size
}, isEven)

Array.from(evenNumbers) // [ 4, 2, 0 ]
```

**Parameters**

**iterable**: `Iterable`, Creates a new Iterator with all elements in the supplied `iterable` that
pass the test implemented by `fn`. `fn` is applied lazily.

**fn**: `function`, Will be invoked with: value, index & iteration object

**context**: `Mixed`, Optional. Value to use as this when executing `fn`.

**Returns**: `Iterator`


### every(iterable, fn, context)

Creates a new Iterator which tests whether all elements that have passed
through the iterator thus far pass the test implemented by `fn`.
`fn` is applied lazily.

Array.prototype.every for iterables.

```js
const {every} = require('chimes')

let isEven = value => value % 2 === 0
let size = 5
let allEven = every(new Set([2,4,6]), isEven)
let notAllEven = every(new Set([2,3,6]), isEven)

Array.from(allEven.next().value) // true
Array.from(notAllEven.next().value) // false
```

**Parameters**

**iterable**: `Iterable`, Creates a new Iterator which tests whether all elements that have passed
through the iterator thus far pass the test implemented by `fn`.
`fn` is applied lazily.

**fn**: `function`, Will be invoked with: value, index & iteration object

**context**: `Mixed`, Optional. Value to use as this when executing `fn`.

**Returns**: `Iterator`


### some(iterable, fn, context)

Creates a new Iterator which tests whether any elements that have passed
through the iterator thus far pass the test implemented by `fn`.
`fn` is applied lazily.

Array.prototype.some for iterables.

```js
const {some} = require('chimes')

let isEven = value => value % 2 === 0
let allEven = some(new Set([2,4,6]), isEven)
let someEven = some(new Set([2,3,6]), isEven)
let noneEven = some(new Set([1,3,5]), isEven)

Array.from(allEven.next().value) // true
Array.from(someEven.next().value) // true
Array.from(noneEven.next().value) // false
```

**Parameters**

**iterable**: `Iterable`, Creates a new Iterator which tests whether any elements that have passed
through the iterator thus far pass the test implemented by `fn`.
`fn` is applied lazily.

**fn**: `function`, Will be invoked with: value, index & iteration object

**context**: `Mixed`, Optional. Value to use as this when executing `fn`.

**Returns**: `Iterator`


### reduce(iterable, fn, initialValue)

Creates a new Iterator that lazily applies `fn` against an accumulator.
Each step of the iteration reduces it to a single value.

Array.prototype.reduce for iterables.

```js
const {reduce} = require('chimes')

let addNumbers = (init, value, i) => init + value
let total = reduce(new Set([1,2,3]), addNumbers, 0))
let otherTotal = reduce(new Set([1,2,3]), addNumbers, 1))

Array.from(total.next().value) // 6
Array.from(otherTotal.next().value) // 7
```

**Parameters**

**iterable**: `Iterable`, Creates a new Iterator that lazily applies `fn` against an accumulator.
Each step of the iteration reduces it to a single value.

**fn**: `function`, Will be invoked with: previousValue, currentValue, index & iteration object.

**initialValue**: `Mixed`, Optional. Object to use as the first argument to the first call of `fn`.

**Returns**: `Iterator`


### concat(iterable, )

Creates a new Iterator comprising of the first iterable joined with the second iterable.

Array.prototype.concat for iterables.

```js
const {concat} = require('chimes')

let set = new Set([1,2,3])
let array = [4,5,6]
let joined = concat(set, array)
for (let item in joined) {
  console.log(item)
}
// 1
// 2
// 3
// 4
// 5
// 6

```

**Parameters**

**iterable**: `Iterable`, Creates a new Iterator comprising of the first iterable joined with the second iterable.

**concat**: `Iterable`, Creates a new Iterator comprising of the first iterable joined with the second iterable.

Array.prototype.concat for iterables.

**Returns**: `Iterator`


### last(iterable)

Creates a new Iterator that simply contains the last element of `iterable`.

```js
const {last} = require('chimes')

for (let item in last(new Set([2,4,6]))) {
  console.log(item) // 6
}
```

**Parameters**

**iterable**: `Iterable`, Creates a new Iterator that simply contains the last element of `iterable`.

**Returns**: `Iterator`

### first(iterable)

Creates a new Iterator that simply contains the first element of `iterable`.

```js
const {first} = require('chimes')

for (let item in first(new Set([2,4,6]))) {
  console.log(item) // 2
}
```

**Parameters**

**iterable**: `Iterable`, Creates a new Iterator that simply contains the first element of `iterable`.

**Returns**: `Iterator`

* * *

# License

MIT
