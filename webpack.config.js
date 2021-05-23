//webpack.config.js
var path = require('path');
var webpack = require('webpack');


module.exports = {
    // 플러그인 설정
    plugins: [
        // 환경 변수 등록/관리 설정
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        new webpack.DefinePlugin({
            NODE_ENV: 'development'

        })
    ],
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