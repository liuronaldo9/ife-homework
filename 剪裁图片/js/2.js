var c = null;
var ctx = null;
var imgFile = null;
var erpi = 2 * Math.PI;
var buffer = 5;
var img = null;
var imgInCanvas = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
};
var rect = {
    x: 0,
    y: 0,
    width: 100,
    height: 100
}
var mouseDownPos = null;
var mouseUpPos = null;
var mouseMovePos = null;


window.onload = function () {
    c = document.getElementById("canvas");
    //c.width = window.innerWidth;
    //c.height = window.innerHeight;
    ctx = c.getContext("2d");
    var rectDataInput = document.getElementsByClassName("rectDataInput");
    var clipRectBtn = document.getElementById("clipRect");
    var clipBtn = document.getElementById("clip");


    imgFile = document.getElementById("file");

    imgFile.onchange = function () {
        var imgUrl = getObjectURL(this.files[0]);
        //var imgUrl = handleFiles(this.files[0]);
        img = createImg(imgUrl);
        /*
        var img = handleFiles(this.files[0]);
        */
        //img加载完成再画图，不然取不到img就画不出来
        img.onload = function () {
            if (img.width <= c.width && img.height <= c.height) {
                imgInCanvas.width = img.width;
                imgInCanvas.height = img.height;
            } else {
                if (img.height / img.width <= c.height / c.width) {
                    imgInCanvas.x = 0;
                    imgInCanvas.width = c.width;
                    imgInCanvas.height = c.width / img.width * img.height;
                    imgInCanvas.y = (c.height - imgInCanvas.height) / 2;
                    ctx.drawImage(img, 0, 0, img.width, img.height, imgInCanvas.x, imgInCanvas.y, imgInCanvas.width, imgInCanvas.height);
                    drawRect();
                } else {
                    imgInCanvas.y = 0;
                    imgInCanvas.height = c.height;
                    imgInCanvas.width = c.height / img.height * img.width;
                    imgInCanvas.y = (c.width - imgInCanvas.width) / 2;
                    ctx.drawImage(img, 0, 0, img.width, img.height, imgInCanvas.x, imgInCanvas.y, imgInCanvas.width, imgInCanvas.height);
                    drawRect();
                }
            }

            c.onmousedown = function (e) {
                mouseDownPos = {
                    x: e.offsetX,
                    y: e.offsetY
                };

            }
            c.onmouseup = function (e) {
                mouseUpPos = {
                    x: e.offsetX,
                    y: e.offsetY
                };
                //在裁剪框内 , 则移动
                if (mouseDownPos.x > rect.x && mouseDownPos.x < (rect.x + rect.width) && mouseDownPos.y > rect.y && mouseDownPos.y < (rect.y + rect.height)) {
                    var disX = mouseUpPos.x - mouseDownPos.x;
                        rect.x += disX;
                        var disY = mouseUpPos.y - mouseDownPos.y;
                        rect.y += disY;
                        updateCanvas();
                }
                //在裁剪框上 ， 则改变裁剪框大小
                //left
                if (mouseDownPos.x <= rect.x && mouseDownPos.x >= (rect.x - buffer) && mouseDownPos.y >= rect.y && mouseDownPos.y <= (rect.y + rect.height)) {

                    var disX = mouseUpPos.x - mouseDownPos.x;
                    rect.x += disX;
                    rect.width -= disX;
                    updateCanvas();

                }
                //right
                if (mouseDownPos.x <= (rect.x + rect.width + buffer) && mouseDownPos.x >= (rect.x + rect.width) && mouseDownPos.y >= rect.y && mouseDownPos.y <= (rect.y + rect.height)) {
                        var disX = mouseUpPos.x - mouseDownPos.x;
                        rect.width += disX;

                        updateCanvas();

                }
                //top
                if (mouseDownPos.y >= (rect.y - buffer) && mouseDownPos.y <= rect.y && mouseDownPos.x > rect.x && mouseDownPos.x < (rect.x + rect.width)) {

                    var disY = mouseUpPos.y - mouseDownPos.y;
                    rect.y = mouseUpPos.y;
                    rect.height -= disY;
                    updateCanvas();
                }
                //bottom
                if (mouseDownPos.y > (rect.y + rect.height) && mouseDownPos.y <= (rect.y + rect.height + buffer) && mouseDownPos.x > rect.x && mouseDownPos.x < (rect.x + rect.width)) {

                    var disY = mouseUpPos.y - mouseDownPos.y;
                        rect.height += disY;

                        updateCanvas();

                }
                
            }
            //改变指针图片
            c.onmousemove = function (e) {
                c.style.cursor = "default";
                mouseMovePos = {
                    x: e.offsetX,
                    y: e.offsetY
                };
                //在裁剪框内 , 则移动
                if (mouseMovePos.x > rect.x && mouseMovePos.x < (rect.x + rect.width) && mouseMovePos.y > rect.y && mouseMovePos.y < (rect.y + rect.height)) {
                    c.style.cursor = "move";
                }
                //在裁剪框上 ， 则改变裁剪框大小
                //left
                if (mouseMovePos.x <= rect.x && mouseMovePos.x >= (rect.x - buffer) && mouseMovePos.y >= rect.y && mouseMovePos.y <= (rect.y + rect.height)) {

                    c.style.cursor = "w-resize";

                }
                //right
                if (mouseMovePos.x <= (rect.x + rect.width + buffer) && mouseMovePos.x >= (rect.x + rect.width) && mouseMovePos.y >= rect.y && mouseMovePos.y <= (rect.y + rect.height)) {
                    c.style.cursor = "e-resize";

                }
                //top
                if (mouseMovePos.y >= (rect.y-buffer) && mouseMovePos.y <= rect.y  && mouseMovePos.x > rect.x && mouseMovePos.x < (rect.x + rect.width)) {

                    c.style.cursor = "n-resize";
                }
                //bottom
                if (mouseMovePos.y > (rect.y + rect.height) && mouseMovePos.y <= (rect.y + rect.height + buffer) && mouseMovePos.x > rect.x && mouseMovePos.x < (rect.x + rect.width)) {

                    c.style.cursor = "s-resize";

                }
                
                    
                
            }
        }

        clipRectBtn.onclick = function () {
            rect.x = parseInt(rectDataInput[0].value);
            rect.y = parseInt(rectDataInput[1].value);
            rect.width = parseInt(rectDataInput[2].value);
            rect.height = parseInt(rectDataInput[3].value);
            updateCanvas();
        }

        clipBtn.onclick = function () {
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.rect(rect.x, rect.y, rect.width, rect.height);
            ctx.clip();
            ctx.drawImage(img, 0, 0, img.width, img.height, imgInCanvas.x, imgInCanvas.y, imgInCanvas.width, imgInCanvas.height);
            drawRect();
        }
    }
}
function drawRect() {
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.closePath();
    ctx.strokeStyle = "#fff";
    ctx.stroke();
   
}
function updateCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, imgInCanvas.x, imgInCanvas.y, imgInCanvas.width, imgInCanvas.height);
    drawRect();
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



