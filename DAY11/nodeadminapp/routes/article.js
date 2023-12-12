var express = require('express');
var router = express.Router();


router.get('/list',async(req,res)=>{
    res.render('article/list')

})




router.get('/create',async(req,res)=>{
    res.render('article/create',{title:'create'})
}),


router.post('/create',async(req,res)=>{
    res.redirect('article/create',{title:'create'})
})


router.get('/modify',async(req,res)=>{
    res.render('article/modify')
})


router.post('/modify',async(req,res)=>{
    res.redirect('article/modify')
})


router.get('/delete',async(req,res)=>{
    res.redirect('article/list')
})




module.exports = router;