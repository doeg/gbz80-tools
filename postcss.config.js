module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-cssnext')({
      features: {
        browsers: 'last 1 version, > 10%',
        customProperties: {
          variables: require('./src/style.js'),
        },
      },
    }),
  ],
}
