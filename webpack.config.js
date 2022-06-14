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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}