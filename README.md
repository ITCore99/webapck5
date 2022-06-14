
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
