var express = require('express');
var router = express.Router();
//미들웨어을 참조합니다.
const{checkParams,chcekQueryKey, checkQueryKey} = require('./middleware.js')

//라우터 미들웨어 함수 샘플 3
//index.js 라우터가 실행될때마다 실행되는 미들웨어 함수
router.use(function(req,res,next){
    console.log("index.js라우터미들웨어 함수 샘플 1",Date.now())
    next()
})

//해당 라우터에서 해당 호출 주소체계와 일치하는 경우 매번 실행되는 미들웨어 함수
//http://localhost:3000/sample/computer
router.use('/sample/',function(req,res,next){
    console.log("index라우터 미들웨어함수 2-Request.URL=",req.originalUrl)
    next()
}
,function(req,res,next){
    console.log("index라우터 미들웨어함수 3-Request Type",req.method)
    res.send(req.method)
    
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//파라메터 아이디값이 존재하는 ㅔ체크하는 미들웨어 함수 적용하기
//http://localhost:3000/test/welcome
router.get('/test/:id',checkParams,function(req,res){
  res.render('index', { title: 'Express' });
});

//
router.get('/product',checkQueryKey,function(req,res){
  res.render('index', { title: 'Express' });
});
module.exports = router;
