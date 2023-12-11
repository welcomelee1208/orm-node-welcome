/*-기능:각종 회원정보 요청과 응답처리 라우팅 파일
약관페이지 요청응답,회원가입 웹페이지 요청과 응답처리
기본 라우팅 주소: http://localhost:3000/member/~
사용자가 링크 클릭이나 url을 직접 입력한 주소가  http://localhost:3000/member/~ 이면 노드앱의 app.js파일의 
참조된라우터파일중 해당 /member/~기본주소를 관리하는 해당 라우터 파일을 먼저 찾고
그다음에 사용자가 용청한 /member/entry 엔트리 라우팅 메소드 주소로 바인딩된 라우팅 메소드를 찾아
요청과 응답을 해당 라우팅 메소드에서 처리해줌
*/
var express = require ('express');
var router = express.Router();
//사용자가 요청하는 방식(get, post..etc)과 주소가 동일한 라우터팅 메소드를 찾습니다.
/*기능 : 사용자 가입 약관웹페이지에 대한 요청과 응답처리 라우팅 메소드
요청방식:get
요청 주소 http://localhost:3000/member/join
응답 결과 :회원약관 웹페이지 전달(join.ejs
*/
//redirect는 중요 링크주소
//render는 파일의 위치.
router.get('/join',function(req,res){
    res.render('member/join')
});
/*기능 : 신규회원 직접 가입 웹페이지 요청과 응답처리 라우팅 메소드
요청방식:-get
요청주소:http://localhoste:3000/member/entry
응답 결과:회원가입 웹페이지
*/
router.get('/entry',function(req,res){
    res.render('member/entry')
})

/*
기능: 사용자가 입력한 회원정보 db 처리 하고 로그인 페이지로 이동시키는 요청과 응답 처리 라우팅 메소드
요청방식post
요청주소 /member/entry
*/
router.post('/entry',function(req,res){
    //step 1: 사용자가 입력한 회원가입 정보를 추출한다.
    
    var email = req.body.email
    var password = req.body.password
    var name= req.body.name
    var phonenumber=req.body.phonenumber
    
    //step2: db에 member테이블 에 동일한 사용자 메일주소가 있는지 체크한다.
    //step3: 메일 주소가 중복되지 않으면 신규회원으로 해당 사용자 정보를 member 테이블에 저장한다.
    var member= {
        email,
        password,
        name,
        phonenumber,
        entryDate:Date.now()
    }
    //step4 데이터가 정상적으로 등록된 경우 사용자 웹페이지를 로그인 페이지로 이동시켜준다.
    res.redirect('/auth/login')
});


// 라우터파일은 밪ㄴ드시 해당 라우터 객체를 exports를 통해 노출 시켜야 노드 어플리케이션은 인식한다.
module.exports = router;

