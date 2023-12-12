var express = require('express');
var router = express.Router();


router.get('/list',async(req,res)=>{
    res.render('member/list')
})

router.get('/create',async(req,res)=>{
    res.render('member/create')
}),


router.post('/create',async(req,res)=>{
    res.redirect('member/list')
})


router.get('/modify',async(req,res)=>{
    res.render('member/modify')
})


router.post('/modify',async(req,res)=>{
    res.redirect('member/list')
})


router.get('/delete',async(req,res)=>{
    res.redirect('member/list')
})



module.exports = router;