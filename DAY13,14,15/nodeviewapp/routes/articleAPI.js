
//게시글 데이터 관리 전용 restful api라우터파일
//기본 라우터 호출 주고: http://localhost:3000/api/article

var express = require('express')
var router = express.Router()
//전체 게시글 목록 데이터 조회반환 라우팅 메소드
// api/article/all
router.get('/all',async(req,res)=>{
    //api라우팅 메소드 반환 형식 정의
    var apiResult ={
        code:200,
        data:{},
        result:"OK"
    }
        try{
            //try block안에 에러가 발생할 수 있는 각종 개발자 코드 구현
            //step 1:db에서 전체 게시글 목록을 조회한다.
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
        //프론트 엔드로 반환할 실제 데이터 바인딩
        apiResult.code = 200
        apiResult.data= articles
        apiResult.result = "OK"
        }catch(err){
            //console.log(err.message)
            //서버쪽 에러코드는 프론트엔드나 사용자에게 직접 정보를 제공하지 않오 대표메세지를안내한다.
            //서버측 에러코드는 추후 별도 로깅 시스템 구현을 토앻 서버에 특정폴더내에 로그파일로 기록하거나
            //벡엔드 에러발생 알림시스템(sms,email 등등)을 통해 실시간 에러정보를 노티해준다.
            apiResult.code = 500
            apiResult.data= null
            apiResult.result = "Failed"
        }



        res.json(apiResult)
})


// 신규 게시글 등록처리 api라우팅메소드
// api/article/create
router.post('/create',async(req,res)=>{
    var apiResult ={
        code:200,
        data:{},
        result:"OK"
        }

        try{
            //step1:사용자가 입력한 게시글 등록 데이터 추출
            var boardTypeCode= req.body.boardTypeCode
            var title= req.body.title
            var contents= req.body.contents
            var articleTypeCode= req.body.articleTypeCode
            var isDisplayCode= req.body.isDisplayCode
            var register= req.body.register
            
            var article={
                boardTypeCode,
                title,
                contents,
                articleTypeCode,
                isDisplayCode,
                register,
                registDate:Date.now()
            }
            //step 2:DB article테이블에 등록하고 등록한 데이터가 반환된다
            var savedArticle={
                article_id:1,
                board_type_code:1,
                title:"공지게시글 1번글 입니다.",
                contents:"공지게시글 1번 내용입니다",
                view_count:10,
                ip_adress:"111.111.123.44",
                is_display_code:1,
                reg_date:"2023-12-14"

            }
            apiResult.code = 200
            apiResult.data= savedArticle
            apiResult.result = "OK"
            //step3:정상 데이터 등록처리 결과값 세팅하기
        }catch(err){
            apiResult.code = 500
            apiResult.data= null
            apiResult.result = "Failed"
            
        }




        res.json(apiResult)
})


//단일게시글 수정처리 api라우팅 메소드
// api/article/update
router.post('/update',async(req,res)=>{
    var apiResult ={
        code:200,
        data:{},
        result:"OK"
        }
        try{
                //step1:사용자가 수정한 게시글 수정 데이터 추출
                var articleIdx= req.body.articleIdx
                var boardTypeCode= req.body.boardTypeCode
                var title= req.body.title
                var contents= req.body.contents
                var articleTypeCode= req.body.articleTypeCode
                var isDisplayCode= req.body.isDisplayCode
                var register= req.body.register
                //추출된 사용자 데이터를 단일 게시글 json데이터로 구성해서
                //db article 테이블에 수정처리한다.
                //수정처리후 적용건수 반환됨.
                var article={
                    articleIdx,
                    boardTypeCode,
                    title,
                    contents,
                    articleTypeCode,
                    isDisplayCode,
                    register,
                    registDate:Date.now()
                }
                //step2: 수정처리후 처리건수가 반환됨
                //db 수정 처리후 적용건수 1이 반환되었다고 가정
                var affectedCnt = 1
                //step3: 정상 수정된 정보를 apiResult객체 바인딩
                apiResult.code = 200
                apiResult.data = affectedCnt
                apiResult.result = "OK"


            
        }catch(err){
            apiResult.code = 500
            apiResult.data = null
            apiResult.result = "Failed"

        }
        res.json(apiResult)
})


//단일 게시글 데이터 조회 반환 api 라우팅 메소드
//api/article/1
router.get('/:aid',async(req,res)=>{
    var apiResult ={
        code:200,
        data:{},
        result:"OK"
        }
        try{
            //step 1 : url을 통해 전달된 게시글 고유번호를 추출한다.
            var articleIdx = req.params.articleIdx
            //step 2 게시글 고유 정보에 해당하는 단일 게시글 정보를 db에서 조회해 온다.
            var article={
                article_id:1,
                board_type_code:1,
                title:"공지게시글 1번글 입니다.",
                contents:"공지게시글 1번 내용입니다",
                view_count:10,
                ip_adress:"111.111.123.44",
                is_display_code:1,
                article_type_code:1,
                reg_date:"2023-12-14",
                reg_member_id:"welcoem"
                }
            // step3" 정상 조회된 정보를 apiresult객체 바인딩함
            apiResult.code = 200
            apiResult.data= article
            apiResult.result = "OK"
        }catch(err){
            apiResult.code = 500
            apiResult.data= null
            apiResult.result ="Failed"
        }
        res.json(apiResult)
})


//단일게시글 삭제처리 api  라우팅 메소드
//api/article/1
router.delete('/:aidx',async(req,res)=>{
    var apiResult ={
        code:200,
        data:{},
        result:"OK"
        }
        try{
            //step1: url주소에서 게시글 고유번호를 추출한다.
            var articleIdx = req.params.articleIdx
            //step2 : db의 article 테이블 에서 해당 게시글 번호글은 완전 삭제 처리한다.
            //step3: db에서 삭제된 건수가 전달된다.
            var deletedCnt= 1
            apiResult.code = 200
            apiResult.data= deletedCnt
            apiResult.result = "OK"
        }catch(err){
            apiResult.code = 500
            apiResult.data= deletedCnt
            apiResult.result = "Failed"
        }
        res.json(apiResult)
})
module.exports= router;