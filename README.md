
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
- source-map 产生sourcemap 暂时的信息最全包括行列信息 缺点是慢 需要生成文件
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
