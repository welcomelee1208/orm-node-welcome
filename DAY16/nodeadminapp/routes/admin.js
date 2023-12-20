var express = require('express');
var router = express.Router();

//관리자 계정정보의 목록

router.get('/list',async(req,res)=>{
res.render('admin/list',{layout:"layout"})
})

//
router.get('/create',async(req,res)=>{
    res.render('admin/create',{title:'create'});
    
}),
//목록페이지 이동처리
router.post('/create',async(req,res)=>{
    let adminId = req.body.admin_Id
    let adminPassword= req.body.admin_Password
    var admin={
        adminId,
        adminPassword,
    }
    res.redirect('/admin/list')
    
})
router.get('/delete',async(req,res)=>{
    res.redirect('/admin/list')
})

router.get('/modify/:mid',async(req,res)=>{
    res.render('admin/modify')
    
})


router.post('/modify/:mid',async(req,res)=>{

  
    res.redirect('/admin/list')
})













module.exports = router;