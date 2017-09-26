# react-pattern-match

[![npm version](https://badge.fury.io/js/react-nes.svg)](https://badge.fury.io/js/react-pattern-match)
[![Build Status](https://travis-ci.org/tkh44/react-pattern-match.svg?branch=master)](https://travis-ci.org/tkh44/react-pattern-match)
[![codecov](https://codecov.io/gh/tkh44/react-pattern-match/branch/master/graph/badge.svg)](https://codecov.io/gh/tkh44/react-pattern-match)

```bash
npm install -S react-pattern-match
```

Is this really pattern matching? No, but it is fun to pretend.

**For React 16 and above only**


### Basic

```javascript
const App = (props) => {
  return (
    <Match value={4}>
      {eq => [
        eq(4, () => <Box name="I will render" />),
        eq(5, () => <Box name="I will not render" />),
        eq(() => 4, () => <Box name="I will render, fn value is equal" />)
      ]}
    </Match>
  )
}
```

## Match

`Match` uses [`lodash.isEqual`](https://lodash.com/docs/#isEqual) to compare a given value vs one provided in the render callback.

*From the lodash docs*
> Performs a deep comparison between two values to determine if they are equivalent.
  
  Note: This method supports comparing arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, and typed arrays. Object objects are compared by their own, not inherited, enumerable properties. Functions and DOM nodes are compared by strict equality, i.e. ===.

**props**

- `value`: **any** - Base value to compare against

- `render`: **function** - Function that receives one argument, `equal`
    
    `equal` is a function that accepts 2 arguments:
        
        - `test`: **any** - Value to compare against value supplied in props
        - `render`: **function** - Function that returns children. Called only if `lodash.isEqual(value, test)`


### Function as Value

If the `value` prop or `test` value are functions they will be called before being passed to `lodash.isEqual`.

```javascript
function getValue () {
  return ['a', 'b', 'c']
}

const App = (props) => {
  return (
    <Match value={getValue}>
      {eq => [
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
    </Match>
  )
}
```

