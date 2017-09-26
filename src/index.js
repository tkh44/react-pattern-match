import { Component, Children, createElement } from 'react'
import isEqual from 'lodash.isequal'

function isFunction (thing) {
  return typeof thing === 'function'
}

export default class Match extends Component {
  constructor (props, context) {
    super(props, context)
    this.equals = this.equals.bind(this)
  }

  render () {
    return this.props.render(this.equals)
  }

  equals (test, render) {
    const value = isFunction(this.props.value)
      ? this.props.value()
      : this.props.value
    const testVal = isFunction(test) ? test() : test

    if (isEqual(value, testVal)) {
      return render()
    }
  }
}
