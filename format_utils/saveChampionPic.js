var http = require("http");
var fs = require("fs");



module.exports = {
    saveChampionSpell,
    saveChampionIcon,
    saveChampionPassive,
    saveChampionSplash
}

function saveChampionIcon(id, version) {
    fs.exists("./public/images/champion_pic/" + id + ".png", function (res) {
        if(!res){
            var url = "http://ddragon.leagueoflegends.com/cdn/" + version + "/img/champion/" + id + ".png"
            http.get(url, function (res) {
                var imgData = "";
        
                res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        
        
                res.on("data", function (chunk) {
                    imgData += chunk;
                });
        
                res.on("end", function () {
                    fs.writeFile("./public/images/champion_pic/" + id + ".png", imgData, "binary", function (err) {
                        if (err) {
                            console.log(err);
                        }
                        //  console.log("down success");
                    });
                });
            });
        }
    })
    
}
function saveChampionSpell(id, version) {

    fs.exists("./public/images/champion_spell/" + id + ".png", function (res) {
        if(!res){
            var url = "http://ddragon.leagueoflegends.com/cdn/" + version + "/img/spell/" + id + ".png"
            http.get(url, function (res) {
                var imgData = "";
        
                res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        
        
                res.on("data", function (chunk) {
                    imgData += chunk;
                });
        
                res.on("end", function () {
                    fs.writeFile("./public/images/champion_spell/" + id + ".png", imgData, "binary", function (err) {
                        if (err) {
                            console.log(err);
                        }
                        //  console.log("down success");
                    });
                });
            });
        }
    })
    
}
function saveChampionPassive(id, version) {

    fs.exists("./public/images/champion_passive/" + id, function (res) {
        if(!res){
            var url = "http://ddragon.leagueoflegends.com/cdn/" + version + "/img/passive/" + id
            http.get(url, function (res) {
                var imgData = "";
        
                res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        
        
                res.on("data", function (chunk) {
                    imgData += chunk;
                });
        
                res.on("end", function () {
                    fs.writeFile("./public/images/champion_passive/" + id, imgData, "binary", function (err) {
                        if (err) {
                            console.log(err);
                        }
                        //  console.log("down success");
                    });
                });
            });
        }
    })

    
}

function saveChampionSplash(id, version) {

    fs.exists("./public/images/champion_splash/" + id + ".jpg", function (res) {
        
        if (!res) {
            
            console.log(id)
            var url = "http://ossweb-img.qq.com/images/lol/web201310/skin/big"+id+".jpg"
            http.get(url, function (res) {
                var imgData = "";

                res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开


                res.on("data", function (chunk) {
                    imgData += chunk;
                });

                res.on("end", function () {
                    fs.writeFile("./public/images/champion_splash/" + id + ".jpg", imgData, "binary", function (err) {
                        if (err) {
                            console.log(id)
                            console.log(err);
                        }
                        //  console.log("down success");
                    });
                });
            });
        }

    })


}