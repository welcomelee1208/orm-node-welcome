module.exports = function (sequelize, DataTypes) {
    return sequelize.define('channel', {
        channel_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '채널고유번호',
        },
        community_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '커뮤니티 고유번호',
        },
        category_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment:'채널분류코드',
        },
        channel_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '채널명',
        },
        user_limit: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '동시 채널 접속자수',
        },
        channel_img_path: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: '대표이미지 주소',
        },
        channel_desc: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            comment:'채널 간략소개',
        },
        channel_state_code: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '채널 상태 코드',
        },
        reg_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '등록일시',
        },
        reg_member_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '등록자 아이디',
        },
        edit_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '수정일시',
        },
        edit_member_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '수정자 아이디',
        }
    },
    {
        sequelize,
        tableName: 'channel',// 기본 테이블명 옵션이 복수형이아닌 여기 지정한 테이블 명으로 생성됨
        timestamps: false,
        comment: '채널 정보 테이블',
        indexes: [
            {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'channel_id' }],// 여러개의 컬럼이 프라이머리 키인경우(복합키){}추가하여 설정가능
            },
        ],
        })
}