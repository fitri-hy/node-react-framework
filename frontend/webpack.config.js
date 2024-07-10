const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

function getDependenciesFromFile() {
  const dependencies = {};
  const filePath = path.resolve(__dirname, '../dep-build.txt');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('dep-build.txt content:', data);
    data.split('\n').forEach(line => {
      const [name, version] = line.split(':').map(item => item.trim());
      if (name && version) {
        dependencies[name] = version;
      }
    });
  } catch (error) {
    console.error('Error reading dep-build.txt:', error);
  }
  console.log('Parsed dependencies:', dependencies);
  return dependencies;
}

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
        },
        { 
          from: '../.env', to: 'backend'
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
            dependencies: getDependenciesFromFile(),
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