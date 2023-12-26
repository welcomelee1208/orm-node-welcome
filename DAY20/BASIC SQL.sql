USE modu_chat;


#member 테이블의 전체컬럼(*) 데이터 조회
SELECT*FROM member;

#create data- 데이터 등록/insert 구문
#INSERT INTO 테이블명(컬럼1,컬럼2.....)VALUES(컬럼1의 등록값,컬럼2의 등록값....)
INSERT INTO member(email,member_password,name,profile_img_path,telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('hyyi1@naver.com','1234','이환영','','010-4997-5826',1,1,'001208',now(),1 );

INSERT INTO member(email,member_password,name,profile_img_path,telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('hyyi4@naver.com','1234','이환영3','','010-4997-5827',1,1,'011208',now(),1 );

INSERT INTO member(email,member_password,name,profile_img_path,telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('hyyi2@naver.com','1234','이환영2','','010-4997-5828',1,1,'021208',now(),1 );
#READ data
SELECT*FROM member;
SELECT*FROM member WHERE email='hyyi1@naver.com';
SELECT*FROM member WHERE entry_type_code=1 AND name='이환영';
SELECT*FROM member WHERE entry_type_code=1 OR use_state_code=1;
SELECT member_id, email, name, telephone FROM member WHERE member_id>=3;
SELECT*FROM member WHERE name IN('이환영2','이환영3','이환영');
SELECT*FROM member ORDER BY member_id DESC;
SELECT*FROM member ORDER BY member_id ASC;
#UPDATE data -데이터 수정/업데이트 구문
UPDATE member SET name = '강창훈0',profile_img_path='http://naver.com/image/test.png' WHERE member_id=1;
UPDATE member SET use_state_code=0 WHERE member_id>=2;
SELECT * FROM member WHERE name Like '%강%'; #패턴매칭  '%가'  가로 끝나는 모든항목, '%가%' 가가 포함된 모든데이터 '가%' 가로 시작하는 모든 데이터
#DELETE DATA-데이터 삭제/DELETE 구문




