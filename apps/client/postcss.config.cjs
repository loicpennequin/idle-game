module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano'),
    require('postcss-scrollbar'),
    // require('./scripts/postcss-jit-fix')(theme),
    require('postcss-nesting')({ noIsPseudoSelector: false }),
    require('postcss-custom-media')({ preserve: false })
  ]
};
