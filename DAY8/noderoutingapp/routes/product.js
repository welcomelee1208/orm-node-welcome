var express = require('express');
var router = express.Router();

//상품 목록 웹페이지 요청과 응답 라우팅 메소드
//localhost:3000/product/list
router.get('/list',async(req,res)=>{
    res.render('product/list')
});

//단일상품 상세정보보기 웹페이지에 대한 요청과 응답하기
//localhost:3000/product/detail?pid1&=pname=lg노트북
router.get('/detail',async(req,res)=>{
    
    //url에 쿼리스트링 방식으로 전달된값 추출하기
    //url에 querystring방식으로 파라메터 전달되면 req.query  키명으로 키값을 추출할수 있다.
    
    var productID = req.query.pid
    var productName = req.query.pid
    res.render('product/detail',{productID,productName})

});

//와일드카드 이용시 주의사항:동일한 url호출주소와 호출방식의 라우팅 메소드가 존재하는경우
//와일드 카드 방식이 먼저 호풀되고 다른 라우팅 메소드주소는 호출이 무시된다.
// 호출 주소체계: localhost:3000/product/detail/sample
//호출방식 get
router.get('/detail/sample',async(res,req)=>{
    res.render('product/detail',{productID,productName:"노트북"})
})

//파라메터 방식으로 전달된 상품정보를 추출해 단일상품정보를 보여주자
//호출주소:localhost:3000/product/detail/1
//호출 방식
// 매우 중요: 와일드 카드 방식으로 주소체계가ㅣ 정의된 라우팅 메소드는 해당 라우터 파일의 맨하단에 바드시 배치시켜야한다.
router.get('/detail/:pid',async(req,res)=>{ 
    // url을 통해 파라메터 방식으로 값이 전달되면
    // 주소체계내에 와일드카드키를 설정하고 해당 키명으로 url을 통해 전달된파라메터값을 추출(req.params.와일드카드키명)을 할수있다.
    var productID = req.params.pid
res.render('product/detail',{productID,productName:"노트북"})
})

//http://localhost:3000/product/detail/1/LG노트북/6000-->호출주소
router.get("/detail/:pid/:pname/:price",async(req,res)=>{
    var productID = req.params.pid
    var productName = req.params.pname
    var price   = req.params.price
    res.render('product/detail',{productID,productName,price})
})




module.exports = router;