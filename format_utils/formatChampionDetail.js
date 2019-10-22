var fs = require("fs");
var http = require('http');  
var qs = require('querystring');  
// 获取英雄技能图标
var {saveChampionSpell,saveChampionPassive,saveChampionSplash} = require('./saveChampionPic')
// 当前游戏版本
var version = ''


// 请求腾讯的英雄资料
// http://lol.qq.com/biz/hero/Lucian.js
function getChampionFromTencent(id){
    //这是需要提交的数据  
    var data = {      
        t: new Date().getTime()
    };
    var content = qs.stringify(data);  
      
    var options = {  
        hostname: 'lol.qq.com',  
        path: '/biz/hero/'+id+'.js',
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
            fs.writeFile('./temp_json/champion_list/'+id+'_TX.js', str+'module.exports=LOLherojs', function(err) {
                if (err) {
                    return console.error(err);
                }
                var ChampionTencent = require('../temp_json/champion_list/'+id+'_TX.js')
                // console.log(ChampionTencent)
                var data = ChampionTencent.champion[id]
                // console.log('key和英雄命：'+data.keys)
                // console.log('英雄数据：'+data.data)
                // console.log('版本：'+data.version)
                version = data.version
                // console.log('更新时间'+data.updated)
                getChampionFromUS(version,data,id)
            })
        })
    });  
      
    
    req.on('error', function (e) {  
        // console.log('problem with request: ' + e.message);  
    });  
      
    req.end();
}

// 获取美服带英雄属性的英雄列表
function getChampionFromUS(version,championData,id){
    // https://ddragon.leagueoflegends.com/cdn/8.23.1/data/en_US/champion/Lucian.json
    //这是需要提交的数据  
    var data = {      
        t: new Date().getTime()
    };
    var content = qs.stringify(data);  
      
    var options = {  
        hostname: 'ddragon.leagueoflegends.com',  
        path: '/cdn/'+version+'/data/en_US/champion/'+id+'.json',
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
            fs.writeFile('./temp_json/champion_list/'+id+'_US.json', str, function(err) {
                if (err) {
                    return console.error(err);
                }
                var ChampionUS = require('../temp_json/champion_list/'+id+'_US.json')
                // console.log(ChampionUS)

                // 英雄各项指标参数
                // ChampionUS.data[id].stats
                championData.data.stats = ChampionUS.data[id].stats
                championData.data.spells.forEach(element => {
                    saveChampionSpell(element.id,version)
                });
                saveChampionPassive(championData.data.passive.image.full,version)
                if(championData.data.skins){
                    championData.data.skins.forEach(element => {
                        saveChampionSplash(element.id,version)
                    });
                }
                            
                // console.log(ChampionUS)
                fs.writeFile('./data_json/champion_list/'+id+'.json',JSON.stringify(championData), function(err) {
                    if (err) {
                        return console.error(err);
                    }

                })
            })
        })
    });  
      
    
    req.on('error', function (e) {  
        // console.log('problem with request: ' + e.message);  
    });  
      
    req.end();
}
module.exports = getChampionFromTencent
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    str = unescape(str);
    str = str.replace(/%\//g, '/')
    str = str.replace(/梅贾的窃魂窃魂卷/g, '梅贾的窃魂卷')
    
    return str
}
