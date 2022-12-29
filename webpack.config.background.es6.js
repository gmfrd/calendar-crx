import path from 'path';
import webpack from 'webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';

// Project root path
const pathRoot = path.resolve(__dirname, './');
// Src path
const pathSrc = pathRoot + '/src';
// Target path
const pathCrxDist = pathRoot + '/crx/dist-background';

const config = {
  target: 'node',
  entry: {
    background: pathSrc + '/background/app.js',
  },
  output: {
    path: pathCrxDist,
    filename: 'index.js',
  },
};

if (process.env.NODE_ENV === 'development') {
  config.mode = 'development';
  config.module = {
    rules: [
      {
        test: /\.js$/,
        include: [pathSrc],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: false,
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-transform-modules-commonjs',
              ],
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              // 2KB
              limit: 16384,
              name: 'img/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  };
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
  ];
  config.devtool = 'cheap-source-map',
  config.devServer = {
    port: 8888,
    host: '0.0.0.0',
  };
} else {
  config.mode = 'production';
  config.module = {
    rules: [
      {
        test: /\.js$/,
        include: [pathSrc],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: false,
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-transform-modules-commonjs',
              ],
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              // 2KB
              limit: 16384,
              name: 'img/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  };
  config.plugins = [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [pathCrxDist],
    }),
  ];
  config.optimization = {
    minimize: true,
    // splitChunks: {
    //   chunks: 'all',
    // },
    // runtimeChunk: 'single',
  };
}

module.exports = config;
