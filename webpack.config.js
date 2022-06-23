const { resolve }  =  require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
console.log('env=>', process.env.NODE_ENV)
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
    // 非入口代码块的名称配置项 非入口代码块的来源 1、代码分割 vendor common 2、懒加载 import方法加载
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
          'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[hash:10].[ext]',
            esModule: false
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
  devtool: 'cheap-module-source-map',
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