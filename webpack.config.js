const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const SERVER_BASE_URL = JSON.stringify("http://node12.l2shuu.com:3001");

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
  mode: "development",
  devtool: 'eval-cheap-module-source-map',
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    //new BundleAnalyzerPlugin()
  ],
/*  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }}
      )
    ],
    nodeEnv: 'production'
  }
*/
};

const serverConfig = {
  entry: './src/server.js',
  mode: "development",
  devtool: 'eval-cheap-module-source-map',
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
//  devtool: 'eval-cheap-module-source-map',
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
            inline: false
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
 // devtool: 'eval-cheap-module-source-map',
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
            inline: false
          }
        }}
      )
    ],
    nodeEnv: 'production'
  }
};

module.exports = [clientConfig, serverConfig, clientWidgetConfig, widgetConfig];
