const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    // App point-of-entry
    './src/index.js',
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
        ],
        exclude: /node_modules/,
      },
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.js$/,
        // Re: ordering see https://github.com/MoOx/eslint-loader#usage
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // The public URL address of the output files when referenced in a browser.
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // Required for HMR
    new webpack.NoEmitOnErrorsPlugin(),
    // Generate an index.html file in dist/ from the template.
    new HTMLWebpackPlugin({
      template: 'index.html',
      title: 'Web Skeleton',
    }),
  ],
}
