const { resolve }  =  require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // 压缩和优化css
const TerserPlugin = require('terser-webpack-plugin') // 进行对js的压缩
const Webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
console.log('env=>', process.env.NODE_ENV)
const isPord = process.env.NODE_ENV === 'production'
console.log('当前环境是否是生产环境', isPord)
module.exports =  {
  mode: process.env.NODE_ENV,
  entry: {
    main: resolve(__dirname, 'src/index.js')
  },
  // entry:  resolve(__dirname, 'src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    // 入口代码块的名称配置项
    filename: 'js/[name].[hash:10].js',
    // 非入口代码块的名称配置项 非入口代码块的来源 1、代码分割 vendor(第三方模块) common( 公用模块) 2、懒加载 import方法加载
    chunkFilename: 'js/[name].[hash:10].js'
  },
  devServer: {
    static: {
      directory: resolve(__dirname, 'public'),
    },
    hot: true,
    open: false,
    port: 3000,
    liveReload: false,
  },
  // externals: {
  //   'lodash': '_'
  // },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: {
            exposes: ['$'],
          },
        }]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,  // 这里📢记得一定要将node_modules排除不然将node_modules打包进去之后就会出现意想不到问题
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', 
                {
                  useBuiltIns: 'usage',
                  corejs: {
                    version: 3
                  },
                  // targets: {
                  //   chrome: '88',
                  //   firefox: '60'
                  // },
                  debug: false,
                  loose: true
                }
              ],  // 转化JS 语法到ES5
              '@babel/preset-react' // 转化为JSX
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }], // 处理实现属性装饰器
              ['@babel/plugin-proposal-class-properties', { loose: true }] // 处理class类属性
            ]
          }
        }]
      },
      {
        test: /\.txt$/,
        use: ['raw-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[hash:10].[ext]',
            limit: 32 * 1024,
            esModule: false,
            outputPath: 'images',
            // 注意 这里一定要加 "/" 加上 "/" 是相对于根路径 不加 "/" 是相对图片所在的当前文件路径
            publicPath: '/images'
          }
        }],
        // type: 'javascript/auto'
      }, 
      {
        test: /\.html$/i,
        use: ['html-loader']
      },
    ]
  },
  optimization: {
    minimizer: isPord ? [
      new CssMinimizerPlugin(),  // 这里的配置只能值生产环境压缩
      new TerserPlugin() // Works only with source-map, inline-source-map, hidden-source-map and nosources-source-map values for the devtool option.
    ] : [],
    minimize: isPord ? true : false, // 需要在开发环境进行压缩 使用这个选项
  },
  // devtool: 'cheap-module-source-map',
  devtool: isPord ? 'nosources-source-map' :'cheap-module-source-map',
  plugins: [
    new MiniCssExtractPlugin({ // 现将所有的css文件进行收集起来 再在plugin中对css 进行分开生成文件并将资源
      filename: 'css/[name]-[contenthash:8].css'
    }),
    new ESLintPlugin({
      exclude: ['node-modules', 'dist'],
      extensions: ['js'],
      files: resolve(__dirname, 'src'),
      fix: true
    }),
    // webpack 在打包之后会把所有打包资源放到一个叫做assets对象上 htmlWebpackPlugin会把遍历assets中的资源插入到index.html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
      filename:'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'lodash',
          entry: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js',
          global: '_'
        }
      ]
    }),
    new Webpack.ProvidePlugin({
      // _: 'lodash',
    }),
    new Webpack.DefinePlugin({ // DefinePlugin 允许创建一个在编译时可以配置的全局常量
      DEVELOPMENT: JSON.stringify(process.env.NODE_ENV === 'development'),
      VERSION: '2.0',
      EXPRESS: '1+2'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: resolve(__dirname, 'doc'), to: resolve(__dirname, 'doc') },
      ],
    })
  ]
}