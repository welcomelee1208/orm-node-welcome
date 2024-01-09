var express = require('express');
var router = express.Router();
var bycrpt = require('bcryptjs')
var db = require('../models/index')
/*관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드
호출주소:http://localhost:3000/
*/
router.get('/',async(req, res, next)=>{
  res.render('index');
});
/*관리자 웹사이트 로그인 페이지  요청과 응답처리 라우팅 메소드
호출주소:http://localhost:3000/login
*/
router.get('/login',async(req, res, next)=>{
  res.render('login',{layout:false,resulMsg:""});
});

router.post('/login',async(req, res, next)=>{
  //step1:사용자 입력아이디 암호추출하기
  var admin_id = req.body.admin_id
  var admin_password = req.body.admin_password
  //step2: 동일한 사용자 정보 조회하기
  var member = await db.Admin.findOne({where:{admin_id:admin_id}})
  var resultMsg = ""
  if (member == null){
    resultMsg="동일한 아이디가 존재하지 않습니다."
    res.render('login',{layout:false,resultMsg})
  }else{
    //step3 사용자 암호 체크하기(db에 저장된 암호와 사용자가입력한 암호체크하기)
    //bycrypt를 이용한 암호c체트 bcrypt.compare(사용자가 로그인시 입력한 암호값,'db에 저장된 암호화된값)
    //bcrypt.compare()실행결과가 불린형으로 전달
    var passwordresult = await bycrpt.compare(admin_password,member.admin_password)
    
    if(passwordresult){
      //step4.1: 암호가 동일한 경우 메인페이지 이동 
      res.redirect('/');
    }else{
      //step4.2: 암호가 다른 경우
      resultMsg ="암호가 일치하지 않습니다."
    }
  } 
  
}); 
module.exports = router;
