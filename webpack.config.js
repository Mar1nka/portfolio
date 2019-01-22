const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,    // определяем тип файлов
        exclude: /node_modules/, // исключаем из обработки папку node_modules
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                url: false  // важно для пратльной работы  background: url()
              }
            },
            {
              loader: 'postcss-loader', // определяем загрузчик
              options: {                // используемые плагины
                config: {
                  path: 'postcss.config.js'
                }
              }
            }
          ]
        })
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
};