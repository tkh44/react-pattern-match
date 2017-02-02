import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom/lib/ReactDOMFiber'

import Match from 'src/'

const Box = (props) => (<div>{props.name}</div>)

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('all fns are present', () => {
    render((
      <Match value={4}>
        {({ exists, doesNotExist, is, isNot, equals, doesNotEqual, isTypeOf, notTypeOf, matches, doesNotMatch, lessThan, lessThanOrEqualTo, greaterThan, greaterThanOrEqualTo }) => [
          exists(<Box name='exists'/>),
          doesNotExist(<Box name='doesNotExist'/>),
          is(4, <Box name='is'/>),
          isNot(6, <Box name='isNot'/>),
          equals(Number('4'), <Box name='equals'/>),
          doesNotEqual(6, <Box name='doesNotEqual'/>),
          isTypeOf('number', <Box name='isTypeOf'/>),
          notTypeOf('function', <Box name='notTypeOf'/>),
          matches(4, <Box name='matches'/>),
          doesNotMatch(6, <Box name='doesNotMatch'/>),
          lessThan(5, <Box name='lessThan'/>),
          lessThanOrEqualTo(4, <Box name='lessThanOrEqualTo'/>),
          greaterThan(3, <Box name='greaterThan'/>),
          greaterThanOrEqualTo(4, <Box name='greaterThanOrEqualTo'/>)
        ]}
      </Match>
    ), node, () => {
      expect(node.innerHTML).toBe(`
        <div>exists</div>
        <div>is</div>
        <div>isNot</div>
        <div>equals</div>
        <div>doesNotEqual</div>
        <div>isTypeOf</div>
        <div>notTypeOf</div>
        <div>matches</div>
        <div>doesNotMatch</div>
        <div>lessThan</div>
        <div>lessThanOrEqualTo</div>
        <div>greaterThan</div>
        <div>greaterThanOrEqualTo</div>
      `.replace(/\s+/g, ''))
    })
  })

  it('negate value', () => {
    render((
      <Match value={6}>
        {({ exists, doesNotExist, is, isNot, equals, doesNotEqual, isTypeOf, notTypeOf, matches, doesNotMatch, lessThan, lessThanOrEqualTo, greaterThan, greaterThanOrEqualTo }) => [
          exists(<Box name='exists'/>),
          doesNotExist(<Box name='doesNotExist'/>),
          is(4, <Box name='is'/>),
          isNot(6, <Box name='isNot'/>),
          equals(Number('4'), <Box name='equals'/>),
          doesNotEqual(6, <Box name='doesNotEqual'/>),
          isTypeOf('function', <Box name='isTypeOf'/>),
          notTypeOf('number', <Box name='notTypeOf'/>),
          matches(4, <Box name='matches'/>),
          doesNotMatch(6, <Box name='doesNotMatch'/>),
          lessThan(5, <Box name='lessThan'/>),
          lessThanOrEqualTo(4, <Box name='lessThanOrEqualTo'/>),
          greaterThan(3, <Box name='greaterThan'/>),
          greaterThanOrEqualTo(4, <Box name='greaterThanOrEqualTo'/>)
        ]}
      </Match>
    ), node, () => {
      expect(node.innerHTML).toBe(`
        <div>exists</div>
        <div>greaterThan</div>
        <div>greaterThanOrEqualTo</div>
      `.replace(/\s+/g, ''))
    })
  })

  it('value is empty', () => {
    render((
      <Match value={undefined}>
        {({ exists, doesNotExist, is, isNot, equals, doesNotEqual, isTypeOf, notTypeOf, matches, doesNotMatch, lessThan, lessThanOrEqualTo, greaterThan, greaterThanOrEqualTo }) => [
          exists(<Box name='exists'/>),
          doesNotExist(<Box name='doesNotExist'/>),
          is(4, <Box name='is'/>),
          isNot(6, <Box name='isNot'/>),
          equals(Number('4'), <Box name='equals'/>),
          doesNotEqual(6, <Box name='doesNotEqual'/>),
          isTypeOf('number', <Box name='isTypeOf'/>),
          notTypeOf('function', <Box name='notTypeOf'/>),
          matches(4, <Box name='matches'/>),
          doesNotMatch(6, <Box name='doesNotMatch'/>),
          lessThan(5, <Box name='lessThan'/>),
          lessThanOrEqualTo(4, <Box name='lessThanOrEqualTo'/>),
          greaterThan(3, <Box name='greaterThan'/>),
          greaterThanOrEqualTo(4, <Box name='greaterThanOrEqualTo'/>)
        ]}
      </Match>
    ), node, () => {
      expect(node.innerHTML).toBe(`
        <div>doesNotExist</div>
        <div>isNot</div>
        <div>doesNotEqual</div>
        <div>notTypeOf</div>
        <div>doesNotMatch</div>
      `.replace(/\s+/g, ''))
    })
  })

  it('matches works', () => {
    const res = {
      status: 404,
      ok: false
    }

    render((
      <Match value={res}>
        {({ doesNotExist, matches }) => [
          doesNotExist(<Box name='loading' />),
          matches({ status: 200 }, <Box name='content'/>),
          matches({ ok: false }, <Box name='error' />)
        ]}
      </Match>
    ), node, () => {
      expect(node.innerHTML).toBe(`
        <div>error</div>
      `.replace(/\s+/g, ''))
    })
  })
})
