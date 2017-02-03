# react-pattern-match

[![npm version](https://badge.fury.io/js/react-nes.svg)](https://badge.fury.io/js/react-pattern-match)
[![Build Status](https://travis-ci.org/tkh44/react-pattern-match.svg?branch=master)](https://travis-ci.org/tkh44/react-pattern-match)
[![codecov](https://codecov.io/gh/tkh44/react-pattern-match/branch/master/graph/badge.svg)](https://codecov.io/gh/tkh44/react-pattern-match)

```bash
npm install -S react-pattern-match
```

Is this really pattern matching? No, but it is fun to pretend.

### Basic
```javascript
const App = (props) => {
  return (
    <Match value={props.number}>
      {({ assert, is, isNot }) => [
        assert(props.number === 5, <IWillMount />),
        assert(props.number !== 5, <IWillNotMount />),
        assert((val) => val === 5, <IWillMount />),
        is(5, <IWillMount />),
        isNot(5, <IWillNotMount />),
      ]}
    </Match>
  )
}
```

### Without Fiber
**The other examples are returning arrays which is only available in ReactDOMFiber. If you are not using ReactDOMFiber you need to wrap the return with a Component or Element.**

```javascript
const App = (props) => {
  return (
    <Match value={5}>
      {({ is, isNot }) => (
        <div>
          {is(5, <IWillMount />)}
          {isNot(5, <IWillNotMount />)}
        </div>
      )}
    </Match>
  )
}
```

### Fun with matches
```javascript
const App = (props) => {
  return ( 
    <Match value={props.response}>
      {({ doesNotExist, matches }) => [
        // Renders if response does not exist
        doesNotExist(<Loading />),
        // Renders if response.ok is true
        matches({ ok: true }, <Content data={props.response.data} />),
        // Renders if response.ok is false
        matches({ ok: false }, <Error res={props.response} />)
      ]}
    </Match>
  )
}
```

### Nesting
```javascript
const App = (props) => {
  return ( 
    <Match value={props.response}>
      {({ doesNotExist, matches }) => [
        // Renders if response.status is 200 and response.ok is false
        matches(
          { status: 200 }, 
          matches(
            { ok: true }, 
            <Box name='content'/>
          )
        )
      ]}
    </Match>
  )
}
```

### All available functions
```javascript
const Box = (props) => (<div>{props.name}</div>)

const App = (props) => {
  return <Match value={4}>
    {({ assert, exists, doesNotExist, is, isNot, equals, doesNotEqual, isTypeOf, notTypeOf, matches, doesNotMatch, lessThan, lessThanOrEqualTo, greaterThan, greaterThanOrEqualTo }) => [
        assert((val) => val === 4, <Box name='assert'/>),
        exists(<Box name='exists'/>),
        doesNotExist(<Box name='doesNotExist'/>), // Won't render
        is(4, <Box name='is'/>),
        isNot(6, <Box name='isNot'/>),
        isTypeOf('number', <Box name='isTypeOf'/>),
        notTypeOf('function', <Box name='notTypeOf'/>),
        matches(4, <Box name='matches'/>), // uses tmatch
        doesNotMatch(6, <Box name='doesNotMatch'/>),// uses tmatch
        lessThan(5, <Box name='lessThan'/>),
        lessThanOrEqualTo(4, <Box name='lessThanOrEqualTo'/>),
        greaterThan(3, <Box name='greaterThan'/>),
        greaterThanOrEqualTo(4, <Box name='greaterThanOrEqualTo'/>)
    ]}
  </Match>
}
```


#### Thanks
I got the test function ideas from https://github.com/mjackson/expect
