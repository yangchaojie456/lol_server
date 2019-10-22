var fs = require("fs");
var http = require('http');  
var qs = require('querystring');  
var formatEquip = require('./formatEquip')
var {saveEquipPic} = require('./saveEquipPic')
// 当前游戏版本
var version = ''
// console.log(formatEquip)
// getEquipFromTencent()

module.exports = getEquipFromTencent

// 请求腾讯的联盟装备
// http://lol.qq.com/biz/hero/item.js
function getEquipFromTencent(){
    //这是需要提交的数据  
    var data = {      
        t: new Date().getTime()
    };
    var content = qs.stringify(data);  
      
    var options = {  
        hostname: 'lol.qq.com',  
        path: '/biz/hero/item.js',
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
            fs.writeFile('./temp_json/equipTencent.js', str+'module.exports=LOLitemjs', function(err) {
                if (err) {
                    return console.error(err);
                }
                var equipTencent = require('../temp_json/equipTencent.js')

                var data = equipTencent
                
                for (const key in data.data) {
                    if (data.data.hasOwnProperty(key)) {
                        // console.log(key)
                        saveEquipPic(key)
                    }
                }
                formatEquip()
                
                console.log(data.version)
                
                
            })
        })
    });  
      
    
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
    });  
      
    req.end();
}



function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    str = unescape(str);
    str = str.replace(/%\//g, '/')
    str = str.replace(/梅贾的窃魂窃魂卷/g, '梅贾的窃魂卷')
    
    return str
}
