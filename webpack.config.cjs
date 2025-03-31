const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const DotEnv = require('dotenv-webpack')

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            targets: 'defaults',
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      process: require.resolve('process/browser'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './src/index.html' }),
    new DotEnv(),
  ],
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
}
