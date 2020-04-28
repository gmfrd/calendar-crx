import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';

// Project root path
const pathRoot = path.resolve(__dirname, './');
// Src path
const pathSrc = pathRoot + '/src';
// Target path
const pathCrxDist = pathRoot + '/crx/dist';

const config = {
  target: 'web',
  entry: {
    popup: pathSrc + '/popup/app.js',
    background: pathSrc + '/background/app.js',
  },
  output: {
    path: pathCrxDist,
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js',
  },
};

if (process.env.NODE_ENV === 'development') {
  config.mode = 'development';
  config.module = {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cssSourceMap: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {sourceMap: true}},
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
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
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      filename: 'background.html',
      chunks: ['background'],
    }),
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
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader',
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
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
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[name].[hash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin({
      sourceMap: false,
      cssnanoOptions: {
        preset: [
          'default',
          {
            mergeLonghand: false,
            cssDeclarationSorter: false,
          },
        ],
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      filename: 'background.html',
      chunks: ['background'],
    }),
  ];
  config.optimization = {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  };
}

module.exports = config;
