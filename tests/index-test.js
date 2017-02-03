/* eslint-env mocha */
import expect from 'expect'
import React from 'react'
const { createElement: h } = React
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

  it('all fns are present', (done) => {
    render((
      <Match value={4}>
        {({ assert, exists, doesNotExist, is, isNot, isTypeOf, notTypeOf, matches, doesNotMatch, lessThan, lessThanOrEqualTo, greaterThan, greaterThanOrEqualTo }) => [
          assert((val) => val === 4, <Box name='assert'/>),
          exists(<Box name='exists'/>),
          doesNotExist(<Box name='doesNotExist'/>),
          is(4, <Box name='is'/>),
          isNot(6, <Box name='isNot'/>),
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
        <div>assert</div>
        <div>exists</div>
        <div>is</div>
        <div>isNot</div>
        <div>isTypeOf</div>
        <div>notTypeOf</div>
        <div>matches</div>
        <div>doesNotMatch</div>
        <div>lessThan</div>
        <div>lessThanOrEqualTo</div>
        <div>greaterThan</div>
        <div>greaterThanOrEqualTo</div>
      `.replace(/\s+/g, ''))

      done()
    })
  })

  it('negate value', (done) => {
    render((
      <Match value={6}>
        {({ exists, doesNotExist, is, isNot, equals, doesNotEqual, isTypeOf, notTypeOf, matches, doesNotMatch, lessThan, lessThanOrEqualTo, greaterThan, greaterThanOrEqualTo }) => [
          exists(<Box name='exists'/>),
          doesNotExist(<Box name='doesNotExist'/>),
          is(4, <Box name='is'/>),
          isNot(6, <Box name='isNot'/>),
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

      done()
    })
  })

  it('value is empty', (done) => {
    render((
      <Match value={undefined}>
        {({ exists, doesNotExist, is, isNot, equals, doesNotEqual, isTypeOf, notTypeOf, matches, doesNotMatch, lessThan, lessThanOrEqualTo, greaterThan, greaterThanOrEqualTo }) => [
          exists(<Box name='exists'/>),
          doesNotExist(<Box name='doesNotExist'/>),
          is(4, <Box name='is'/>),
          isNot(6, <Box name='isNot'/>),
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
        <div>notTypeOf</div>
        <div>doesNotMatch</div>
      `.replace(/\s+/g, ''))

      done()
    })
  })

  it('matches works', (done) => {
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

      done()
    })
  })

  it('nesting', (done) => {
    const res = {
      status: 200,
      ok: true
    }

    render((
      <Match value={res}>
        {({ doesNotExist, matches }) => [
          matches({ status: 200 }, matches({ ok: true }, <Box name='content'/>))
        ]}
      </Match>
    ), node, () => {
      expect(node.innerHTML).toBe(`
        <div>content</div>
      `.replace(/\s+/g, ''))

      done()
    })
  })

  it('assert', (done) => {
    const res = {
      status: 200,
      ok: true
    }

    render((
      <Match value={res}>
        {({ assert }) => [
          assert((val) => val.status === 200, <Box name='content'/>),
          assert((val) => val.status !== 200, <Box name='error' />),
          assert(res.status === 200, <Box name='content'/>),
          assert(res.status !== 200, <Box name='error'/>)
        ]}
      </Match>
    ), node, () => {
      expect(node.innerHTML).toBe(`
        <div>content</div>
        <div>content</div>
      `.replace(/\s+/g, ''))

      done()
    })
  })

  it('no fiber :(', (done) => {
    require('react-dom').render((
      <Match value={5}>
        {({ is, isNot }) => (
          <div>
            {is(5, <Box name='is' />)}
            {isNot(5, <Box name='isNot' />)}
          </div>
        )}
      </Match>
    ), node, () => {
      expect(node.innerHTML).toBe('<div data-reactroot=""><div>is</div></div>')

      done()
    })
  })

  it('no jsx', (done) => {
    render(
      h(Match, { value: 5 }, ({ is, isNot }) => [
        is(
          5,
          h(Box, { name: 'is' })
        ),
        isNot(
          5,
          h(Box, { name: 'is' })
        )
      ]), node, () => {
        expect(node.innerHTML).toBe('<div>is</div>')

        done()
      }
    )
  })

  it('using factories', (done) => {
    const response = {
      status: 200,
      ok: true
    }

    const match = (cb) => h(Match, { value: response }, cb)
    const renderLoading = () => h(Box, { name: 'loading' })
    const renderError = () => h(Box, { name: 'error' })
    const renderContent = () => h(Box, { name: 'content' })

    render(
      match(({doesNotExist, matches}) => [
        doesNotExist(renderLoading()),
        matches({ ok: false }, renderError()),
        matches({ status: 200 }, renderContent())
      ]), node, () => {
        expect(node.innerHTML).toBe('<div>content</div>')

        done()
      }
    )
  })

  it('match factory can be passed down', (done) => {
    let match
    const res = {
      status: 200,
      ok: true
    }

    const Parent = ({ response }) => {
      match = (cb) => h(Match, {value: response}, cb)

      return <Child match={match} response={response}/>
    }

    const Child = (props) => {
      expect(props.match).toBe(match)

      return props.match(({doesNotExist, matches}) => [
        doesNotExist(<Box name='loading'/>),
        matches({ok: false}, <Box name='error'/>),
        matches({ok: true}, <Box match={match} name='content'/>)
      ])
    }

    render(
      (
        <Parent response={res} />
      ),
      node,
      () => {
        expect(node.innerHTML).toBe('<div>content</div>')

        done()
      }
    )
  })
})
