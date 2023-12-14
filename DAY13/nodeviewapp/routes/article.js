//게시글 정보관리 각종웹페이지 요처오가 응답처리 라우터 전용파일
// http://localhost:3000/article
var express = require('express');
var router = express.Router();
//게시글 목록조회 웹페이지 요청및 응답 라우팅 메소드
router.get('/list',async(req,res,next)=>{
    
    //step1:DB에서 모든 게시글 데이터 목록을 조회해 옵니다.
    const articles=[{
        article_id:1,
        board_type_code:1,
        title:"공지게시글 1번글 입니다.",
        contents:"공지게시글 1번 내용입니다",
        view_count:10,
        ip_adress:"111.111.123.44",
        is_display_code:1,
        reg_date:"2023-12-14"
    },
    {
        article_id:2,
        board_type_code:2,
        title:"기술블로깅 2번글 입니다.",
        contents:"기술블로깅 2번 내용입니다",
        view_count:30,
        ip_adress:"111.111.123.434",
        is_display_code:0,
        reg_date:"2023-12-14"
    },
    {
        article_id:3,
        board_type_code:2,
        title:"기술블로깅 2번글 입니다.",
        contents:"기술 블로깅  2번 내용입니다",
        view_count:40,
        ip_adress:"111.111.123.414",
        is_display_code:0,
        reg_date:"2023-12-14"
    }
    
    ]
    res.render('article/list',{articles})
})
//게시글 목록에서 조회옵션 데이터를 전달받아 조회옵션 기반 게시글 목록 조회후 
//게시글 목록페이지에 대한 요처오가 응답처리 
router.post('/list',async(req,res,next)=>{
    //step1: 사용자가 선택/입력한 조회옵션 데이터를 추출한다.

    var boardTypeCode = req.body.boardTypeCode
    var title   = req.body.title
    var isDisplayCode= req.body.isDisplayCode
    //step2: 사용자가 입력/선택한 조회옵션 데이처를 기반으로db dp에서 게시글 목록을 재조회 해온다.
    const articles=[{
        article_id:1,
        board_type_code:1,
        title:"공지게시글 1번글 입니다.",
        contents:"공지게시글 1번 내용입니다",
        view_count:10,
        ip_adress:"111.111.123.44",
        is_display_code:1,
        reg_date:"2023-12-14"
    }
    ]
    //step3: 게시글 목록 페이지 list.ejs에 데이터 목록을 전달한다.
    res.render('article/list',{articles})
})
//신규 게시글 등록 웹페이지 요청및 응답 라우팅 메소드
router.get('/create',async(req,res,next)=>{
    res.render('article/create')
})

//신규 게시글 사용자 등록정보처리 요청 및 응답 라우팅 메소드
router.post('/create',async(req,res,next)=>{
    //등록처리
    res.redirect('/article/list')
})
//기존 게시물 삭제처리 요청및 응답 라우팅 베소드
router.get('/delete',async(req,res,next)=>{
    
    var articleIdx= req.query.aid

    res.render('article/list')
})
//기존 게시글 정보확인 및 수정웹페이지 요청과 응답 라우팅 메소드
router.get('/modify/:aid',async(req,res,next)=>{
    
    var articleIdx = req.params.aid
    
    res.render('article/modify')
})
//기존 게시글 사용자 수정 정보 처리 요청과 응답 라우팅 메소드
router.post('/modify/:aid',async(req,res,next)=>{
    
    var articleIdx = req.params.aid
    
    res.redirect('/article/list')
})




module.exports = router;