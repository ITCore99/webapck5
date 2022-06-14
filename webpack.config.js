const { resolve }  =  require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports =  {
  mode: 'development',
  entry: resolve(__dirname, 'src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: resolve(__dirname, 'public'),
    },
    hot: true,
    open: true,
    port: 3000,
    liveReload: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',  // 转化JS 语法到ES5
              '@babel/preset-react' // 转化为JSX
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }], // 处理实现属性装饰器
              ['@babel/plugin-proposal-class-properties', { loose: true }]
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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[hash:10].[ext]',
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}