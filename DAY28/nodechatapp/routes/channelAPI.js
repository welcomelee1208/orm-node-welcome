//채팅방 데이터를 관리하는 restFul 라우터 파일 
//http://localhost:3000/api/channel~

var express = require('express');
var router = express.Router();
const Channel= require('../schemas/channel')

var apiResult = {
    code:200,
    data:[],
    result:"sucess"
}
router.get('/all',async(req,res,next)=>{
    var channellist = await Channel.find({})
    try{
        apiResult.code=200
        apiResult.data= channellist
        apiResult.result="sucess"
    }catch(err){
        apiResult.code=500
        apiResult.data= null
        apiResult.result="failed."

    }
        res.json(channellist);
    })

    //채널 정보를 신규 등록하는 restapi라우팅 메소드
router.post("/create",async(req,res)=>{
    try{
            var community_id= req.body.community_id
            var category_code= req.body.category_code
            var channel_name= req.body.channel_name
            var user_limit= req.body.user_limit
            var channel_img_path= req.body.channel_img_path
            var channel_desc= req.body.channel_desc
            var channel_state_code= req.body.channel_state_code
            var reg_date= req.body.reg_date
            var reg_member_id=req.body.reg_member_id
            var edit_date=req.body.edit_date
            var edit_member= req.body.edit_member

            var data={
                community_id,
                category_code,
                channel_name,
                user_limit,
                channel_img_path,
                channel_desc,
                channel_state_code,
                reg_date,
                reg_member_id,
                edit_date,
                edit_member,
        }
        const channeldata = await Channel.create(data)
        apiResult.code=200,
        apiResult.data= channeldata
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
        var community_id= req.body.community_id
        var category_code= req.body.category_code
        var channel_name= req.body.channel_name
        var user_limit= req.body.user_limit
        var channel_img_path= req.body.channel_img_path
        var channel_desc= req.body.channel_desc
        var channel_state_code= req.body.channel_state_code
        var reg_date= req.body.reg_date
        var reg_member_id=req.body.reg_member_id
        var edit_date=req.body.edit_date
        var edit_memeber= req.body.edit_member

        var changedchanneldata={
        community_id,
        category_code,
        channel_name,
        user_limit,
        channel_img_path,
        channel_desc,
        channel_state_code,
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
        var community_idx= req.params.cidx
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
    var community_idx = req.params.category_cidx
    
    var channel = {
        community_id:1,
            category_code:1,
            channel_name:"초보자",
            user_limit:50,
            channel_img_path:"/img/img.jpg",
            channel_desc:"초보자 방입니다.",
            channel_state_code:2,
            reg_date:2022-12-20,
            reg_member_id:"hyyi1",
            edit_date:2023-12-20,
            edit_member:"welcome"
    
}
apiResult.code=200,
apiResult.data= channel
apiResult.result="sucess"
}catch(err){
    apiResult.code=500,
    apiResult.data= null
    apiResult.result="failed"
}

res.json(apiResult)
})


    module.exports = router;