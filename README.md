
# 文档知识

## webpack 中引入图片方式

- 使用require 引入
- 放在静态文件目录里面 通过html中img来进行引入 需要配置 `devServe.contentBase`
- 在CSS中通过url引入图片 需要使用cssloader来进行解析处理

## url-loader和file-loader

- url-loader是对file-loader的增强
- url-loader会判断图片大小是否大于limit，如果大于则使用file-loader处理方式如果大于则会转化为dataUrl 插入到bundle 文件中

## file-laoder只是拷贝过去吗？ 不是吧img处理成js模块吗

- 第一步 拷贝图片
- 第二步 把图片模块变为JS模块

## 为什么安装了babel-loader还要安装env, babel-loader不包括这些吗

- babel-loader  默认转化器
- babel-core 本身只是提供一个过程管理功能，把源代码转成ES6 AST，它本身也不知道具体要转化什么语法，以及语法如何转化
- babel-preset-env 提供要进行如何转化ES6 AST 到ES5 AST

## 参数 legacy 和loose 的区别

-

## output.path、output.publicpath、 devserver.publicpath 的区别

- output.path 打包出来的文件需要放置的目录
- output.publicpath 打包出来的资源引入到html中的时候需要使用什么前缀 (线上的访问目录)
- devserver.publicpath 开发环境 表示打包生成的静态文件所在的位置同时可以通过这个地址访问打包的静态资源(若是devServer里面publicPath没有设置，则会认为是output里面设置的publicPath的值) 需要保证devserver.publicpath 和 output.path 一致不然资源会出现问题
- devServer.contentBase 开发环境 用于配置额外(除去打包生成文件)静态资源文件的目录

## sourceMap 是为了解决开发代码与实际打包代码不一致当代码出现错误是帮我定位到开发代码的一种技术

- eval 使用eval包裹模块代码进行执行
- source-map 产生sourcemap 展示的信息最全包括行列信息 缺点是慢 需要生成文件
- cheap 不包含列信息 也不包含原始代码到loader编译之后代码的sourcemap映射
- module 包含原始代码到loader编译之后代码的sourcemap映射(比如 jsx to js, babel的sourcemap) 否则无法定位源文件
- inline 将map文件作为DataUrl嵌入，不单独生成.map文件

## 取值时上面五种的组合

- source-map 映射到的源文件 既包含行信息又包含列信息也包含loader的map映射文件 生成map映射文件
- cheap-source-map 看不到原始文件 是被编译过的文件 不包含列信息 生成map文件
- eval-cheap-module-source-map 包含行 不含列信息 有loader的map文件 eval包裹 （开发环境）
- cheap-module-source-map 包含行 不含列信息 有loader的map文件
- eval-source-map 说那个eval 包裹模块代码  生成map文件 (可以换缓存module的sourcemap) 运行快
- inline-source-map 不会生成单独的source-map会内嵌到打包文件中 信息也比较全
- hidden-source-map 隐藏到源代码的映射信息 (线上环境) 会生成但不会暴露（不会添加到打包文件中）

## 生产环境要使用sourcemap调试需要如何操作

1、打包的时候使用webpack.sourceMapDevToolPlugin插件动态的想打包好的文件中插入map映射
2、webpack打包仍然生成sourceMap但是将map文件挑出来放到本地服务器，将不含有map文件的部署到服务器，借助第三方软件 例如fiddler 将浏览器对应map文件请求拦截到本地服务器就可以实现本地sourcemap调试

## 打包第三方类库方式

- 1、直接通过import或者require全量引入 痛点: 比较麻烦 每次都需要引入
- 2、使用插件引入 (下面例子中的 "_" 函数会自动加到当前模块的上下文, 无需显示声明) 用途是如果一个库好多模块都需要使用到这样我们就可以全局的注入(注册到了打包之后的函数上下中，不会挂载到window上面) 痛点: 无法在全局中使用

```js
{
  new Webpack.providePlugin({
    _: 'lodash'
  })
}
```

- 3、expose-loader引入 添加对象到全局的对象上 （不需要任何的插件配合，只要将下面的代码添加到所有loader之前）详细传送门: <https://www.webpackjs.com/loaders/expose-loader/>

```js

 {
   // 注意需要在index.js引入才行
    test: require.resolve('jquery'),
    use: [{
      loader: 'expose-loader',
      options: {
        exposes: ['$'],
      },
    }]
  },
```

- 4、使用存在externals CDN引入 痛点 需要手动的去插入cdn脚本

```js
{
  externals: { // 存在externals 中的包将不会进行打包 不管代码中有没有使用到都会引入加载
   'lodash': '_'
  },
}
```

- 5、html-webpack-externals-plugin 按需引入(只有被require了之后才会加载 )同时自动插入脚本

```js
{
  new HtmlWebpackExternalsPlugin({
    externals: [
      {
        module: 'lodash',
        entry: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js',
        global: '_'
      }
    ]
  }),
}
```

## Webpack.DefinePlugin 允许创建一个在编译时可以配置的全局常量 文档传送门: <https://www.webpackjs.com/plugins/define-plugin/>

## babel中有了ployfill 为什么还有babel runtime？

- 因为引入babel polyfill 有一个缺点就是会导致全局环境和全局变量污染的问题（ployfill是通过添加或者重新全局函数和全局对象的prototype属性的方式来进行对不同的浏览器进行兼容）
- babel-runtime 正是为了解决这个问题而引申出来的包。babel-runtime更像是一种按需加载的实现，比如你哪里需要使用promise 只要在这个文件头部require Promise from "babel-runtime/core-js/promsie" 就行了. 不会污染全局变量因为引入模块之后就是模块局部变量。 配合插件@babel/plugin-transform-runtime 启用这个插件之后会自动帮我们引入babel-runtime下的工具函数

## glob文件匹配模式 *可以匹配任意字符，除了路径分隔，符号 ** 可以匹配任意字符包括路径分隔符

## webpack.devServer 和 webpack-dev-middleware

- webpack-dev-server的好处是相对简单，直接安装命令即可
- 而使用webpack-dev-middleware的好处是可以在既有的Express代码基础上快速添加webpack-dev-server的功能，同时利用Express来根据需要添加更多功能。如mock服务、代理API请求等。

## html-webpack-plugin是如何知道需要将哪些文件需要插入到index.html中的？

- webpack在打包的之后会将所有生成的资源放到一个assets对象上(通过插件emitFile方法添加) 而此插件会遍历上面的文件将上面的文件全部插入到html中 由此来实现。

## import()函数是天然的代码分割点。只要遇到import就会分离出一个单独的代码块

## hash、chunkHash、contentHash 的区别

- contentHash 根据文件内容生成的hash只有当文件的内容发生变化hash才会发生变化
- chunkHash 根据chunk中包含的所有文件模块算出的hash值 当所包含的一个文件变化 所生成的hash就会发生变化
- hansh 每次打包webpack会生成相应的hash 是由所有的代码块计算出来的hash 其中一个文件发生改变hash就会发生改变

## 一个代码可产生多个文件 main main.js main.css 可以chunk里面的文件那么多 到底取哪一个文件的contentHash作为最终的assets文件名呢？

- assets和文件是一对一的
- main代码块会产出两个assets main.js和main.css
- main.js main.css会生成两个文件 每个文件都有自己contentHash

## mode 两种取值的区别

- production: 会将代码中的process.env.NODE_ENV的值设为production. 默认会启用各种性能优化 压缩js css treeSharking 还包括对构建结果的优化以及webpack运行性能。
- development: 会将代码中的process.env.NODE_ENV的值设为development.则会开启debug工具 运行时打印详细信息以及更加快速的增量编译构建。

## sideEffects 副作用配置怎么用?

- tree-shaking在webpack5中功能变得更加的强大了，但是会存在一个问题就是会把本来不改优化的进行优化掉。这是我们就要使用sideEffects告知他那些事是不用优化的 比如css。写法如下

```json
// package.json
sideEffects: ['**/*.css']
```

## px自动转rem

- lib-flexible + rem 实现移动端自适应
- px2rem-loader自动实现将px转为rem
- px2rem
- 页面渲染的时候计算根元素的font-size的值

## 生成环境配置和优化
