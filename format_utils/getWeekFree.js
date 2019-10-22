var fs = require("fs");
var http = require('http');  
var qs = require('querystring');  

// 当前游戏版本
var version = ''


module.exports = getWeekFree

// 请求腾讯的周免英雄
// https://lol.qq.com/biz/hero/free.js
function getWeekFree(){
    //这是需要提交的数据  
    var data = {      
        t: new Date().getTime()
    };
    var content = qs.stringify(data);  
      
    var options = {  
        hostname: 'lol.qq.com',  
        path: '/biz/hero/free.js',
        method: 'GET'  
    };  
    var str =''
    var req = http.request(options, function (res) {  
        // console.log('STATUS: ' + res.statusCode);  
        // console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            str+=chunk
            
        });  
        res.on('end',function(e){
            fs.writeFile('./temp_json/weekFree.js', str+'module.exports=LOLherojs', function(err) {
                if (err) {
                    return console.error(err);
                }
                var weekFree = require('../temp_json/weekFree.js')

                var data = weekFree.free

                
                // console.log(ChampionUS)
                fs.writeFile('./data_json/weekFree.json',JSON.stringify(data), function(err) {
                    if (err) {
                        return console.error(err);
                    }

                })
                
            })
        })
    });  
      
    
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
    });  
      
    req.end();
}
