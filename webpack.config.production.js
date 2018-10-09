const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const SERVER_BASE_URL = JSON.stringify("https://web.clearpoll.com");

const common = {
  rules: [
    {
      test: /\.(js|jsx|mjs)$/,
      include: path.resolve(__dirname, 'src'),
      loader: require.resolve('babel-loader'),
      options: {
        presets: ['react'],
        cacheDirectory: true,
      },
    },
    {
      oneOf: [
       /* {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },*/
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader",
          })
        },
        {
          exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        }
      ]
    }
  ],
};

const clientConfig = {
  entry: './src/App.js',
  mode: "production",
  //devtool: 'eval-cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/',
  },
  module: common,
  plugins: [
    new webpack.DefinePlugin({
      IS_SERVER: false,
      SERVER_BASE_URL,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    }),
    new ExtractTextPlugin('style.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /style\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    //new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          compress: {
            inline: false,
            drop_console: true
          }
        }}
      )
    ],
    nodeEnv: 'production'
  }
};

const serverConfig = {
  entry: './src/server.js',
  mode: "production",
  //devtool: 'eval-cheap-module-source-map',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
    publicPath: '/public/',
  },
  module: common,
  plugins: [
    new webpack.DefinePlugin({
      IS_SERVER: true,
      SERVER_BASE_URL,
    }),
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
    ,
    new ExtractTextPlugin('style.css')
  ],
};

const clientWidgetConfig = {
  entry: './src/widget/widget.js',
  mode: "production",
  //devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'widget.js',
    publicPath: '/public/',
  },
  module: common,
  plugins: [
    new webpack.DefinePlugin({
      IS_SERVER: false,
      SERVER_BASE_URL,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
            drop_console: true
          }
        }}
      )
    ],
    nodeEnv: 'production'
  }
};

const widgetConfig = {
  entry: './src/WidgetApp.js',
  mode: "production",
  //devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'widgetBundle.js',
    publicPath: '/public/',
  },
  module: common,
  plugins: [
    new webpack.DefinePlugin({
      IS_SERVER: false,
      SERVER_BASE_URL,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    }),
    new ExtractTextPlugin('widgetStyle.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /widgetStyle\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    //new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
            drop_console: true
          }
        }}
      )
    ],
    nodeEnv: 'production'
  }
};

module.exports = [clientConfig, serverConfig, clientWidgetConfig, widgetConfig];
