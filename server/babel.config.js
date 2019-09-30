module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 10 } }],
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-syntax-optional-chaining',
  ],
}
