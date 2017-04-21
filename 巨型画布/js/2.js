var cl = null;
var cr = null;
var ctxl = null;
var ctxr = null;
var imgFile = null;
var r = 50;
var erpi = 2*Math.PI;
var startPos = {
    x: 0,
    y: 0
};
var downPos = {
    x: 0,
    y: 0
};
var upPos = {
    x: 0,
    y: 0
};
var dis = {
    x: 0,
    y: 0
};
var ctxrData = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
}
var rect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
}


window.onload = function () {
    cl = document.getElementById("canvas-left");
    cr = document.getElementById("canvas-right");
    //c.width = window.innerWidth;
    //c.height = window.innerHeight;
    ctxl = cl.getContext("2d");
    ctxr = cr.getContext("2d");
    imgFile = document.getElementById("file");

    imgFile.onchange = function () {
        //console.log(this.files[0]);
        //var imgUrl = getObjectURL(this.files[0]);
        var imgUrl = null;
        var img = null;
        var reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onprogress = function (e) {
            document.getElementById("progress").innerHTML = event.loaded + "/" + event.total;
        }
        reader.onload = function (e) {
            //img.src = e.target.result;
            img = createImg( reader.result);
        
        
        /*
        var img = handleFiles(this.files[0]);
        */
        //img加载完成再画图，不然取不到img就画不出来
        img.onload = function () {
            ctxl.drawImage(img, startPos.x, startPos.y);
            //图片和左canvas的长宽比
            var rateX = cl.width / img.width;
            var rateY = cl.height / img.height;
            //图片在右canvas的缩放比例
            var scaleRate = 0;
            //对比图片长宽比和右canvas长宽比，做出适应
            if (img.height / img.width >= cr.height / cr.width) {
                //在右canavas上画出图片
                ctxr.save();
                scaleRate = cr.height / img.height;
                ctxrData.y = 0;
                ctxrData.height = cr.height;
                ctxrData.width = scaleRate * img.width;
                ctxrData.x = (cr.width - ctxrData.width) / 2;
                ctxr.drawImage(img, 0, 0, img.width, img.height, ctxrData.x, ctxrData.y, ctxrData.width, ctxrData.height);
                ctxr.restore();

                //画出矩形框
                rect.x = ctxrData.x;
                rect.y = ctxrData.y;
                rect.width = ctxrData.width * rateX;
                rect.height = ctxrData.height * rateY;
                ctxr.beginPath();
                ctxr.rect(rect.x, rect.y, rect.width, rect.height);
                ctxr.closePath();
                ctxr.strokeStyle = "#e42";
                ctxr.stroke();
            
            } else {
                ctxr.save();
                scaleRate = cr.width / img.width;
                ctxrData.x = 0;
                ctxrData.width = cr.width;
                ctxrData.height = scaleRate * img.height;
                ctxrData.y = (cr.height - ctxrData.height) / 2;
                ctxr.drawImage(img, 0, 0, img.width, img.height, ctxrData.x, ctxrData.y, ctxrData.width, ctxrData.height);
                ctxr.restore();

                rect.x = ctxrData.x;
                rect.y = ctxrData.y;
                rect.width = ctxrData.width * rateX;
                rect.height = ctxrData.height * rateY;
                ctxr.beginPath();
                ctxr.rect(rect.x, rect.y, rect.width, rect.height);
                ctxr.closePath();
                ctxr.strokeStyle = "#e42";
                ctxr.stroke();
        
            }
            //在左canvas 上相应鼠标事件
            cl.onmousedown = function (e) {
                downPos.x = e.screenX;
                downPos.y = e.screenY;
            }
            cl.onmouseup = function (e) {
                upPos.x = e.screenX;
                upPos.y = e.screenY;

                dis.x = upPos.x - downPos.x;
                dis.y = upPos.y - downPos.y;
                //更新左边
                startPos.x += dis.x;
                startPos.y += dis.y;

                if (startPos.x > 0) {
                    startPos.x = 0;
                }
                if (startPos.y > 0) {
                    startPos.y = 0;
                }
                if ((startPos.x + img.width) < cl.width) {
                    startPos.x = cl.width - img.width;
                }
                if ((startPos.y + img.height) < cl.height) {
                    startPos.y = cl.height - img.height;
                }
                ctxl.clearRect(0, 0, cl.width, cl.height);
                ctxl.drawImage(img, startPos.x, startPos.y);

                //更新右边
                ctxr.clearRect(0, 0, cr.width, cr.height)
                ctxr.drawImage(img, 0, 0, img.width, img.height, ctxrData.x, ctxrData.y, ctxrData.width, ctxrData.height);
                rect.x = -startPos.x * scaleRate + ctxrData.x;
                rect.y = -startPos.y * scaleRate + ctxrData.y;
                ctxr.beginPath();
                ctxr.rect(rect.x, rect.y, rect.width, rect.height);
                ctxr.closePath();
                ctxr.strokeStyle = "#e42";
                ctxr.stroke();
            }

        }
        
        };
        
        
    }
}

function createImg(imgUrl) {
    var img = document.createElement("img");
    img.src = imgUrl;
    return img;
}

function getObjectURL(file) {
    var url = null;
    /*
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    */
    url = window.URL.createObjectURL(file);
    return url;
}

function handleFiles(file) {
    /*
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        var imageType = /image.;

        if (!file.type.match(imageType)) {
            return;
        }
    */
        //var img = document.createElement("img");
        //img.classList.add("obj");
        //img.file = file;
        //preview.appendChild(img);

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload =  function (e) {
                //img.src = e.target.result;
               return reader.result;
            };
        
        //return img.src;
}  

