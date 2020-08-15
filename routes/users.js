//引入
var express = require('express');
var router = express.Router();
var userModel = require('../model/userModel')
var jwt = require('../utils/jwt')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/user',function(req,res){
  userModel.find({}).then(arr=>{
      res.json({err:0,msg:'success',data:arr})
  })
})

//管理系统登录
router.post('/cms/regist',function(req,res,next){
  let {username,password,password2}=req.body
  userModel.find({username}).then(arr=>{
    if(arr.length>0){
      res.json({err:1,msg:'当前用户名已被占用'})
    }else{
      //验证用户名没问题就加入数据库
      let user={
        username,
        password,
        create_time:Date.now()
      }
      userModel.insertMany([user].then(()=>{
        res.json({err:0,msg:'注册成功'})
      }))
    }
  })
})


router.post('/cms/login',function(req,res){
  let{username,password}=req.body
  //登录成功，就返回token给前端
  userModel.find({username,password}),then((arr)=>{
    if(arr.length===1){
      let data = {
        err:0,
        msg:'登录成功',
        data:{
          token:jwt.createToken({username,password}),
          username
        }
      }
      res.json(data)
    }
  })
})


router.get('/all',function(req,res,next){
  //查询数据库
  userModel.find({}).then(arr=>{
    console.log('user arr',arr)
    let data={
      err:0,
      msg:'success',
      data:{
        list:arr
      }
    }
    res.json(data)
  })
})



module.exports = router;
