var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/index.js', function (req, res, next) {
  res.header("Content-Type", "application/javascript");
  res.sendfile('./public/javascripts/index.js');  
});
router.get('/versionList', function(req, res, next) {  
  res.sendfile('./data_json/versionList.json');
});
module.exports = router;
