module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'PatternMatch',
      externals: {
        react: 'React'
      }
    }
  }
}
