const path = require("path");
const os = require("os");
const webpack = require("webpack");
const moment = require("moment");
// 区分大小写
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
// css打包相关
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// HappyPack
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });
// 打包分析
const __analyz = process.env.analyz == 'true';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const TerserPlugin = require('terser-webpack-plugin');
const TemplateWebpackPlugin = require('./webpack.plugin.html')

const nowDateStr = moment().format("YYYY-MM-DD HH:mm:ss");

const origin = [path.resolve("node_modules/@mdf"), path.resolve("src")];
const scriptPort = 3004
const entry = {
  "mobile.extend": ["./src/extend/index.js"],
  "mobile.custom": ['./src/custom/index.jsx']
};

const isProduction = process.env.BABEL_ENV == 'production'
const publicPath = isProduction ? `/iuap-yonbuilder-mobilenode/${process.env.PREFIX}` : `http://localhost:${scriptPort}/`;

const domainKey = require('./config.js')
const outputFilename = isProduction
  ? `${domainKey}/javascripts/[name].min.js`
  : "javascripts/[name].js";
const config = {
  mode: isProduction ? "production" : "development",
  entry,
  output: {
    publicPath: publicPath,
    path: path.join(__dirname, "build"),
    filename: outputFilename
  },
  resolve: {
    alias: {
      src: path.join(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: origin,
        exclude: /node_modules/,
        use: ["happypack/loader?id=happyBabel", "webpack-conditional-loader"]
      },
      {
        test: /\.tsx?$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          { loader: "babel-loader" },
          { loader: "awesome-typescript-loader" },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        loader: "source-map-loader",
        include: origin,
      },
      {
        test: /\.(map)$/,
        loader: "ignore-map-loader",
        include: origin,
      },
      {
        test: /\.(jpg|png|gif|ico|svg)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "styles/default/images/[hash:8].[name].[ext]",
        },
        include: [origin, path.resolve("static")],
      },
      {
        test: /\.(woff|eot|ttf)\??.*$/,
        loader: "url-loader",
        options: {
          name: "fonts/[name].[md5:hash:hex:7].[ext]",
        },
      },
      {
        test: /\.(less)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: {
                "brand-primary": "#E14C46",
                "brand-primary-tap": "#dc6964",
                "rand-wait": "f53c32",
                '@ant-prefix': 'xapp-ant',
              }
            }
          },
        ]
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ],
  },
  plugins: [
    new TemplateWebpackPlugin({ domainKey }),
    new HappyPack({
      id: "happyBabel",
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true",
        },
      ],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      filename: "public/stylesheets/[name].min.css",
      chunkFilename: "public/stylesheets/[name].min.css",
      ignoreOrder: false,
    }),
    new webpack.DefinePlugin({
      "process.env.__CLIENT__": "true",
      "process.env.PREFIX": JSON.stringify(process.env.PREFIX)
    }),
  ].concat(
    [
      new CaseSensitivePathsPlugin(),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
          mergeLonghand: false,
          discardComments: { removeAll: true },
        },
        canPrint: true,
      })
    ].concat(
      [new webpack.BannerPlugin(`打包时间\nupdate: ${nowDateStr}`)]
    )
  ).concat(
    __analyz ? new BundleAnalyzerPlugin() : [],
  ),
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  devtool: "source-map"
}
if (!isProduction) {
  config.devServer = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    host: "0.0.0.0",
    hot: true,
    inline: true,
    port: scriptPort,
    historyApiFallback: true,
    disableHostCheck: true,
  };

  config.cache = true;
  config.watchOptions = {
    aggregateTimeout: 1000,
  };
}
module.exports = config;
