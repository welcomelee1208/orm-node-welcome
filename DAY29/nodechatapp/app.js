var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//환경설정파일 호출하기:전역정보로 설정됩니다.
//호출 위치는 반드시 app.js내 최상위에서 호출해야함.
require('dotenv').config()
const cors = require("cors");
var sequelize= require('./models/index.js').sequelize
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memberAPIRouter = require('./routes/memberAPI')
var channelAPIRouter= require('./routes/ChannelAPI')
var channelRouter= require('./routes/channel')

var app = express();
sequelize.sync();
//모든 RESTFUL호출에 대한 응답 허락하기-CORS ALL허락..
//app.use(cors());
//특정 도메인주소만 허가
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    origin: ["http://localhost:3005", "https://naver.com"],
  })
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//레이아웃 설정
app.set('layout', 'layout');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout extractMetas", true);
app.use(expressLayouts);app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', channelRouter);
app.use('/api/channel', channelAPIRouter)
app.use('/api/member', memberAPIRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
