module.exports = function (sequelize, DataTypes) {
    return sequelize.define('admin', {
        admin_member_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '관리자 고유번호',
        },
        company_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '소속회사 코드',
        },
        admin_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '관리자 아이디',
        },
        admin_password: {
            type: DataTypes.STRING(500),
            allowNull: false,
            comment: '관리자계정암호',
        },
        admin_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '관리자이름',
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '관리자 메일주소 ',
        },
        telephone: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '관리자 전화번호',
        },
        dept_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '부서명',
        },
        used_yn_code: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '사용여부 1:사용중 2:사용x',
        },
        reg_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '등록자고유번호',
        },
        edit_user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '수정자고유번호',
        },
        edit_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '수정일시',
        },
        reg_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '등록일시',
        }
    },
    {
        sequelize,
        tableName: 'admin',// 기본 테이블명 옵션이 복수형이아닌 여기 지정한 테이블 명으로 생성됨
        timestamps: false,
        comment: '관리자 계정정보 테이블',
        indexes: [
            {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'admin_member_id' }],// 여러개의 컬럼이 프라이머리 키인경우(복합키){}추가하여 설정가능
            },
        ],
        })
}