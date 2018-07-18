import htmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import { Configuration, EnvironmentPlugin } from 'webpack';

export default {
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 9000,
    historyApiFallback: true,
  },
  entry: [
    resolve(__dirname, 'kitchen_sink'),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] } },
      { test: /\.vue?$/, loader: 'vue-loader' },
      { test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new htmlWebpackPlugin({
      template: resolve(__dirname, 'kitchen_sink/index.html'),
    }),
  ],
  resolve: {
    alias: {
      vue$: resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
    },
    extensions: ['.ts', '.tsx', '.vue', '.js'],
  },
} as Configuration;
