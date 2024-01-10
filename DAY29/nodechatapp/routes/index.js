//공통 페이지  제공(로그인,회원가입,암호찾기)
var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs')

var db = require('../models/index')

/* GET home page. */
router.get('/login',async(req,res)=>{
  res.render('login',{layout:"authlayout",resultMsg:""})
})

router.post('/login',async(req,res)=>{
var email = req.body.email
var password = req.body.password
var member = await db.Member.findOne({where:{email:email}})
var resultMsg=""
if(member ==null){
  resultMsg = "동일한 메일주소가 존재하지 않습니다."
  res.render('login',{resultMsg})
}else{
//result 값은t/f로 나옴
  var result = await bcrypt.compare(password,member.member_password)

if(result ){
  res.redirect('/chat')
}else{
  resultMsg="사용자 암호가 일치 하지 않습니다."
  res.render('login',{resultMsg})
}
}
  
})

router.get('/entry',async(req,res)=>{
  res.render('entry',{layout:"authlayout"})
})

router.post('/entry',async(req,res)=>{
  var email = req.body.email
  var password = req.body.password
  var name = req.body.name
  //단방향 암호화 적용
  var ecryptedPassword = await bcrypt.hash(password,12)

  var member = {
    email:email,
    member_password:ecryptedPassword,
    name:name,
    profile_img_path:"",
    telephone:"",
    entry_type_code:0,
    use_state_code:1,
    reg_date:Date.now(),
    reg_member_id:0
  }
  await db.Member.create(member)
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
