//공통 페이지  제공(로그인,회원가입,암호찾기)
var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
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
//jwt토큰 생성웹페이지요청과 응답

router.get('/maketoken',async(req,res)=>{
  var token=""
  res.render('maketoken.ejs',{layout:false,token})
})
// jwt토큰 생성후 토큰확인하기
router.post('/maketoken',async(req,res)=>{
  var token=""
//토큰에 담을 jsondata구조 및 데이터 바인딩
//jwt토큰영역내에 payload영역에 담깁니다.
  var jsonTokenData = {
    userid:req.body.userid,
    email:req.body.email,
    usertype:req.body.usertype,
    name:req.body.name,
    telephone:req.body.telephone
    }
    //json데이터를 jwt토큰으로 생성한다.
    //jwt.sign('JSON데이터',토큰인증키,{옵션(유효기간,발급자)})
    // 파기일시 지정 포맷//30s,60m,24h,200d
    token = await jwt.sign(jsonTokenData,process.env.JWT_SECRET,{expiresIn:'24h',issuer:'welcome'})
  res.render('maketoken',{layout:false,token})
})

router.get('/readtoken',async(req,res)=>{
  var token=req.query.token
  var tokenJsonData={}
  try{
  tokenJsonData= await jwt.verify(token,process.env.JWT_SECRET);
  }catch(err){
    token="유효하지않은 토큰입니다."
  tokenJsonData = {
      userid:"",
      email:"",
      usertype:"",
      name:"",
      telephone:""
      }
  }
  res.render('readtoken.ejs',{layout:false,token,tokenJsonData})
})











module.exports = router;
