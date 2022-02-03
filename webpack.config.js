const webpack = require('webpack')
const path = require('path')
require('dotenv').config()

const config = {
  entry: {
    index: './src/assets/scripts/index.js',
    payment: './src/assets/scripts/payment.js',
    transaction: './src/assets/scripts/transaction.js',
    'signup-form': './src/assets/scripts/signup-form.js',
    signup: './src/assets/scripts/signup.js',
    login: './src/assets/scripts/login.js',
  },
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'scripts'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      LAMBDA_ENDPOINT: JSON.stringify(process.env.LAMBDA_ENDPOINT),
      STRIPE_PUBLISHABLE_KEY: JSON.stringify(
        process.env.STRIPE_PUBLISHABLE_KEY
      ),
      PRICE_ID: JSON.stringify(process.env.PRICE_ID),
      PAYMENT_ENDPOINT: JSON.stringify(process.env.PAYMENT_ENDPOINT),
      TRANSACTION_ENDPOINT: JSON.stringify(process.env.TRANSACTION_ENDPOINT),
      EMAIL_ENDPOINT: JSON.stringify(process.env.EMAIL_ENDPOINT),
    }),
  ],
  mode: process.env.ELEVENTY_ENV,
  devtool: 'source-map',
  target: 'web',
}

module.exports = config
