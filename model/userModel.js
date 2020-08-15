const mongoose = require('mongoose')

//第一步：创建一个Schema

//这个用来做增删改查
//给表里面添加数据，设置名字和数据类型
module.exports = mongoose.model('users',mongoose.Schema({
    username:String,
    password:String,
    create_time:Number
}))