var express = require('express');
var router = express.Router();


router.get('/list',async(req,res)=>{
    res.render('channel/list',{layout:"layout"})
})




router.get('/create',async(req,res)=>{
    res.render('channel/create')
}),


router.post('/create',async(req,res)=>{
    let userId = req.body.userId
    let userPassword= req.body.userPassword
    var member={
        userId,
        userPassword,
    }
    res.redirect('channel/list')
})

router.get('/delete',async(req,res)=>{
    res.redirect('/channel/list')
})

router.get('/modify/:mid',async(req,res)=>{
    res.render('channel/modify')
})


router.post('/modify/:mid',async(req,res)=>{
    let userId = req.body.userId
    let userPassword= req.body.userPassword
    var member={
        userId,
        userPassword,
    }
    res.redirect('/channel/modify')
    
})







module.exports = router;