var express = require('express');
var router = express.Router();


router.get('/list',async(req,res)=>{
    res.render('message/list',{layout:"layout"})
})




router.get('/create',async(req,res)=>{
    res.render('message/create')
}),


router.post('/create',async(req,res)=>{
    let userId = req.body.userId
    let userPassword= req.body.userPassword
    var member={
        userId,
        userPassword,
    }
    res.redirect('/message/list')
})

router.get('/delete',async(req,res)=>{
    res.redirect('/message/list')
})

router.get('/modify/:mid',async(req,res)=>{
    res.render('message/modify')
})



router.post('/modify/:mid',async(req,res)=>{
    
    res.redirect('/message/list')
})



module.exports = router;