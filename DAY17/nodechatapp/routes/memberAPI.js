
var express = require('express');
var router = express.Router();

router.get('/all',async(req,res,next)=>{
    var memberList= [
        //db에서 채널목록정보를 모두 조회해 왔다고 가정하빈다.
        {member_id:1,member_name:"허핱나",email:"hyyi1@naver.com",telephone:"01049975826"},
        {member_id:2,member_name:"흐얼읕",email:"hyyi4@naver.com",telephone:"01049975426"},
        {member_id:3,member_name:"김눌트",email:"hyyi3@naver.com",telephone:"01049975526"},
        ]
        //resjoan=>json 데이터 전달
    
        res.json(memberList);
    })
//채널 정보를 신규 등록하는 restapi라우팅 메소드
    router.post("/create",async(req,res)=>{
        //step1 클라이언트나 프런트엔드에서 json형태로 데이터를 전달해준다고 가정하자
        /*
        
    {"member_name":"할낭티",
    "email":"hyyi1@anve.com",
    "telephone":"101848751"
    }
        */
       //step2 프런트엔드/클라이언트에서 보내준 json데이터를 추출한다.
        var memberName = req.body.member_name
        var email= req.body.email
        var telephone=req.body.telephone
    //step3  db의 채널 테이블에 해당 정보를 저장하기위한 json 객체를 정의한다.
    var member={
        member_id:1,
        member_name:memberName,
        email:email,
        telephone:telephone
    }
    //step 4: dB에 채널 테이블에 프런트 에서 넘어온 데이터를 저장한다.
    //step 5: 저장후 반환되는 실제 db dp저장된 단일 채널 정보를 클라이언트에 반환한다.
    res.json(member)
})
router.post('/modify',async(req,res,next)=>{

})
router.post('/delete',async(req,res,next)=>{
    
})
//단일 채널 정보를 조회하는 restapi 라우팅 메소드
router.get('/:mid',async(req,res,next)=>{
    //step1: url에서 채널의 고유번호를 추출한다.
    var memberId = req.params.id
    //step2: 추출된 채널 고유번호를 이용해 db멤버테이블에서
    //해당번호와 동일한 단일건의 멤버 정보를 조회
    var member = {
    member_id:1,
    member_name:"허핱나",
    email:"hyyi1@naver.com",
    telephone:"01049975826"
}
    //step 3: 
res.json(member)
})

    module.exports = router;