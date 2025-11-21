const path = require('path');
const webpack = require('webpack');

module.exports = {
  // Entry points for our background and content scripts
  entry: {
    background: './background.js',
    content: './content.js'
  },
  // Output configuration to place bundles in dist directory
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // Clean dist directory before each build
  },
  // Target environment for Chrome extensions
  target: 'web',
  // Mode will be set by command line (production/development)
  mode: 'development',
  // Optimization settings
  optimization: {
    minimize: false // Disable minimization in development, let command line override for production
  },
  // Plugins to handle special modules
  plugins: [
    // DefinePlugin to handle Node.js globals that nspell might need
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // ProvidePlugin to make nspell work in browser environment
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  ],
  // Resolve configuration to handle imports
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
      "url": require.resolve("url/"),
      "querystring": require.resolve("querystring-es3"),
      "buffer": require.resolve("buffer/")
    }
  },
  // Module rules for handling different file types
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules/
      }
    ]
  }
};