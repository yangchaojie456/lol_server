var cheerio = require('cheerio')
var fs = require("fs");
var http = require('http');
var iconv = require('iconv-lite');

var listObj={}
module.exports = getUpdatePageList

function getUpdatePageList(){

    var options = {
        hostname: 'lol.qq.com',
        path: '/gicp/news/423/2/1334/1.html',
        method: 'GET'
    };
    
    var req = http.request(options, function (res) {
        // console.log('STATUS: ' + res.statusCode);  
        // console.log('HEADERS: ' + JSON.stringify(res.headers));  
        // res.setEncoding('Binary');  
        var arrBuf = [];
        var bufLength = 0;
        res.on('data', function (chunk) {
            arrBuf.push(chunk);
            bufLength += chunk.length;
        });
        res.on('end', function (e) {
            var chunkAll = Buffer.concat(arrBuf, bufLength);
            var strJson = iconv.decode(chunkAll, 'gbk'); // 汉字不乱码
            // console.log(strJson);
            
            var $ = cheerio.load(strJson)
            
            var newsitem=$('.news-type-list .newsitem')
            
            listObj={
                [newsitem.eq(0).find('a').text()]:newsitem.eq(0).find('a').attr('href'),
                [newsitem.eq(1).find('a').text()]:newsitem.eq(1).find('a').attr('href'),
                [newsitem.eq(2).find('a').text()]:newsitem.eq(2).find('a').attr('href'),
                [newsitem.eq(3).find('a').text()]:newsitem.eq(3).find('a').attr('href'),
                [newsitem.eq(4).find('a').text()]:newsitem.eq(4).find('a').attr('href'),
                [newsitem.eq(5).find('a').text()]:newsitem.eq(5).find('a').attr('href'),
                [newsitem.eq(6).find('a').text()]:newsitem.eq(6).find('a').attr('href'),
                [newsitem.eq(7).find('a').text()]:newsitem.eq(7).find('a').attr('href'),
                [newsitem.eq(8).find('a').text()]:newsitem.eq(8).find('a').attr('href'),
            }
            // 版本列表的json
            fs.writeFile('./data_json/versionList.json',JSON.stringify(listObj), function(err) {
                if (err) {
                    return console.error(err);
                }
            })
            var index = 0
            // console.log(listObj)
            for (const key in listObj) {
                if (listObj.hasOwnProperty(key)) {
                    const element = listObj[key];
                    
                    getItemDetail(element,index++)
                }
            }
        })
    });
    
    
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    
    req.end();

}
function getItemDetail(path,index){
    var options = {
        hostname: 'lol.qq.com',
        path: path,
        method: 'GET'
    };
    
    var req = http.request(options, function (res) {
        // console.log('STATUS: ' + res.statusCode);  
        // console.log('HEADERS: ' + JSON.stringify(res.headers));  
        // res.setEncoding('Binary');  
        var arrBuf = [];
        var bufLength = 0;
        res.on('data', function (chunk) {
            arrBuf.push(chunk);
            bufLength += chunk.length;
        });
        res.on('end', function (e) {
            var chunkAll = Buffer.concat(arrBuf, bufLength);
            var strJson = iconv.decode(chunkAll, 'gbk'); // 汉字不乱码
            var $ = cheerio.load(strJson)
            // 获取banner图
            // console.log($('.article').children().first().find('img').attr('src'));
            var imgSrc = $('.article').children().first().find('img').attr('src')
            saveBannerPic(imgSrc,index)
            fs.writeFile('./data_json/versionUpdate_html/index'+index+'.html', decodeUnicode($('.article').html().toString()), function(err) {
                if(err){
                    console.log(err)
                }
                
            })

        })
    });
    
    
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    
    req.end();
}

// 保存banner图
function saveBannerPic(url,index){
        console.log(url)
            if(!url){
                return false;
            }
            url= url.replace('https','http')
            if(!url.includes('http')){
                url='http:'+url
            }
            http.get(url, function (res) {
                var imgData = "";
        
                res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        
        
                res.on("data", function (chunk) {
                    imgData += chunk;
                });
        
                res.on("end", function () {
                    fs.writeFile("./public/images/versionBanner/" + index + ".jpg", imgData, "binary", function (err) {
                        if (err) {
                            console.log(err);
                        }
                        //  console.log("down success");
                    });
                });
            });
}

function decodeUnicode(str) {
    
    str = str.replace(/&#x(.*?);/g,'%u$1')
    str = unescape(str);
    str = str.replace(/%uA0/g,'&nbsp;')
    str = str.replace(/%uB7/g,'·')

    return str
}