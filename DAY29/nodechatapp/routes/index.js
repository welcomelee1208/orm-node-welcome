//공통 페이지  제공(로그인,회원가입,암호찾기)
var express = require('express');
var router = express.Router();
/*-routes\index.js - 공통기능 제공(로그인,회원가입,암호찾기)
ㄴrouter.get('/login'),views\login.ejs - 로그인 웹페이지 요청 및 응답 
ㄴrouter.post('/login') -로그인 처리 요청 및 응답,로그인 완료 후 채팅 페이지 이동처리
ㄴrouter.get('/entry'),views\entry.ejs - 회원가입 웹페이지 요청 및 응답 
ㄴrouter.post('/entry') -회원가입 처리 요청 및 응답,회원가입 완료 후 로그인 페이지 이동처리
ㄴrouter.get('/find'),views\find.ejs - 암호 찾기 웹페이지 요청 및 응답 
ㄴrouter.post('/find') -암호찾기 처리 요청 및 응답,암호 찾기 완료 후 로그인 페이지 이동처리*/
/* GET home page. */
router.get('/login',async(req,res)=>{
  res.render('login',{layout:"authlayout"})
})

router.post('/login',async(req,res)=>{

  res.redirect('/chat')
})

router.get('/entry',async(req,res)=>{
  res.render('entry',{layout:"authlayout"})
})

router.post('/entry',async(req,res)=>{
  res.redirect('/login');
})
router.get('/find',async(req,res)=>{
  res.render('find',{layout:"authlayout"})
})
// 암호찾기 사용자 입력 정보 처리 요청과 응답
router.post('/find',async(req,res)=>{
  res.render('/login',{email:"", result:"ok"})
})










module.exports = router;
