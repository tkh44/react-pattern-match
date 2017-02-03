import { Component, Children, createElement } from 'react'
import tmatch from 'tmatch'

export default class Match extends Component {
  constructor (props, context) {
    super(props, context)

    this.assert = this.assert.bind(this)
    this.exists = this.exists.bind(this)
    this.doesNotExist = this.doesNotExist.bind(this)
    this.is = this.is.bind(this)
    this.isNot = this.isNot.bind(this)
    this.isTypeOf = this.isTypeOf.bind(this)
    this.notTypeOf = this.notTypeOf.bind(this)
    this.matches = this.matches.bind(this)
    this.doesNotMatch = this.doesNotMatch.bind(this)
    this.lessThan = this.lessThan.bind(this)
    this.lessThanOrEqualTo = this.lessThanOrEqualTo.bind(this)
    this.greaterThan = this.greaterThan.bind(this)
    this.greaterThanOrEqualTo = this.greaterThanOrEqualTo.bind(this)
  }

  render () {
    const childFn = this.props.children
    return childFn({
      assert: this.assert,
      exists: this.exists,
      doesNotExist: this.doesNotExist,
      is: this.is,
      isNot: this.isNot,
      isTypeOf: this.isTypeOf,
      notTypeOf: this.notTypeOf,
      matches: this.matches,
      doesNotMatch: this.doesNotMatch,
      lessThan: this.lessThan,
      lessThanOrEqualTo: this.lessThanOrEqualTo,
      greaterThan: this.greaterThan,
      greaterThanOrEqualTo: this.greaterThanOrEqualTo
    })
  }

  assert (fn, ...rest) {
    let result = typeof fn === 'function'
      ? fn(this.props.value)
      : !!fn

    if (result) {
      return rest
    }
  }

  exists (...rest) {
    if (this.props.value) {
      return rest
    }
  }

  doesNotExist (...rest) {
    if (!this.props.value) {
      return rest
    }
  }

  is (value, ...rest) {
    if (value === this.props.value) {
      return rest
    }
  }

  isNot (value, ...rest) {
    if (value !== this.props.value) {
      return rest
    }
  }

  isTypeOf (type, ...rest) {
    if (typeof this.props.value === type) {
      return rest
    }
  }

  notTypeOf (type, ...rest) {
    if (typeof this.props.value !== type) {
      return rest
    }
  }

  matches (pattern, ...rest) {
    if (tmatch(this.props.value, pattern)) {
      return rest
    }
  }

  doesNotMatch (pattern, ...rest) {
    if (!tmatch(this.props.value, pattern)) {
      return rest
    }
  }

  lessThan (value, ...rest) {
    if (this.props.value < value) {
      return rest
    }
  }

  lessThanOrEqualTo (value, ...rest) {
    if (this.props.value <= value) {
      return rest
    }
  }

  greaterThan (value, ...rest) {
    if (this.props.value > value) {
      return rest
    }
  }

  greaterThanOrEqualTo (value, ...rest) {
    if (this.props.value >= value) {
      return rest
    }
  }
}
