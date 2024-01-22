var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = require('../models/index');

const passport = require('passport')
//로그인 여부체크 사용자권한 세션 미들웨어 참조
const {isLoggedIn,isNotLoggedIn}
= require('./passportMiddleware')

/* 
기능: 관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드 
호출주소: http://localhost:3000/
 */
router.get('/',isLoggedIn, async(req, res, next)=> {

  //현재 로그인한 사용자 세션 정보 추출하기
  var admin_id =req.session.passport.user.admin_id;

  res.render('index.ejs');
});


/* 
기능: 관리자 웹사이트 로그인 웹페이지 요청과 응답처리 라우팅 메소드 
호출주소: http://localhost:3001/login
 */
router.get('/login', isNotLoggedIn,async(req, res, next)=> {
  res.render('login.ejs',{layout:false,resultMsg:""});
});


/* 
기능: 관리자 웹사이트 로그인 처리 라우팅 메소드 
호출주소: http://localhost:3001/login
 */
router.post('/login', async(req, res, next)=> {

  //step1:사용자 입력 아이디/암호 추출하기
  var adminId = req.body.id;
  var adminPassword = req.body.password;

  //step2:동일한 아이디 사용자 정보조회하기
  var member = await db.Admin.findOne({where:{admin_id:adminId}});

  var resultMsg = "";

  if(member == null){
    resultMsg = "동일한 아이디가 존재하지 않습니다.";
    res.render('login.ejs',{layout:false,resultMsg});
  }else{

    //step3: 사용자 암호 체크하기(db에저장된 암호와 사용자가 입력한 암호 체크하기)
    //bcrypt를 이용한 암호체크: bcrypt.compare('로그인시사용자가입력한암호값','db에저장된 암호화된값');
    //bcrypt.compare()실행결과가 boolean형으로 전달된다. true:동일, false:다름
    var passwordResult = await bcrypt.compare(adminPassword,member.admin_password);

    if(passwordResult){
      //step:4.0: 아이디/암호가 일치하는 사용자인경우 해당 사용자의 주요정보를 세션에 저장한다.

      //서버에 메모리공간에 저장할 로그인한 현재 사용자의 세션정보 구조 및 데이터바인딩
      var sessionLoginData ={
        admin_member_id:member.admin_member_id,
        company_code:member.company_code,
        admin_id:member.admin_id,
        admin_name:member.admin_name,
      };

      //req.session속성에 동적속성으로 loginUser라는 속성을 생성하고 값으로 세션 json값을 세팅
      req.session.loginUser = sessionLoginData;
      req.session.isLogined =true

      //반드시req.session.save() 메소드를 호출해서 동적속성에 저장된 신규속성을 저장한다.
      //save() 호출과 동시에 쿠키파일이 서버에서 생성되고 생성된 쿠키파일이 
      //현재 사용자 웹브라우저에 전달되어 저장된다.
      //저장된 쿠키파일은 이후 해당 사이트호 요청이 있을때마다 무조건 전달된다.
      //전달되 쿠키정보를 이용해 서버메모리상의 세션정보를 이용해 로그인한 사용자정보를 추출한다.
      req.session.save(function(){
        //step4.1:암호가 동일한경우 메인 페이지 이동하기 
        res.redirect('/');
      });

    }else{
      //step4.2:암호가 다른경우 
      resultMsg = "암호가 일치하지 않습니다.";
      res.render('login.ejs',{layout:false,resultMsg});
    }
  }

});
router.post('/passportlogin',async(req,res,next)=>{
  // local 기반으로 로그인을 진행
  passport.authenticate('local',(authError,admin,info)=>{
    if(authError){
      // 오류가 발생하면 콘솔에 로그를찍는다.
      console.log(authError)
      // app.js하단의 에러처리 로 보낸다.
      return next(authError)
    }
    if(!admin){
      // 로그인 정보가 동일하지 않을경우 flash라이브러리로 메세지 띄워주고 로그인페이지로 다시이동
      req.flash('loginerror',info.message)
      return res.redirect('/login')
    }
    //req.login=> 인증 완료시 패스포트 세션 생성
    req.login(admin,(loginError)=>{
      if (loginError){
        console.log(loginError)
        return next(loginError)
      }
      //로그인 성공시 메인페이지 이동
      return res.redirect('/')
    })
  })(req,res,next)
})
//사용자 로그아웃처리 라우팅 메소드
//http://localhost:3001/logout
router.get('/logout',isLoggedIn,async(req,res,next)=>{
  req.logout(function(err){
    //로그아웃후 관리자 로그인 페이지로 이동시키기
    req.session.destroy();
    res.redirect('/login')
  })

})

module.exports = router;
