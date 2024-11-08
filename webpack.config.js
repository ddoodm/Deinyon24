const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
  },
};
