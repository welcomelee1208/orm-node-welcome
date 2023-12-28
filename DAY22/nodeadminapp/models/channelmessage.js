module.exports = function (sequelize, DataTypes) {
    return sequelize.define('channel_msg', {
        channel_msg_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '로깅 고유번호',
        },
        channel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '채널 고유번호',
        },
        member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment:'사용자 고유번호',
        },
        nick_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '채팅 닉네임',
        },
        msg_type_code: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '로깅 유형 코드',
        },
        connection_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '채팅 고유 커넥션 아이디',
        },
        message: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            comment:'원본채팅 메세지',
        },
        ip_adress: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: 'IP주소',
        },
        top_channel_msg_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '최상위 메세지 고유번호',
        },
        msg_state_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '메세지 상태코드',
        },
        msg_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '등록일시'
        },
        edit_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '수정일시',
        },
        del_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '삭제일시',
        }
    },
    {
        sequelize,
        tableName: 'channelmsg',// 기본 테이블명 옵션이 복수형이아닌 여기 지정한 테이블 명으로 생성됨
        timestamps: false,
        comment: '채널 채팅 이력 정보 테이블',
        indexes: [
            {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'channel_msg_id' }],// 여러개의 컬럼이 프라이머리 키인경우(복합키){}추가하여 설정가능
            },
        ],
        })
}