/* eslint-disable jsx-quotes */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import Match from '../index'

function Box (props) {
  return <div {...props} />
}

describe('react-pattern-match', () => {
  test('renders', () => {
    const tree = renderer
      .create(
        <Match
          value={4}
          render={eq => [
            eq(4, () => <Box name="int" />),
            eq(() => 4, () => <Box name="fn" />)
          ]}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('value is fn', () => {
    function getValue () {
      return ['a', 'b', 'c']
    }

    const tree = renderer
      .create(
        <Match
          value={getValue}
          render={eq => [
            eq(['a', 'b', 'c'], () => <Box name="should match array" />),
            eq(['a', 'b', 'c', 'd'], () =>
              <Box name="should not match array" />
            ),
            eq(() => ['a', 'b', 'c'], () => <Box name="should match fn" />),
            eq(
              () => ['a', 'b', 'c', 'd'],
              () => <Box name="should not match fn" />
            )
          ]}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
