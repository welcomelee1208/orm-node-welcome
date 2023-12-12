// 공통 기능 제공 모듈
var express = require('express');
var router = express.Router();

/* GET home page. */



router.get('/',async(req,res)=>{
    res.render('index')
})

router.get('/login',async(req,res)=>{
res.render('login')
})

router.post('/login',async(req,res)=>{
    let userId = req.body.userId
    let userPassword= req.body.userPassword
    var member={
        userId,
        userPassword,
    }
    
    res.redirect('/')
    
})


module.exports = router;
