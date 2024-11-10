const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'output'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: { namedExport: false },
              // importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|webp|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.glsl$/,
        use: 'raw-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dist/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'output'),
    },
    port: 8080,
  },
};
