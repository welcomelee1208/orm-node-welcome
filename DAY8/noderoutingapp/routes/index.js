var express = require('express');
var router = express.Router();

/*메인페이지 요청과 응답처리 라우팅 메소드*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//콜백함수를 router.get() 메소드의 파라메터(매개변수)로 호출주소와 콜백함수를 전달해서
//router.get메소드가 요청과 응답을 처리하게한다.
//기본 콜백함수를 전달해서 진행됨
router.get('/main',(req,res)=>{
  res.render('index.ejs',{ title: '메인페이지' })
})
//콜백함수간아닌 async/await 방식을 통한 router.get메소드를 실행 하는방범
// 비동기 프로그래밍의 절차중심 기능개발시 promise or async/await 이란 방식을 이용하면
//비동기 프로그래밍환경 에서 순차적 프로그래밍이 가능하다.


router.get('/index',async(req,res)=>{
  res.render('index.ejs',{ title: '인덱스페이지' })
})
/* rlsmd: tkdvanahrfhrepdlxjdp eogks dycjd
*/


router.get('/api/product/list',async(req,res)=>{

  var products=[
    {
      pid:1,
      pname:"노트북",
      price:"5000",
      stock:4,
    
  
    
      pid:2,
      pname:"lg노트북",
      price:"5000",
      stock:4,
    }]
  
  res.json(products)
  }

)


module.exports = router;
