//채팅방 데이터를 관리하는 restFul 라우터 파일 
//http://localhost:3000/api/member~

var express = require('express');
var router = express.Router();

const memberlist=[
    {   member_id: "hyyi1",
        email: "hyyi1@naver.com",
        member_password:"12134",
        name:"이웰컴",
        profile_img_path:"/img/profile.jppg",
        telephone:"010-4997-5826",
        entry_type_code:1,
        use_state_code: 2,
        birth_date:"2000-11-08",
        reg_date: "2022-12-14",
        reg_member_id:"hy1234",
        edit_date: "2023-12-24",
        edit_member_id: "웰컴"
    },
    {   member_id: "hyyi12",
        email: "hyyi12@naver.com",
        member_password:"121314",
        name:"이웰컴2",
        profile_img_path:"/img/profile.jppg",
        telephone:"011-4997-5826",
        entry_type_code:1,
        use_state_code: 1,
        birth_date:"2000-12-08",
        reg_date: "2022-12-14",
        reg_member_id:"hy1234",
        edit_date: "2023-12-24",
        edit_member_id: "웰컴"
    },  
    {    member_id: "hyyi123",
        email: "hyyi123@naver.com",
        member_password:"121341",
        name:"이웰컴1",
        profile_img_path:"/img/profile.jppg",
        telephone:"013-4997-5826",
        entry_type_code:1,
        use_state_code: 1,
        birth_date:"2000-12-08",
        reg_date: "2022-12-14",
        reg_member_id:"hy1234",
        edit_date: "2023-12-24",
        edit_member_id: "웰컴",
}
    /*{ "member_id": "hyyi1",
        "email": "hyyi1@naver.com",
        "member_password":"12134",
        "name":"이웰컴",
        "profile_img_path":"/img/profile.jppg",
        "telephone":"010-4997-5826",
        "entry_type_code":"1",
        "use_state_code": "1",
        "birth_date":"2000-12-08",
        "reg_date": "2022-12-14",
        "reg_member_id":"hy1234",
        "edit_date": "2023-12-24",
        "edit_member_id": "웰컴"}*/
]
var apiResult = {
    code:200,
    data:[],
    result:"sucess"
}
router.get('/all',async(req,res,next)=>{
    
    try{
        apiResult.code=200
        apiResult.data= memberlist
        apiResult.result="sucess"
    }catch(err){
        apiResult.code=500
        apiResult.data= null
        apiResult.result="failed."

    }
        res.json(memberlist);
    })

    //채널 정보를 신규 등록하는 restapi라우팅 메소드
router.post("/create",async(req,res)=>{
    try{
            var member_id= req.body.member_id
            var email = req.body.email
            var member_password= req.body.member_password
            var name= req.body.name
            var profile_img_path= req.body.profile_img_path
            var telephone= req.body.telephone
            var entry_type_code= req.body.entry_type_code
            var use_date_code= req.body.use_date_code
            var birth_date=req.body.birth_date
            var reg_date=req.body.reg_date
            var reg_member_id= req.body.reg_member_id
            var edit_date=req.body.edit_date
            var edit_member_id=req.body.edit_member_id
            
            var memberdata={
                member_id: "hyyi1",
                email: "hyyi1@naver.com",
                member_password:"12134",
                name:"이웰컴",
                profile_img_path:"/img/profile.jppg",
                telephone:"010-4997-5826",
                entry_type_code:1,
                use_state_code: 2,
                birth_date:"2000-11-08",
                reg_date: "2022-12-14",
                reg_member_id:"hy1234",
                edit_date: "2023-12-24",
                edit_member_id: "웰컴"
        }
                    
        apiResult.code=200,
        apiResult.data= memberdata
        apiResult.result="sucess"
    }catch(err){
        apiResult.code=500,
        apiResult.data= null
        apiResult.result="failed"
    }
    
    res.json(apiResult)
})
router.post('/modify',async(req,res,next)=>{

    try{
        var member_id= req.body.member_id
        var email = req.body.email
        var member_password= req.body.member_password
        var name= req.body.name
        var profile_img_path= req.body.profile_img_path
        var telephone= req.body.telephone
        var entry_type_code= req.body.entry_type_code
        var use_date_code= req.body.use_date_code
        var birth_date=req.body.birth_date
        var reg_date=req.body.reg_date
        var reg_member_id= req.body.reg_member_id
        var edit_date=req.body.edit_date
        var edit_member_id=req.body.edit_member_id

        var changedmemberdata={
        member_id,
        email,
        member_password,
        name,
        profile_img_path,
        telephone,
        entry_type_code,
        use_date_code,
        birth_date,
        reg_date,
        reg_member_id,
        edit_date:Date.now(),
        edit_memeber
    }
    var affectedCnt=1

    apiResult.code=200,
    apiResult.data= affectedCnt
    apiResult.result="sucess"
}catch(err){
    apiResult.code=500,
    apiResult.data= null
    apiResult.result="failed"
}

res.json(apiResult)
})
router.post('/delete/:cidx',async(req,res,next)=>{
    
    try{
        var member_idx= req.params.cidx
        var deletedCnt=1

    apiResult.code=200,
    apiResult.data= deletedCnt
    apiResult.result="sucess"
}catch(err){
    apiResult.code=500,
    apiResult.data= null
    apiResult.result="failed"
}

    
    res.json(apiResult)
})
router.get('/:cidx',async(req,res,next)=>{
        try{
    var member_idx = req.params.category_cidx
    
    var member= {
        member_id: "hyyi1",
        email: "hyyi1@naver.com",
        member_password:"12134",
        name:"이웰컴",
        profile_img_path:"/img/profile.jppg",
        telephone:"010-4997-5826",
        entry_type_code:1,
        use_state_code: 2,
        birth_date:"2000-11-08",
        reg_date: "2022-12-14",
        reg_member_id:"hy1234",
        edit_date: "2023-12-24",
        edit_member_id: "웰컴"
}
apiResult.code=200,
apiResult.data= member
apiResult.result="sucess"
}catch(err){
    apiResult.code=500,
    apiResult.data= null
    apiResult.result="failed"
}

res.json(apiResult)
})


    module.exports = router;