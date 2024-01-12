var express = require('express');
var router = express.Router();
var bycrpt = require('bcryptjs')
var db = require('../models/index')
/*관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드
호출주소:http://localhost:3000/
*/
router.get('/',async(req, res, next)=>{
  var admin_id = req.session.loginUser.admin_id
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
      

      var sessionLoginData={
        admin_member_id:member.admin_member_id,
        company_code:member.company_code,
        admin_id:member.admin_id,
        admin_name:member.admin_name
      }
      //req.session 속성에 동적 속성으로 loginUser 라는 ㄴ속성을 생성하고 값으로 세션 json값을 세팅
      req.session.loginUser = sessionLoginData
      //반드시 req.session.save()메소드를 호출해서 동적속성에 저장된 신규속성을 저장한다.
      //save()호출과 동시에쿠키파일이 서버에 서 생성되고 생성된 쿠키파일이 현재 사용자 웹브라우저에 전달되어 저장된다.
      //저장된 쿠키파일은 이후 해당 사이트 요청이 있을때마다 무조건 전달된다.
      //전달된 쿠키 정보를 이용해 서버메모리상의 세션 정보를 이용해 로그인한 사용자 정보를 추출한다.
      req.session.save(function(){
        //step4.1: 암호가 동일한 경우 메인페이지 이동 
        res.redirect('/');
      })
      
    }else{
      //step4.2: 암호가 다른 경우
      resultMsg ="암호가 일치하지 않습니다."
    }
  } 
  
}); 
module.exports = router;
