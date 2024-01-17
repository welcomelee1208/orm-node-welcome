var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
//passport 객체 참조
const passport = require('passport');
var db = require('../models/index');
//로그인 여부체크 사용자권한 세션 미들웨어 참조
// const {isLoggedIn,isNotLoggedIn}
// = require('./sessionMiddleware')
//로그인 여부체크 사용자권한 패스포트 미들웨어 참조
const {isLoggedIn,isNotLoggedIn} = require('./passportMiddleware')
/* 
기능: 관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드 
호출주소: http://localhost:3000/
 */
router.get('/',isLoggedIn, async(req, res, next)=> {

  //case1:일반세션현재 로그인한 사용자 세션 정보 추출하기
  //var admin_id = req.session.loginUser.admin_id; 
  
  //case2:패스포트 세션 기반 로그인 사용자 정보 추출하기
  var admin_id = req.session.passport.user.admin_id;

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
기능: 관리자 웹사이트 로그인 처리 라우팅 메소드 (일반 session)
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
      resultMsg = "암호가 일치하지  않습니다.";
      res.render('login.ejs',{layout:false,resultMsg});
    }
  }

});
/* 
기능: 관리자 웹사이트 로그인 처리 라우팅 메소드 (passport 기반)
호출주소: http://localhost:3001/login
 */
router.post('/passportlogin',async(req,res,next)=>{
  //패스포트 기반 로그인 인증처리 메소드 호출하여 패스포트 기반으로 로그인 실시한다.
  //
  passport.authenticate('local',(authError,admin,info)=>{
    if(authError){
      console.log(authError)
      return next(authError)
    }
    //로컬 전략 파일에서 전달된 관리자 세션 데이터가 전달이 안된 경우.
    // 동일 아이디와 암호가 없는 경우 done('',false)두번째 파라메터의 값이 false로 전달됨
    //아이디 암호가 틀린 경우 체크
    if(!admin){
      //flash 패키지 필요: flash패키지는 서버 기반에서 특정 페이지 이동시 바로전에 특정 데이터를 전달해주고 싶을떄 사용
      //req.flash('키명',키값)
      req.flash('loginerror',info.message)
      return res.redirect('/login')
    }
    //정상적으로passport 인증이 완료된 경우
    // req.login('세션으로 저장할 사용자 데이타',처리결과 콜백함수)은 passport 기반 정상 인증이 완료되면 passport 세션을 생성해주는 기능 제공
    req.login(admin,(loginError)=>{
      if(loginError){
        console.log(loginError)
        return next(loginError)
      }
      // 정상 적으로 세션 데이터가 세션에 반영된 경우
      return res.redirect('/')//메인 대시보드 페이지 이동
    })
  })(req,res,next)
})



//사용자 로그아웃처리 라우팅 메소드:패스포트 전용 로그아웃
//http://localhost:3001/logout
router.get('/logout',isLoggedIn,async(req,res,next)=>{
  req.logout(function(err){
    //로그아웃후 관리자 로그인 페이지로 이동시키기
    req.session.destroy();
    res.redirect('/login')
  })
  
})

module.exports = router;
