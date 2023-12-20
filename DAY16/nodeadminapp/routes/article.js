var express = require('express');
var router = express.Router();




router.get('/list',async(req,res)=>{
    res.render('article/list',{layout:"layout"})
})

router.get('/create',async(req,res)=>{
    res.render('article/create')
}),


router.post('/create',async(req,res)=>{

    let userId = req.body.userId
    let userPassword= req.body.userPassword
    var member={
        userId,
        userPassword,
    }
    res.redirect('/article/create')
})

router.get('/delete',async(req,res)=>{
    res.redirect('/article/list')
})

router.get('/modify/:mid',async(req,res)=>{
    res.render('article/modify')
})


router.post('/modify/:mid',async(req,res)=>{
    let userId = req.body.userId
    let userPassword= req.body.userPassword
    var member={
        userId,
        userPassword,
    }

    res.redirect('/article/list')
})






module.exports = router;