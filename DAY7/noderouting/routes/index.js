//index.js파일은 셈플 웹사이트의 공통 사용자 요청과 응답을 처리해주는 라우팅 파일(컨트롤러파일)

//express웹개발 프레임 워크 참조하기

var express = require('express');

//express객체의 router ()메소드를 호출ㅇ해서 라우터 객체 생성
// router 객체는 모든 사용자의 요청과 응답을 처리하는 핵심 객체
var router = express.Router();

router.get('/main', function(req,res){
  res.render('main')
})

/* 
-샘플 노드 익스프레스 웹사이트의 메인 요청과 응답처리 라우팅 메소드
-호출주소체계:http://localhost:3000/
router.get()메소드는 사용자 클라이언트에서 직접 urldmf입력해서 최초 호출 하거나 
또는 각종 링크 주소를 클릭햇을때 발생함.
사용자가 url을 통해 서버에 무언가를 요청할떄는 요청 바식이 존재한다.
요청방식:/get/post/put/delete
router.get('사용자가 호출하는 주소',호출된 주소에서 처리해야할 응답처리를 위한 콜백함수);
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//회사 소개 웹페이지 요청과 응답처리 라우팅 메소드
//step 1:라우팅 메소드의 기본 호출 주소체계를 정의한다
//http://localhost:3000/intro
//http://localhost:3000/company
//router.get('사용자가 호출하는 주소',호출된 주소에서 처리해야할 응답처리를 위한 콜백함수);
router.get('/company',function(req,res){
    //req-> httpRequest객체이고 웹브라우저 또는 클라이언트에서 넘어오는 각종 요청정보
    //req에는 웹브라우저에서 웹 서버로 넘어오는 모든 정보가 담겨 있고 감겨있는 정보를 추출 할수있다.

    //res는 httpResponse객체로 웹 서버에서 웹브라우저(클라이언트)로 응답을 처리해주는 객체
    //웹서버에서 웹브라우저 또는 클라이언트로 특정 정보를 전달하고싶을때는 res객체를 사용한다.
    //주로 res를 이용해 서버상의 웹페이지(view),데이터(json데이터)등을 전달합니다.
    //res.render()메소드는 views파일 (.ejs)내의 html내용을 웹브라우저로 전송

    res.render('company.ejs',{companyName:"네이버",ceo:"이환영" });


});

// 회사 연락처 정보 제공 웹페이지 요청과 응답 처리 라우팅 메소드
// http://localhost:3000/contact
//사용자 요청은 동일 주소 체계와 동일 요청방식과일치하는 라우팅 메소드를 찾아서 해당 메소드의 콜백 함수가 
//실행되어 응답이 전달됩니다

router.get('/contact', function(req,res){
res.render('sample/contact',{
email:"hyyi1@naver.com",
telephone:"01049975826",
adress:"경기도 의왕시 내손중앙로 11 1110동 2003호"})
});

// 회사 제품 소개 웹페이지 요청과 응답처리 라우팅 메소드
//주소체계:http:localhost:3000/products/computer

router.get('/product/computer', function(req,res){
  const computer ={
    brand:"lg",
    productName :"lg gram 17 ",
    price:17000000,
  }
  res.render('product/computer',{computer})
});

//회사 대표인삿말 페이지요청과  응답처리 라우팅 메소드
//호출 주소:http:localhost:3000/welcome
//호출 방식: Get 방식으로 사용자가요청해오면 router.get()메소그로 수신해줘야합니다
//반환 형식: 웹페이지,웹페이지+데이터,+only data(restful 서비스)
router.get('/welcome',function(req,res){
res.render('welcome.ejs')
});
//반드시 라우터 파일에서는 해당 라우터 객체를 외부로 exports 를 통해 노출 시켜야함


module.exports = router;