const {resolve, join } = require('path')
console.log(resolve('a', 'b')) // 会先进行将a参数转化为绝对路径在进行拼接 => 故取名为解析
console.log(join('a', 'b')) // 只是一个机械的连接并不会转化 => 故取名为连接
