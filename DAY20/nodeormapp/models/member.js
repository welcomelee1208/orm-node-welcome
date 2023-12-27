module.exports = function (sequelize, DataTypes) {

    //sequelize.define() 해당 모델구조를 통해 물ㄹ리적 테이블을 생성 시키는 기능제공
    //sequelize.define('테이블명-복수형으로 만들어짐  member->members',관리항목(컬럼)구조정의,테이블 생성옵션)
    return sequelize.define(
        'member',
        {
            member_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '회원고유번호',
        },
        email: {
            type: DataTypes.STRING(100)
            //stting(100)-> vachar 100
            ,
            allowNull: false,
            comment: '사용자메일주소',
        },
        password: {
            type: DataTypes.STRING(200)
            //stting(100)-> vachar 100
            ,
            
            allowNull: false,
            comment: '사용자 암호',
        }
        },
        {
        timestamps: true,   // 등록(created at ),수정일시 컬럼(updated at) 자동생성
        paranoid: true      // 데이터 삭제 컬럼 자동생성(deleted at) 및 물리적 데이터 삭제안함 기능  제공
    });
    };