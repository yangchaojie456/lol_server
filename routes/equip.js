var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('装备的信息');
});
// 获取装备列表
router.get('/list', function(req, res, next) {  
  res.sendfile('./data_json/equipList.json');
});
// // 获取某个英雄详情
// router.get('/:item', function(req, res, next) {
//   fs.stat('./data_json/champion_list/'+req.params.item+'.js', function (err, stats) {
//     if (err) {
//       return console.error(err);
//     }
//     // console.log(stats);       
//   })
//   res.sendfile('./data_json/champion_list/'+req.params.item+'.js');
// });
module.exports = router;
