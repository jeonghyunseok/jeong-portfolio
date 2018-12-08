//webpack.config.js
var path = require('path');
var webpack = require('webpack');


module.exports = {
   
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, 
        {
            test: /\.(png|jpg|gif|svg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    publicPath: './dist/'
                }
            }
        },
        {
            test: /\.coffee(\.erb)?$/,
            use: [{
            loader: 'coffee-loader',
            options: {
            // literate: true,
            transpile: {
            presets: ['es2015']
            }
            }
            }]
        },
        {
        resolve: {
            extensions: ['.js', '.css', '.sass', '.coffee', '.json']
            }
        }
          ]
      }
  }