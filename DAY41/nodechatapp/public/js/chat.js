//클라이언트(웹브라우저) 서버 연결 소켓 객체 정의
var socket = io.connect('/');
//전송버튼 클릭시 사용자 입력메시지를 서버에 특정 이벤트 기능으로 전송한다.
$("#btnSend").click(function(){
	var msg = $("#message").val();
	var nickName = "화녕";

	var sendMsg = `${nickName}:${msg}`;
	// 

	socket.emit("broadcast",sendMsg);
});
// 서버 소켓모듈에서 전송된 receiveAㅣㅣ 이벤트 수신기 기능정의
	socket.on("receiveAll",function(receiveMsg){
	console.log("메시지 수신기-데이터","receiveAll",receiveMsg);
});