"use strict"

module.exports = {
  Iterable(items) {
    return function*() {
      for (let item of items) yield item
    }
  }
}
