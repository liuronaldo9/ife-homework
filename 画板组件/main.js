var cl = document.getElementById("canvasLeft");
var ctxl = cl.getContext("2d");
var cr = document.getElementById("canvasRight");
var ctxr = cr.getContext("2d");
var colorSelectedData = [255,0,0,255];
var inputR = document.getElementById("R");
var inputG = document.getElementById("G");
var inputB = document.getElementById("B");
var inputH = document.getElementById("H");
var inputS = document.getElementById("S");
var inputL = document.getElementById("L");
var canvasLeftFlagPos = [0,0];


window.onload = function () {
    //初始化俩个canvas
    initCanvasLeft([255, 0, 0, 255]);
    var rightImgData = initCanvasRight();
    //colorSelectedData = [rightImgData.data[0], rightImgData.data[1], rightImgData.data[2], 255];

    cl.onclick = function (e) {
        //清除flag
        var imgData = initCanvasLeft(colorSelectedData);
        drawCircle(ctxl, e.offsetX, e.offsetY, "#fff");
        canvasLeftFlagPos[0] = e.offsetX;
        canvasLeftFlagPos[1] = e.offsetY;
        //更新input
        var colorGet = getColor(imgData, canvasLeftFlagPos[0], canvasLeftFlagPos[1]);
        console.log(colorGet, imgData);
        inputR.value = colorGet[0];
        inputG.value = colorGet[1];
        inputB.value = colorGet[2];
    }

    cr.onclick = function (e) {
        //清除flag
        var rightImgData = initCanvasRight();
        drawCircle(ctxr, 7, e.offsetY, "#000");
        colorSelectedData = [rightImgData.data[(e.offsetY * 14 + e.offsetX) * 4], rightImgData.data[(e.offsetY * 14 + e.offsetX) * 4 + 1], rightImgData.data[(e.offsetY * 14 + e.offsetX) * 4 + 2], 255];
        var imgData = initCanvasLeft(colorSelectedData);
        drawCircle(ctxl, canvasLeftFlagPos[0], canvasLeftFlagPos[1], "#fff");

        //更新input
        var colorGet = getColor(imgData, canvasLeftFlagPos[0], canvasLeftFlagPos[1]);
        inputR.value = colorGet[0];
        inputG.value = colorGet[1];
        inputB.value = colorGet[2];

    }
    //输入rgb更新canvas
    inputR.onblur = function () {
        updateCanvas();
    }
    inputG.onblur = function () {
        updateCanvas();
    }
    inputB.onblur = function () {
        updateCanvas();
    }
}

function updateCanvas() {
    var color = [inputR.value, inputG.value, inputB.value];
    var responseData = rgb(color);
    canvasLeftFlagPos[0] = responseData.row;
    canvasLeftFlagPos[1] = responseData.col;
    initCanvasLeft(responseData.colorTopRight);
    drawCircle(ctxl, canvasLeftFlagPos[0], canvasLeftFlagPos[1], "#fff");
    initCanvasRight();
    drawCircle(ctxr, 7, responseData.canvasRightFlagPosY, "#000");
}

function getColor(imgData, x, y) {
    console.log("x=" + x + "y=" + y);
    var color = [];
    color[0] = imgData.data[y * 256 * 4 + x * 4];
    color[1] = imgData.data[y * 256 * 4 + x * 4 + 1];
    color[2] = imgData.data[y * 256 * 4 + x * 4 + 2];
    return color;
}

function drawCircle(ctx,x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
}

function initCanvasLeft(colorSelectedData) {
    var imgData = ctxl.createImageData(cl.width, cl.height);

    //右上角颜色
    for (var i = 0; i < 3; i++) {
        imgData.data[(cl.width-1) * 4+ i] = colorSelectedData[i];
    }
    //左边颜色
    for (var i = 0; i < cl.height; i++) {
        imgData.data[4*cl.width*i] = 255 - i;
        imgData.data[1 + 4 * cl.width * i] = 255 - i;
        imgData.data[2 + 4 * cl.width * i] = 255 - i;
    }
    //右边颜色
    var offR = (0 - imgData.data[(cl.width - 1) * 4]) / 255;
    var offG = (0 - imgData.data[(cl.width - 1) * 4 + 1]) / 255;
    var offB = (0 - imgData.data[(cl.width - 1) * 4 + 2]) / 255;
    for (var i = 1; i < cl.height; i++) {
        imgData.data[(cl.width * (i + 1) - 1) * 4] = imgData.data[(cl.width - 1) * 4] + offR * i;
        imgData.data[(cl.width * (i + 1) - 1) * 4 + 1] = imgData.data[(cl.width - 1) * 4 + 1] + offG * i;
        imgData.data[(cl.width * (i + 1) - 1) * 4 + 2] = imgData.data[(cl.width - 1) * 4 + 2] + offB * i;
    }
    //中间颜色
    for (var i = 0; i < cl.height; i++) {
        offR = (imgData.data[(cl.width * (i + 1) - 1) * 4] - imgData.data[cl.width *4* i]) / 255;
        offG = (imgData.data[(cl.width * (i + 1) - 1) * 4 + 1] - imgData.data[cl.width *4* i] + 1) / 255;
        offB = (imgData.data[(cl.width * (i + 1) - 1) * 4 + 2] - imgData.data[cl.width * 4 * i] + 2) / 255;
        for (var j = 1; j < cl.width - 1; j++) {
            imgData.data[cl.width * 4 * i + 4 * j] = imgData.data[cl.width * 4 * i] + offR*j;
            imgData.data[cl.width * 4 * i + 4 * j + 1] = imgData.data[cl.width * 4 * i + 1] + offG*j;
            imgData.data[cl.width * 4 * i + 4 * j + 2] = imgData.data[cl.width * 4 * i + 2] + offB*j;
        }
    }
    //将所有alpha通道设置为255
    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i+3] = 255 ;
    }
    ctxl.putImageData(imgData, 0, 0);

    return imgData;
}

function initCanvasRight() {
    var myGradient = ctxr.createLinearGradient(0, 0, 0, cr.height);

    myGradient.addColorStop(0, "rgba(255,0,0,1)");
    myGradient.addColorStop(1 / 6, "rgba(255,0,255,1)");
    myGradient.addColorStop(2 / 6, "rgba(0,0,255,1)");
    myGradient.addColorStop(3/6, "rgba(0,255,255,1)");
    myGradient.addColorStop(4 / 6, "rgba(0,255,0,1)");
    myGradient.addColorStop(5 / 6, "rgba(255,255,0,1)");
    myGradient.addColorStop(6 / 6, "rgba(255,0,0,1)");
    
    
    ctxr.beginPath();
    ctxr.rect(0, 0, cr.width, cr.height);
    ctxr.closePath();
    ctxr.fillStyle = myGradient;
    ctxr.fill();

    var imgData = ctxr.getImageData(0, 0, cr.width, cr.height);

    return imgData;
}

function rgb(color) {
    //未知的有右上角不大不小的通道值和第几列
    var posMidValue;
    var row;
    var col;
    for (var i = 0; i < color.length; i++) {
        color[i] = parseInt(color[i]);
    }
    var r = color[0];
    var g = color[1];
    var b = color[2];
    var posMax;
    var posMin;
    var posMid;
    //右上角(最大的255，最小的0，剩余一个未知)
    var colorTopRight = [];
    if (color[0] >= color[1] && color[0] >= color[2]) {
        posMax = 0;
        if (color[1] >= color[2]) {
            posMin = 2;
            posMid = 1;
        } else {
            posMin = 1;
            posMid = 2;
        }
    }
    if (color[1] > color[0] && color[1] > color[2]) {
        posMax = 1;
        if (color[0] >= color[2]) {
            posMin = 2;
            posMid = 0;
        } else {
            posMin = 0;
            posMid = 2;
        }
    }
    if(color[2]>color[0]&&color[2]>color[1])    {
        posMax = 2;
        if (color[0] >= color[1]) {
            posMin = 1;
            posMid = 0;
        } else {
            posMin = 0;
            posMid = 1;
        }
    }
    
    //第几行
    row = 255 - color[posMax];
    //第几列
    col = (color[posMax] - color[posMin]) / color[posMax] * 255;
    //右上角第二大的通道值
    posMidValue = (color[posMax]-((color[posMax] - color[posMid]) * 255 / col)) * 255 / color[posMax];

    colorTopRight[posMin] = 0;
    colorTopRight[posMid] = posMidValue;
    colorTopRight[posMax] = 255;

    var canvasRightFlagPosY;
    if (posMin == 1) {
        canvasRightFlagPosY = 0;
        if ((posMin + 1) % 3 == posMid) {
            canvasRightFlagPosY += posMidValue * 85 / 510;
        } else {
            canvasRightFlagPosY += (posMidValue+255 * 85) / 510;
        }
    }
    if (posMin == 0) {
        canvasRightFlagPosY = 85;
        if ((posMin + 1) % 3 == posMid) {
            canvasRightFlagPosY += posMidValue * 85 / 510;
        } else {
            canvasRightFlagPosY += (posMidValue + 255 * 85) / 510;
        }
    }
    if (posMin == 2) {
        canvasRightFlagPosY = 170;
        if ((posMin + 1) % 3 == posMid) {
            canvasRightFlagPosY += posMidValue * 85 / 510;
        } else {
            canvasRightFlagPosY += (posMidValue + 255 * 85) / 510;
        }
    }
    return {
        colorTopRight: colorTopRight,
        row: col,
        col: row,
        canvasRightFlagPosY: canvasRightFlagPosY       
    }
}
