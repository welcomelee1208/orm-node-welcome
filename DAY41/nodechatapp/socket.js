const SocketIO = require("socket.io");
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
    socket.on("broadcast",function(msg){
    io.emit("receiveAll",msg);
    //socket.broadcast.emit("receive",msg);




    });
    socket.on("entry",function(channelId,nickName){
        //채팅방 사용자 입장 처리하기
        //socket.join('채팅방아이디')채팅방 입장 처리
        // 현재 채팅방 접속자의 고유 커넥션 아이디를 해당 채팅방에 접속자로 등록처리
        socket.join(channelId.toString())
        //현재 접속한(입장한) 사용자에게만 메세지를 전송
        socket.emit("entryok",`${nickName} 으로 채팅방에 입장했습니다.`)
        //현재 접속자를 제외한 같은채팅방내 모든 사용자에게 메세지 발송
        //socket.to('현재 접속한 채팅방 아이디').emit()// 해당 채팅방에 기접속자들에게 나를 제외하고 메시지를
        socket.to(channelId).emit("entryok",`${nickName}님이 채팅방에 입장했습니다.`)
    })
        //그룹메시징 수신및 발송전용이벤트 수신기 정의
        // 그룹채팅시 해당 채팅방에 입장한 사용자가 메시지를 보내오면
        // 현재 해당 채팅방에 입장한 보인을 포함한 모든 사용자 클라이넌츠에게 메시지를 전송
        socket.on("groupmsg",function(channelId,nickName,msg){
            //그룹 채팅방 사용자 에게만 메세지를 발송한다.
            //서버에 연결된 모든 사용자가 아닌 지정 채팅방에 입장한 모든 사용자에게 
            //메세지를 보낼때는 io.to(채팅방 아이디값).emit("클라이언트 이벤트 수신기",보내려는 데이터)
            io.to(channelId).emit("receiveGruopMsg",nickName,msg)
        })
    });
    }