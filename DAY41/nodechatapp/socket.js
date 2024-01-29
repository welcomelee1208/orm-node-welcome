const SocketIO = require("socket.io");
const moment = require('moment')
const jwt =require('jsonwebtoken')
var db = require('./models/index')
//socket.js모듈 기능정의
module.exports =(server)=>{
    const io = SocketIO(server, {
        path: "/socket.io",
        cors: {
        origin: "*",
        methods: ["GET", "POST"],
        },
    });
    io.on("connection",(socket)=>{
        // 소켓 req객체 정의
        const req = socket.request
        //현재 연결되는 사용자들 기반을 사용할 전역변수 정의 사용
        const socketId = socket.id
        // 접속 클라 아이피 주소
        const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress
        socket.on('disconnect',async()=>{

            // 개발자 정의 현재 접속자 연결 끊김 처리 함수
            await UserConnectionOut();
            // 소켓 끊김시 서버측 자원정리 기능제공
            clearInterval(socket.interval);
        })
        // 소켓 통신 에러감지 이벤트 핸들러
        socket.on('error',async(error)=>{
            console.log("서버 소켓에러 발생 이벤트 감지기...")

        });
        socket.on("broadcast",function(msg){
        io.emit("receiveAll",msg);
        //socket.broadcast.emit("receive",msg);
        });
        socket.on("test",async(nickName,msg)=>{
            var sendDate = moment(Date.now()).format('YYYY-MM-DD hhMMss')
            io.emit("receiveTest",nickName,msg,sendDate)
        })
        socket.on("entry",async(channelId,nickName)=>{
            socket.join(channelId)
            socket.emit("entryok",`${nickName}대화명으로 입장했습니다.`)
            socket.to (channelId).emit("entryok",`${nickName}님이 채팅방에 입장했습니다.`)
        })
        //채팅방 입장하기.
        socket.on('entryChannel', async(channel)=>{
            try{
                var currentUser = jwt.verify(channel.token,process.env.JWT_SECRET)
                var channelData ={}
                if(channel.channelType == 1){
                    var channelName = channel.targetMemberId < currentUser.member_id ? `${channel.targetMemberId}-${currentUser.member_id}`
                    :`${currentUser.member_id}-${channel.targetMemberId}`;
                    //일대일 채널 존재 여부 체크후  없으면 생성
                    channelData = await db.Channel.findOne({
                        where:{channel_name:channelName,catrgory_code :1}
                    })
                    //동일한 일대일 채널 정보가 존재하지 않으면 일대일 채널 생성하기
                    if(channelData == null ){
                        var channelInfo ={
                            community_id:1,
                            category_code :channel.channelType,
                            channel_name:channelName,
                            channel_img_path:"",
                            user_limit:2,//일대일 채팅방이니 사용자 인원제한은 2명
                            channel_state_code:1,
                            reg_date:Date.now(),
                            reg_member_id: currentUser.member_id
                        }
                        // 신규 1대1 채팅방 개설
                        var registedChannel = await db.Channel.create(channelInfo)
                        channelData = registedChannel
                        var currentMember = {
                            channel_id :registedChannel.channel_id,
                            member_id :currentUser.member_id,
                            nick_name:currentUser.name,
                            member_type_code:1,
                            active_state_code:0,
                            connection_id:"",
                            ip_address:"",
                            edit_date:Date.now(),
                            edit_member_id :currentUser.member_id
                        }
                        await db.ChannelMember.create(currentMember)

                        var targetMember = {
                            channel_id:registedChannel.channel_id,
                            member_id:channel.targetMemberId,
                            nick_name:channel.targetNickName,
                            member_type_code:0,
                            active_state_code:0,
                            connection_id:"",
                            ip_address:"",
                            edit_date:Date.now(),
                            edit_member_id:currentUser.member_id
                        }
                        await db.ChannelMember.create(targetMember);
                    }
                }else{
                    // 그룹채팅방 구현
                }
                // 현재 채팅방 접속자 정보 조회 및 정보 업데이트
                //현재 접속자의 접속상태 와 접속 일시 정보 업데이트 처리
                var updateMember ={
                    active_state_code:1,
                    last_contact_date:Date.now(),
                    connection_id: socketId,
                    ip_address:userIP
                }
                await db.ChannelMember.update(updateMember,{
                    where:{channel_id:channelData.channel_id,member_id:currentUser.member_id}

                })
                //채팅방 들어가기
                socket.join(channelData.channel_id)
                // 채팅방 조인 결과 메세지 발송 
                // 현재 접속자에게 메세지 발송
                socket.emit("entryok",`${currentUser.name}대화명으로 입장했습니다.`,currentUser.name,channelData)
                // 나를 재외한 접속자에게 입장알림 메세지 보내기
                socket.to(channelData.channel_id).emit("entryok",`${currentUser.name}님이 채팅방에 입장하였습니다.`)
                // 채팅방 입장로그 기록하기
                await ChattingMsgLogging(channelData.channel_id,currentUser.member_id,currentUser.name,1,`${currentUser.name}님이 채팅방에 입장했습니다`);

            }catch(err){
                console.log("채널 입장에러 발생:",err);

                //현재 사용자에게 서버에러로 채널 입장 실패메시지 보내기 
                socket.emit("entryok",`채널 접속오류가 발생했습니다.`);
            }
        })
        // 채팅방 별 메세지 수발신 처리
        socket.on("channelMsg",async(channelId,memberId,nickName,profile,message)=>{
            var sendDate = moment(Date.now()).format('HH:mm')
            // 해당 채널 모든 사용자들에게 메세지 발송하기
            io.to(channelId).emit ("receiveChannelMsg",nickName,profile,message,sendDate)
            //채팅 이력 로그 기록 하기 
            await ChattingMsgLogging(channelId,memberId,nickName,2,message);
        })
        //ChattingMsgLogging 함수 정의
        async function  ChattingMsgLogging(channelId,memberId,nickName,msgTypeCode,msg){
            var msg ={
                channel_id:channelId,
                member_id:memberId,
                nick_name:nickName,
                msg_type_code:msgTypeCode,
                connection_id:socketId,
                ip_address:userIP,
                message:msg,
                msg_state_code:1,
                msg_date:Date.now(),
            }
            await db.ChannelMsg.create(msg)
        }
        
        //사용자 나가기 정보 처리 
        async function UserConnectionOut(){
            //현재 접속이 끊어지는 사용자의 Connectionid기반으로 현재 사용자 정보조회 

            var member = await db.ChannelMember.findOne({where:{connection_id:socketId}});

            if(member != null){

                //사용자 연결 끊김 정보 수정반영하기 
                var updateMember = {
                    active_state_code:0,
                    last_out_date:Date.now(),
                    connection_id:socketId,
                    ip_address:userIP
                };

                await db.ChannelMember.update(updateMember,{
                    where:{connection_id:socketId}
                });


                //채팅방 퇴장 로그 기록 하기 
                await ChattingMsgLogging(member.channel_id,member.member_id,member.nick_name,0,`${member.nick_name}님이 채팅방을 퇴장했습니다`);

            }
        }

    });
    }