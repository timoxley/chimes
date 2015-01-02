"use strict"

const Chimes = module.exports = {

  /**
   * Creates a new Iterator with the results of lazily calling `fn` on every
   * element in the supplied `iterable`.
   *
   * Array.prototype.map for Iterables.
   *
   * @param {Iterable} iterable
   * @param {Function} fn Will be invoked with: value, index & iteration object
   * @param {Mixed=} context Optional. Value to use as this when executing `fn`.
   * @return {Iterator}
   */

  map(iterable, ...args) {
    let [fn, context] = args
    return function*() {
      if (args.length === 1) context = undefined
      let item
      let index = 0
      let iterator = getIterator(iterable)
      while((item = iterator.next()) && !item.done) {
        yield fn.call(context, item.value, index++, iterator)
      }
    }()
  },

  /**
   * Creates a new Iterator with all elements in the supplied `iterable` that
   * pass the test implemented by `fn`. `fn` is applied lazily.
   *
   * Array.prototype.filter for iterables.
   *
   * @param {Iterable} iterable
   * @param {Function} fn Will be invoked with: value, index & iteration object
   * @param {Mixed=} context Optional. Value to use as this when executing `fn`.
   * @return {Iterator}
   */

  filter(iterable, ...args) {
    let [fn, context] = args
    return function*() {
      if (args.length === 1) context = undefined
      let iterator = getIterator(iterable)
      let item
      let index = 0
      while((item = iterator.next()) && !item.done) {
        let result = fn.call(context, item.value, index++, iterator)
        if (result) yield item.value
      }
    }()
  },

  /**
   * Creates a new Iterator which tests whether all elements that have passed
   * through the iterator thus far pass the test implemented by `fn`.
   * `fn` is applied lazily.
   *
   * Array.prototype.every for iterables.
   *
   * @param {Iterable} iterable
   * @param {Function} fn Will be invoked with: value, index & iteration object
   * @param {Mixed=} context Optional. Value to use as this when executing `fn`.
   * @return {Iterator}
   */

  every(iterable, ...args) {
    let [fn, context] = args
    return function*() {
      if (args.length === 1) context = undefined
      let iterator = getIterator(iterable)
      let item
      let index = 0
      let every = true
      while((item = iterator.next()) && !item.done) {
        every = !!fn.call(context, item.value, index++, iterator)
        if (every) {
          yield true
        } else {
          yield false
          return false
        }
      }
    }()
  },

  /**
   * Creates a new Iterator which tests whether any elements that have passed
   * through the iterator thus far pass the test implemented by `fn`.
   * `fn` is applied lazily.
   *
   * Array.prototype.some for iterables.
   *
   * @param {Iterable} iterable
   * @param {Function} fn Will be invoked with: value, index & iteration object
   * @param {Mixed=} context Optional. Value to use as this when executing `fn`.
   * @return {Iterator}
   */

  some(iterable, ...args) {
    let [fn, context] = args
    return function*() {
      if (args.length === 1) context = undefined
      let iterator = getIterator(iterable)
      let index = 0
      let item
      let some = false
      while((item = iterator.next()) && !item.done) {
        some = !!fn.call(context, item.value, index++, iterator)
        if (some) {
          yield true
          return true
        } else {
          yield false
        }
      }
    }()
  },

  /**
   * Creates a new Iterator that lazily applies `fn` against an accumulator.
   * Each step of the iteration reduces it to a single value.
   *
   * Array.prototype.reduce for iterables.
   *
   * @param {Iterable} iterable
   * @param {Function} fn Will be invoked with: previousValue, currentValue, index & iteration object.
   * @param {Mixed=} initialValue Optional. Object to use as the first argument to the first call of `fn`.
   * @return {Iterator}
   */

  reduce(iterable, ...args) {
    let [fn, initialValue] = args
    return function*() {
      let item
      let index = 0
      let iterator = getIterator(iterable)
      var result = initialValue
      if (index === 0 && args.length === 1) {
        let firstIteration
        if ((firstIteration = iterator.next()) && !item.done) {
          result = firstIteration.value
        }
      }
      while((item = iterator.next()) && !item.done) {
        yield result = fn(result, item.value, index++, iterator)
      }
    }()
  },

  /**
   * Creates a new Iterator comprising of the first iterable joined with the second iterable.
   *
   * Array.prototype.concat for iterables.
   *
   * @param {Iterable} iterable
   * @param {Iterable}
   * @return {Iterator}
   */

  concat(iterable, otherIterable) {
    return function*() {
      let item
      let iterator = getIterator(iterable)
      while((item = iterator.next()) && !item.done) {
        yield item.value
      }
      let otherIterator = getIterator(otherIterable)
      while((item = otherIterator.next()) && !item.done) {
        yield item.value
      }
    }()
  },

  /**
   * Creates a new Iterator that simply contains the last element of `iterable`.
   *
   * @param {Iterable} iterable
   * @return {Iterator}
   */

  last(iterable) {
    return function*() {
      let result
      for (result of getIterator(iterable)) {}
      yield result
      return result
    }()
  },

  /**
   * Creates a new Iterator that simply contains the first element of `iterable`.
   *
   * @param {Iterable} iterable
   * @return {Iterator}
   */

  first(iterable) {
    return function*() {
      for (let result of getIterator(iterable)) {
        yield result
        return result
      }
    }()
  },

  value(iterable) {
    return Chimes.last(iterable).next().value
  }
}

function getIterator(iterable) {
  return getIterable(iterable)[Symbol.iterator]()
}

function getIterable(iterable) {
  return typeof iterable === 'function'
  ? iterable()
  : iterable
}
