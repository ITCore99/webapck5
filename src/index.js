import './index.css'
const mmz = require('./images/1.jpeg')
const mmz2 = require('./asset/resource/1.jpeg')
const title = require('../doc/test.txt')
console.log('hello world')
console.log(title)
const image = new Image()
const image2 = new Image()
image.src = mmz
image2.src = mmz2
document.body.appendChild(image)
document.body.appendChild(image2)

