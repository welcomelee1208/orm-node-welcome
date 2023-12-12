var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/login',async(req,res)=>{
res.render('login')
})

router.post('/login',async(req,res)=>{
    var username = req.body.username;
    var password = req.body.userpassword;

    if (username =='admin'&& password =='password'){
        res.redirect('/')
    }else{
        res.send('로그인 실패')
    }

})


router.get('/',async(req,res)=>{
    res.render('index')
})
module.exports = router;
