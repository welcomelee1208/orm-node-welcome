module.exports = function (sequelize, DataTypes) {
    return sequelize.define('articlefile', {
        article_file_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '게시글 첨부파일 고유번호',
        },
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '참조하는 게시글 고유번호:FK',
        },
        file_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '파일 이름',
        },
        file_size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '파일크기',
        },
        file_path: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '전체파일 링크 정보(도메인포함 or미포함)',
        },
        file_type: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '파일 유형',
        },
        reg_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '업로드 일시',
        },
        reg_member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '등록자고유번호',
        }
    },
    {
        sequelize,
        tableName: 'articlefile',// 기본 테이블명 옵션이 복수형이아닌 여기 지정한 테이블 명으로 생성됨
        timestamps: false,
        comment: '게시글첨부파일 정보',
        indexes: [
            {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'article_file_id' }],// 여러개의 컬럼이 프라이머리 키인경우(복합키){}추가하여 설정가능
            },
        ],
        })
}
