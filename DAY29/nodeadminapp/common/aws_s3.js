    const multer = require('multer');
    const multerS3 = require('multer-s3');
    const AWS = require('aws-sdk');

    //파일명 기반 파일 확장자 조회수
    function getExtention(fileName) {
    if (fileName == '') return '';
    var arrFileName = fileName.split('.');
    console.log(arrFileName);
    return arrFileName[arrFileName.length - 1];
    }
    //AWS S3업로드 객체
    const upload = {
    getUpload: function (path) {
        //해당 S3버킷 안에 폴더위치 지정
        var s3path = 'contents/';

        if (path != '') s3path = path;
        //S3객체를 생성시 버킷의 엑세스 키와 시크리트키를 전달
        const s3 = new AWS.S3({
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_ACCESS_SECRET_KEY,
        });

        //MULTERS3라는 S3전용MULTER 패키지를 이용해 파일저장처리
    const storage = multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            var ext = getExtention(file.originalname);
            cb(null, {
            fieldName: file.fieldname,
            fileNewName: Date.now().toString() + '.' + ext,
            extention: '.' + ext,
            });
        },
        key: function (req, file, cb) {
            cb(
            null,
            `uploads/${s3path}${Date.now()}.${getExtention(file.originalname)}`,//S3저장될 파일명 형식지정하기/uploads/contents
            );
        },
        });

        return multer({ storage: storage });
    },
    };

    exports.upload = upload;