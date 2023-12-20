var express = require('express');
var router = express.Router();

//회원 목록 웹페이지 요청 라우팅 메소드
router.get('/list',async(req,res)=>{
    res.render('member/list',{layout:"layout"})
})
//회원 정보 조회처리 라우팅 메소드
router.get('/create',async(req,res)=>{
    res.render('member/create')
}),


router.post('/create',async(req,res)=>{

    res.redirect('/member/list')
})
router.get('/delete',async(req,res)=>{
    res.redirect('/member/list')
})

//뢰원정보 수정 웹페이지
router.get('/modify/:mid',async(req,res)=>{
    res.render('member/modify')
})


router.post('/modify/:mid',async(req,res)=>{

    res.redirect('/member/list')
})





module.exports = router;