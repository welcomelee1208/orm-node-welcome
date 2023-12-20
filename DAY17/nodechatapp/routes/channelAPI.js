//채팅방 데이터를 관리하는 restFul 라우터 파일 
//http://localhost:3000/api/channel~

var express = require('express');
var router = express.Router();

router.get('/all',async(req,res,next)=>{
    var channelList= [
        //db에서 채널목록정보를 모두 조회해 왔다고 가정하빈다.
        {channel_id:1,channel1_name:"채널1"},
        {channel_id:2,channel1_name:"채널2"},
        {channel_id:3,channel1_name:"채널3"}
        ]
        //resjoan=>json 데이터 전달
    
        res.json(channelList);
    })

    //채널 정보를 신규 등록하는 restapi라우팅 메소드
router.post("/create",async(req,res)=>{
        //step1 클라이언트나 프런트엔드에서 json형태로 데이터를 전달해준다고 가정하자
        /*
        
    {"channel_name":"채널1"
    "channel_desc":"채널 설명1"
    }
        
        */
       //step2 프런트엔드/클라이언트에서 보내준 json데이터를 추출한다.
        var channelName = req.body.channel_name
        var channelDescription= req.body.channel_desc
    //step3  db의 채널 테이블에 해당 정보를 저장하기위한 json 객체를 정의한다.
    var channel={
        channel_id:1,
        channel_name:channelName,
        channel_desc:channelDescription
    }
    //step 4: dB에 채널 테이블에 프런트 에서 넘어온 데이터를 저장한다.
    //step 5: 저장후 반환되는 실제 db dp저장된 단일 채널 정보를 클라이언트에 반환한다.
    res.json(channel)
})
router.post('/modify',async(req,res,next)=>{
res.redirect('/all')
})
router.post('/delete',async(req,res,next)=>{
    res.redirect('/all')
})
router.get('/:cid',async(req,res,next)=>{
        
    var channelId = req.params.id
    
    var channel = {
    channel_id:1,
    channel_name:"채널1"
}
res.json(channel)
})


    module.exports = router;