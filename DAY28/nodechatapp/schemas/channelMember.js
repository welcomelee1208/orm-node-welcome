//mongoose패키지 참조한다.
const mongoose = require('mongoose');

// 숫자 자동채번 기능제공을 위한 mongoose_sequence패키지 설치후 참조하기
//npm i mongoose-sequence@5.3.1
//mongoose-sequence기능을 이용하면 몽고DB안에 counters라는 collection 이 자동 생성되고 자동 채번번호를 관리해줍니다.

const { Schema } = mongoose;


//Schema클래스를 생성할때 생성자함수에 새로만들 콜렉션의 스키마(데이터구조)를 정의해서 콜랙션을 정의합니다.
const channelMemberSchema = new Schema({
    channel_id: {
        type: String,
        required: true,
    },
    member_id: {
        type: String,
        required: true,
    },
    nick_name: {
        type: String,
        required: true,
    },
    member_type_code: {
        type: Number,
        required: true,
    },
    active_state_code: {
        type: Number,
        required: true,
    },
    last_contact_date: {
        type: Date,
        default: Date.now(),
    },
    last_out_date: {
        type: Date,
        default: Date.now(),
    },
    connection_id: {
        type: String,
        required: true,
    },
    ip_adress: {
        type: Number,
        required: true,
    },
    edit_user_id: {
        type: String,
        required: false,
    },
    edit_date: {
        type: Date,
        default: Date.now(),
    },
    
});




//자동채번 컬럼생성및 콜렉션에 추가 



//moongose.model('콜랙션이름',콜렉션 구조정의 클래스)을호출하여 물리적인 콜랙션 (테이블)을 생성해줍니다,
module.exports = mongoose.model('ChannelMember', channelMemberSchema);