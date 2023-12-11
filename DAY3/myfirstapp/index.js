/설치한 오픈소스 노드 패키지 참조
//moment 패키지는 자바스크립트 일자/시간정보를 개발자가 원한는 문자포맷으로 표현해주는 기능제공
const moment = require("moment");

//dotenv 패키지는 해당 프로젝트 노드 어플리케이션에 환경설정정보에 접근해서
//전역 어플리케이션 환경변수정보를 추출한다.
const env = require("dotenv");
env.config();

//.env 파일내 특정 환경변수 파일을 출력한다.

const companyName = process.env.COMPANY_NAME;
console.log("\n" + "지정한 환경 변수를 출력해보자" + companyName + "\n");

const myName = "우성우";

//순서 자바스크립트 일시/시간정보를 출력해보자
console.log("순수자바스크립트 일시정보", Date.now() + "\n");

//moment 패키지를 이용해 자바스크립트 일시정보를 출력해보자!
console.log(
"모멘트 패키지를 통한 날짜포맷 표현하기",
moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
);

//console.log("최초 노드 자바스크립트 모듈 파일입니다.");

//console.log("로그가 잘 출력되었습니다.");

console.log("배가 많이 고파요");