//socket.io 팩키지 참조 
const SocketIO = require("socket.io");
//socket.io-redis참조
var redis = require("socket.io-redis");

//socket.js모듈 기능정의 
module.exports =(server)=>{
    //socket io(서버 소켕이 실행될 벡엔드 서버 객체)
    //웹브라우저 클라이언트에 제공될 클라이언트스크립트 socket라이브러리 경로)
    // const io = SocketIO(server,{path:"/socket.io"});
    //cors 이슈처리 적용한 io객체 생성
    const io = SocketIO(server, {
        path: "/socket.io",
        cors: {
        origin: "*",
        methods: ["GET", "POST"],
        },
        });
        //Redis Backplain 연결설정
io.adapter(
    redis({
    host: "127.0.0.1",
    port: "6379",
    password:"test12345"
    })
    );

    //io.on("이벤트명",이벤트처리 콜백함수)
    // io 서버 소켓이 클라이언트와 연길 이 완료되ㅣ면 메세지 수발신 기능을 제공합니다.
    //소켓은 반드시 클라이언트와연결이 된 상태에서만 메세지를 주고받을수 있다.
    // io서버 소켓이 connectoin 이벤특 발생한 스코프에서 각ㄱ종 메세지 수발신 처리기능 구현
    // 클라이언트와 서버 소켕간 연결이 완료되면 클라이언트/서버연결 정보를 가진 socket이라는 객체가 전달됨
    //io 는 서버소켓 자체이고 (상위개념), socket은 각각의 클라이언트와 연결된 연결정보 객체입니ㅏㄷ.
    io.on("connection",(socket)=>{
        // 서버 소켓과 연결되 ㄴ각각의 클라이언트간 수발신 기능구현
        //socket.on ("서버측 메세지 수신기 이벤트 명",이벤트처리기 콜백함수)
        socket.on("broadcast",function(msg){
            // io.emit ("클라이언트 이벤트 수신기명",data) 는 현재 서버 소켓인 io에 연결된 모든 사용자에게
            //지정한 클라이언트 이벤트 수신기 명에 해당 메세지 데이터를 보낸다.
            //io.emit() 서버 소켓에 연결되 ㄴ모든 클라이언트 사뇽ㅇ자에게 메세지 발송함.
                io.emit("receiveAll",msg);
            
        });
        //테스트용 서버측 이벤트 수신기 정의와 클라이언트 메세지 보내기 샘플
        //서버측 /클라이언트 측 이벤트 수신기 명과 전달데이터수/포맷은 개발자가 정의합니다.
        socket.on("test",function(msg){
            io.emit("receiveTest",msg);
        });
        //채팅방 개설 및 채팅방 입장하기 기능 처리
        //사용자채팅방 입장사실 클라이언트에게 알리기 
            socket.on("entry",async(channelId,nickName)=>{
            // socket.join('채팅방 고유아이디-문자열)
            //socket.join()동일 채널 id 가 없으면 해당 채팅방을 만들고 있으면 해당 채널로 접속한디
            socket.join(channelId)
            //채널 입장 사실 사용자들에게 알려주기 3가지 방법
            //case1: 현재 접속한 사용자 에게만 메세지 보내기
            socket.emit("entryok",`${nickName}대화명으로 입장했습니다.`)
            //case2: 현재 접속한 채팅방에 나를 (현재 접속중인)제외한 나머지 사용자들에게만 메세지를 보내고싶을때
            //현재 접속자를 제외한 같은 채팅방내 모든 사용자에게 메세지 발송
            //socket.to(채널아이디).emit("클라이언트이벤트수신기명",전달데이터)
            socket.to(channelId).emit("entryok",`${nickName}채팅방에 입장했습니다.`)
            //case3:해당 채팅방의 나를 포함한 모든 사용자에게 메세지 보내기
            //io.to(채널아이디).emit(클라이언트 이벤트 수신기명,전달데이터)
            // io.to(channelId).emit("entryok",`${nickName}채팅방에 입장했습니다.`)
            socket.on ("groupmsg",async(msgData)=>{
                var sendMsg=`${msgData.nickName}:${msgData.message}`
                io.to(msgData.channelId).emit("receiveGroupmsg",sendMsg)

            })
        })

    });
}