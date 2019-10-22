var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var championRouter = require('./routes/champion');
var equipRouter = require('./routes/equip');
var version_html = require('./routes/version_html');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
// 修改app.js 将view engine修改为ejs。（并将模板的后缀修改为.html）
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html'); 

app.use('/', indexRouter);

app.use('/champion', championRouter);
app.use('/equip', equipRouter);
app.use('/version_html', version_html);

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

// 更新英雄联盟英雄列表的数据
var formatChampion = require('./format_utils/formatChampion')
var getEquipList = require('./format_utils/getEquipList')
// 获取周免英雄
var getWeekFree = require('./format_utils/getWeekFree')
// 获取版本
var getUpdateVersion = require('./format_utils/getUpdateVersion')


getWeekFree()
formatChampion()
getEquipList()
getUpdateVersion()
updata()
function updata(){
  setInterval(() => {
    getWeekFree()
    formatChampion()
    getEquipList()
    getUpdateVersion()
  }, 3600000);
  // }, 10000);
}


module.exports = app;
