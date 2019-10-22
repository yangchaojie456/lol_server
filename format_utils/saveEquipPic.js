var http = require("http");
var fs = require("fs");



module.exports = {
    saveEquipPic
}
//http://ossweb-img.qq.com/images/lol/img/item/1004.png
function saveEquipPic(id, version) {
    
    fs.exists("./public/images/equip_pic/" + id + ".png", function (res) {
        if(!res){
            var url = "http://ossweb-img.qq.com/images/lol/img/item/"+id+".png"
            http.get(url, function (res) {
                var imgData = "";
        
                res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        
        
                res.on("data", function (chunk) {
                    imgData += chunk;
                });
        
                res.on("end", function () {
                    fs.writeFile("./public/images/equip_pic/" + id + ".png", imgData, "binary", function (err) {
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
