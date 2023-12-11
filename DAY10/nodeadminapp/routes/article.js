//라우터의 기본주소는 localhost:3000/articles/~
var express = require('express')
var router = express.Router();



/*게시물 목록 웹페이지 요청과 응답처리 라우팅 메소드
요청 url:http://localhost:3000/articles
요청 유형 get
응답결과: 게시글 목록 웹페이지
*/
router.get('/',async(req,res)=>{
    var articles = [
    {
        articleIdx:1,
        title:"첫번째 게시글 내용입니다.",
        cnotents:"첫번째 게시글 내용입니다.",
        view_cnt:100,
        display:"Y",
        ipadress:"111.111.111.111",
        registDate:Date.now(),
        registMemberId:"welcome"
    },    
    {
        articleIdx:2,
        title:"2번째 게시글 내용입니다.",
        cnotents:"2번째 게시글 내용입니다.",
        view_cnt:100,
        display:"Y",
        ipadress:"222.111.111.111",
        registDate:Date.now(),
        registMemberId:"welcome2"
    },
    {
        articleIdx:3,
        title:"3번째 게시글 내용입니다.",
        cnotents:"3번째 게시글 내용입니다.",
        view_cnt:100,
        display:"Y",
        ipadress:"123.111.111.111",
        registDate:Date.now(),
        registMemberId:"welcome"
    }
    
    ]

    res.render('article/list.ejs',{articles})
})
/*신규 게시글 등록 웹페이지 요청과 응답처리 라우팅 메소드
요청 url:http://localhost:3000/articles/create
요청 유형 get
응답결과: 신규게시글 목록 웹페이지
*/
router.get('/create',async(req,res)=>{
    res.render('article/create')
})
/*신규 게시글 사용자 입력 정보등록 요청과  응답처리 라우팅 메소드
요청 url:http://localhost:3000/articles
요청 유형 post
응답결과: 게시글 목록 웹페이지
*/
router.post('/create',async(req,res)=>{
    
    var title = req.body.title;
    var contents = req.body.contents;
    var register = req.body.register;
//db 입력 단일데이터 생성 및 db등록처리
    var article ={
    articleIdx:0,
    title,
    contents,
    view_cnt:0,
    display:"Y",
    ipadress:"111.111.111.111",
    registDate:Date.now(),
    registMemberId:register
    }
    res.redirect("articles")
})
/*선택 게시글 정보확인 웹페이지 요청과 응답처리 라우팅 메소드
요청 url:http://localhost:3000/articles/modify/1
요청 유형 get
응답결과: 선택 단일 게시글 정보 표시  웹페이지
*/
router.get('/modify/:aid',async(req,res)=>{
    
    //url을 통해 전달된 게시글 고유번호 추출
    var articleIdx= req.params.aid
    
    //step2:게시글 고유번호를 통해 db에서 게시글 정보를 조회해온다.
    var article ={
        articleIdx:0,
        title : "1번째 게시글 제목입니다.",
        contents:"1번째 게시글 내용입니다.",
        view_cnt:100,
        display:"Y",
        ipadress:"111.111.111.111",
        registDate:Date.now(),
        registMemberId:"welcome"
        }
        res.render('article/modify',{article})
})
/*게시글 수정페이지에서 사욪자가 수정한 게시글 수정정보처리 요청과 응답처리 라우팅 메소드
요청 url:http://localhost:3000/articles
요청 유형 get
응답결과: 게시글 목록 웹페이지
*/
router.post('/modify/:aid',async(req,res)=>{

    var articleIdx = req.params.aid;

    var title = req.body.title;
    var contents = req.body.contents;
    var register = req.body.register;


    //DB수정 단일 데이터 생성 및 DB 수정처리 
    var article = {
        articleIdx:articleIdx,
        title,
        contents,
        view_cnt:0,
        display:"Y",
        ipaddress:"111.111.111.111",
        registDate:Date.now(),
        registMemberId:register
    };

    //게시글 목록 페이지로 이동시킨다.
    res.redirect("/articles");

});


/*
-기능:게시글 삭제 요청과 응답 처리 라우팅메소드
-요청URL: http://localhost:3000/articles/delete?aidx=1
-요청유형: get
-응답결과: 게시글 목록 웹페이지
*/
router.get('/delete',async(req,res)=>{
    var articleIdx = req.query.aidx;

    //해당 게시글 번호를 이용해 DB에서 해당 게시글 삭제한다.

    //삭제완료후 게시글 목록 페이지로 이동한다.

    res.redirect("/articles");
});


module.exports = router;