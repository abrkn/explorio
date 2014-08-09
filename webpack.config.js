var bundle = {
  name: 'bundle',
  devtool: 'source-map',

  entry: [
    './src/styles/index.styl',
    './src/Application.jsx'
  ],

  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.html$/, loader: 'html' },
      { test: /\.jsx$/, loader: 'jsx' },
      { test: /\.styl$/, loader: 'style!css!autoprefixer!stylus' },
      { test: /\.(eot|ttf|woff)$/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.(png|svg)$/, loader: 'file?name=images/[name]-[hash].[ext]&size=6' }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    unsafeCache: true
  }
}

var config = [bundle]

module.exports = config
