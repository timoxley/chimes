"use strict";

var _slice = Array.prototype.slice;
var _slicedToArray = function (arr, i) {
  if (Array.isArray(arr)) {
    return arr;
  } else {
    var _arr = [];

    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);

      if (i && _arr.length === i) break;
    }

    return _arr;
  }
};

"use strict";

var Chimes = module.exports = {

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

  map: function (iterable) {
    var args = _slice.call(arguments, 1);

    var _args = _slicedToArray(args, 2);

    var fn = _args[0];
    var context = _args[1];
    return regeneratorRuntime.mark(function callee$1$0() {
      var item, index, iterator;
      return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (args.length === 1) context = undefined;
            item = undefined;
            index = 0;
            iterator = getIterator(iterable);
          case 4:
            if (!((item = iterator.next()) && !item.done)) {
              context$2$0.next = 9;
              break;
            }
            context$2$0.next = 7;
            return fn.call(context, item.value, index++, iterator);
          case 7:
            context$2$0.next = 4;
            break;
          case 9:
          case "end":
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    })();
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

  filter: function (iterable) {
    var args = _slice.call(arguments, 1);

    var _args2 = _slicedToArray(args, 2);

    var fn = _args2[0];
    var context = _args2[1];
    return regeneratorRuntime.mark(function callee$1$0() {
      var iterator, item, index, result;
      return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (args.length === 1) context = undefined;
            iterator = getIterator(iterable);
            item = undefined;
            index = 0;
          case 4:
            if (!((item = iterator.next()) && !item.done)) {
              context$2$0.next = 11;
              break;
            }
            result = fn.call(context, item.value, index++, iterator);
            if (!result) {
              context$2$0.next = 9;
              break;
            }
            context$2$0.next = 9;
            return item.value;
          case 9:
            context$2$0.next = 4;
            break;
          case 11:
          case "end":
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    })();
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

  every: function (iterable) {
    var args = _slice.call(arguments, 1);

    var _args3 = _slicedToArray(args, 2);

    var fn = _args3[0];
    var context = _args3[1];
    return regeneratorRuntime.mark(function callee$1$0() {
      var iterator, item, index, every;
      return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (args.length === 1) context = undefined;
            iterator = getIterator(iterable);
            item = undefined;
            index = 0;
            every = true;
          case 5:
            if (!((item = iterator.next()) && !item.done)) {
              context$2$0.next = 17;
              break;
            }
            every = !!fn.call(context, item.value, index++, iterator);
            if (!every) {
              context$2$0.next = 12;
              break;
            }
            context$2$0.next = 10;
            return true;
          case 10:
            context$2$0.next = 15;
            break;
          case 12:
            context$2$0.next = 14;
            return false;
          case 14:
            return context$2$0.abrupt("return", false);
          case 15:
            context$2$0.next = 5;
            break;
          case 17:
          case "end":
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    })();
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

  some: function (iterable) {
    var args = _slice.call(arguments, 1);

    var _args4 = _slicedToArray(args, 2);

    var fn = _args4[0];
    var context = _args4[1];
    return regeneratorRuntime.mark(function callee$1$0() {
      var iterator, index, item, some;
      return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (args.length === 1) context = undefined;
            iterator = getIterator(iterable);
            index = 0;
            item = undefined;
            some = false;
          case 5:
            if (!((item = iterator.next()) && !item.done)) {
              context$2$0.next = 17;
              break;
            }
            some = !!fn.call(context, item.value, index++, iterator);
            if (!some) {
              context$2$0.next = 13;
              break;
            }
            context$2$0.next = 10;
            return true;
          case 10:
            return context$2$0.abrupt("return", true);
          case 13:
            context$2$0.next = 15;
            return false;
          case 15:
            context$2$0.next = 5;
            break;
          case 17:
          case "end":
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    })();
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

  reduce: function (iterable) {
    var args = _slice.call(arguments, 1);

    var _args5 = _slicedToArray(args, 2);

    var fn = _args5[0];
    var initialValue = _args5[1];
    return regeneratorRuntime.mark(function callee$1$0() {
      var item, index, iterator, result, firstIteration;
      return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            item = undefined;
            index = 0;
            iterator = getIterator(iterable);
            result = initialValue;
            if (index === 0 && args.length === 1) {
              firstIteration = undefined;
              if ((firstIteration = iterator.next()) && !item.done) {
                result = firstIteration.value;
              }
            }
          case 5:
            if (!((item = iterator.next()) && !item.done)) {
              context$2$0.next = 10;
              break;
            }
            context$2$0.next = 8;
            return result = fn(result, item.value, index++, iterator);
          case 8:
            context$2$0.next = 5;
            break;
          case 10:
          case "end":
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    })();
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

  concat: function (iterable, otherIterable) {
    return regeneratorRuntime.mark(function callee$1$0() {
      var item, iterator, otherIterator;
      return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            item = undefined;
            iterator = getIterator(iterable);
          case 2:
            if (!((item = iterator.next()) && !item.done)) {
              context$2$0.next = 7;
              break;
            }
            context$2$0.next = 5;
            return item.value;
          case 5:
            context$2$0.next = 2;
            break;
          case 7:
            otherIterator = getIterator(otherIterable);
          case 8:
            if (!((item = otherIterator.next()) && !item.done)) {
              context$2$0.next = 13;
              break;
            }
            context$2$0.next = 11;
            return item.value;
          case 11:
            context$2$0.next = 8;
            break;
          case 13:
          case "end":
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    })();
  },

  /**
   * Creates a new Iterator that simply contains the last element of `iterable`.
   *
   * @param {Iterable} iterable
   * @return {Iterator}
   */

  last: function (iterable) {
    return regeneratorRuntime.mark(function callee$1$0() {
      var result, _iterator, _step;
      return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            result = undefined;
            for (_iterator = getIterator(iterable)[Symbol.iterator](); !(_step = _iterator.next()).done;) {
              result = _step.value;
            }

            context$2$0.next = 4;
            return result;
          case 4:
            return context$2$0.abrupt("return", result);
          case 5:
          case "end":
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    })();
  },

  /**
   * Creates a new Iterator that simply contains the first element of `iterable`.
   *
   * @param {Iterable} iterable
   * @return {Iterator}
   */

  first: function (iterable) {
    return regeneratorRuntime.mark(function callee$1$0() {
      var _iterator2, _step2, result;
      return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _iterator2 = getIterator(iterable)[Symbol.iterator]();
          case 1:
            if ((_step2 = _iterator2.next()).done) {
              context$2$0.next = 8;
              break;
            }
            result = _step2.value;
            context$2$0.next = 5;
            return result;
          case 5:
            return context$2$0.abrupt("return", result);
          case 6:
            context$2$0.next = 1;
            break;
          case 8:
          case "end":
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    })();
  },

  value: function (iterable) {
    return Chimes.last(iterable).next().value;
  }
};

function getIterator(iterable) {
  return getIterable(iterable)[Symbol.iterator]();
}

function getIterable(iterable) {
  return typeof iterable === "function" ? iterable() : iterable;
}

