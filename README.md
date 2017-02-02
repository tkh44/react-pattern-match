# react-pattern-match

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

```bash
npm install -S react-pattern-match
```

Is this really pattern matching? No, but it is fun to pretend.

**These examples are returning arrays which is only available in ReactDOMFiber. If you are not using ReactDOMFiber you need to wrap the return with a Component or Element.**

### Basic
```javascript
const App = (props) => {
  <Match value={5}>
    {({ is, isNot }) => [
      is(5, <IWillMount />),
      isNot(5, <IWillNotMount />)
    ]}
  </Match>
}
```

### Basic
```javascript
const App = (props) => {
  <Match value={props.response}>
    {({ doesNotExist, matches }) => [
      doesNotExist(<Loading />),
      matches({ ok: true }, <Content data={props.response.data} />),
      matches({ ok: false }, <Error res={props.response} />)
    ]}
  </Match>
}
```

### All available functions
```javascript
const Box = (props) => (<div>{props.name}</div>)

const App = (props) => {
  <Match value={4}>
    {({ exists, doesNotExist, is, isNot, equals, doesNotEqual, isTypeOf, notTypeOf, matches, doesNotMatch, lessThan, lessThanOrEqualTo, greaterThan, greaterThanOrEqualTo }) => [
        exists(<Box name='exists'/>),
        doesNotExist(<Box name='doesNotExist'/>),
        is(4, <Box name='is'/>),
        isNot(6, <Box name='isNot'/>),
        equals(Number('4'), <Box name='equals'/>), // uses is-equal
        doesNotEqual(6, <Box name='doesNotEqual'/>), // uses is-equal
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


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/tkh44/react-pattern-match

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-pattern-match

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/tkh44/react-pattern-match
