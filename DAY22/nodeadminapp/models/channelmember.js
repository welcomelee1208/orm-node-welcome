module.exports = function (sequelize, DataTypes) {
    return sequelize.define('channel_member', {
        channel_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '채널 고유번호',
        }, 
        member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            
            comment:'사용자 고유번호',
        },
        nick_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '사용자  닉네임',
        },
        active_state_code: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '접속 상태코드',
        },
        last_contact_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '최근 접속 일시',
        },
        last_out_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment:'최근 아웃 일시',
        },
        connection_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '커넥션 아이디',
        },
        ip_adress: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '최상위 메세지 고유번호',
        },
        edit_member_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '수정자 아이디',
        },edit_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '수정일시',
        }
    },
    {
        sequelize,
        tableName: 'channelmember',// 기본 테이블명 옵션이 복수형이아닌 여기 지정한 테이블 명으로 생성됨
        timestamps: false,
        comment: '채널 채팅  사용자  정보 테이블',
        indexes: [
            {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'channel_member_id' }, { name:'member_id' }],// 여러개의 컬럼이 프라이머리 키인경우(복합키){}추가하여 설정가능
            },
        ],
        })
}