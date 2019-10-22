var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('版本信息');
});
// 获取某个英雄详情
router.get('/:item', function(req, res, next) {    
    fs.stat('./data_json/versionUpdate_html/'+req.params.item+'.html', function (err, stats) {
      if (err) {
        return console.error(err);
      }
      // console.log(stats);       
    })
    res.sendfile('./data_json/versionUpdate_html/'+req.params.item+'.html');
});
module.exports = router;
