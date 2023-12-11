//auth.js 라우터 파일은 회원 인증과 관련된 모든 사용자 요청과 응답 을 처리합니다.
//모든 라우팅 파일은 기본 라우팅 주소체계를 가집니다.
//https://localhost:3000/라우터파일의 기본주소/라우팅 메소드의 주소
//https://localhost:3000/auth 라는 기본주소로 해당라우터파일내 모든 라우팅 메소드는 기본주소를 같느다.
var express= require('express');
var router = express.Router();

//로그인 웹페이지 사용자 요청과 응답처리 라우팅 메소드
//호출주소: https://localhost:3000.com/auth/login
router.get('/login',function(req,res){
    res.render('auth/login')
});

//기능:로그인 웹페이지에서 사용자가 입력한 메일주소/암호를 받아 로그인처리 요청과 응답처리 라우팅 메소드
//https://localhost:3000.com/auth/login
//호출방식:post

router.post('/login',function(req,res){
    //step 1:사용자로그인 페이지 에서 사용자가 입력한 메일주소와 암호값을 추출합니다.
    //사용자가 입력한 값들은 웹브라우저를 통해 전달되기떄문에 req=httpResquest객체를 통해 사용자가 입력한 값을 추출
    var email = req.body.email
    var password = req.body.password


    //step2 ;모델을 이용해 동일한 메일주소와 암호가 있는지 체크한다





    //step 3 정상적인 사용자 메일 암호인 경우 메인페이지로 사용자 웹페이지를 이동시켜준다.
    //res httpResponse 객체의 redirect('도메인주소/하위 url') 메소드는 지정된 url주소체계로  사용자 웹페이지로 이동시켜준다.
   //res.redirect('https://www.naver.com')
    res.redirect('/main')
});



//로그아웃 요청및 응답처리 라우팅 메소드
//요청 주소http://localhost:3000/auth/logout
//요청방식 get
//반환형식 :특정페이지 이동처리
router.get('/logout',function(req,res){
    //step1 로그아우서리
    res.redirect('main')
    
});






module.exports = router;