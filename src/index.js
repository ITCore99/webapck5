import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
ReactDOM.render(<h1>hello React</h1>, document.querySelector('#root'))
// const mmz = require('./images/1.jpeg')
// const mmz2 = require('./asset/resource/1.jpeg')
// const title = require('../doc/test.txt')
// console.log('hello world')
// console.log(title)
// const image = new Image()
// const image2 = new Image()
// image.src = mmz
// image2.src = mmz2
// document.body.appendChild(image)
// document.body.appendChild(image2)
const sum = (a, b) => a + b
console.log('sum=>', sum(1, 2))
function readonly(target, key, descriptor) {
  descriptor.writable = false
}
class Person {
  @readonly PI = 3.24
}
const p = new Person()
p.PI = 3.15 // 报错
console.log('p =>', p)
