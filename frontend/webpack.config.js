const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: './public/images', to: 'images'
        },
        { 
          from: '../backend', to: 'backend'
        }
      ]
    }),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          const packageJsonContent = {
            name: 'backend-app',
            version: '1.0.0',
            description: 'Backend application',
            main: 'server.js',
            scripts: {
              start: 'node server.js'
            },
            dependencies: {
              "cors": "^2.8.5",
              "express": "^4.17.1",
              "path": "^0.12.7"
            },
            license: 'MIT'
          };
          const packageJsonPath = path.join(__dirname, '..', 'dist', 'backend', 'package.json');
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));
        });
      }
    }
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9000,
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000'
    },
  }
};