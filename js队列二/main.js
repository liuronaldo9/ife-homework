var input = null;
var divData = [];
var divWidth = 15;
var showPanel = document.getElementById("show");

window.onload = function () {
    input = document.getElementsByTagName("input");
    //左侧入
    input[0].addEventListener("blur", function () {
        if (isNaN(input[0].value) || input[0].value < 10 || input[0].value > 100) {
            input[0].value = "请输入10—100的数字！";
        }
    });
            input[1].addEventListener("click", function () {
                if (!isNaN(input[0].value)) {
                    var div = createCard(input[0].value);

                    div.style.left = -divWidth + "px";
                    showPanel.appendChild(div);
                    setTimeout(function () { div.style.left = "0px"; divData.unshift(div); }, 10);
                    moveRight();
                }
            });
            input[2].addEventListener("click", function () {
                if (divData.length > 0) {
                    var div = divData.shift();
                    div.style.left = -divWidth + "px";
                    setTimeout(function () { div.parentNode.removeChild(div); }, 1000);
                    moveLeft();
                }
            });
            input[3].addEventListener("click", function () {
                if (!isNaN(input[0].value)) {
                    var div = createCard(input[0].value);

                    div.style.left = (showPanel.offsetWidth + divWidth) + "px";   //370+50
                    showPanel.appendChild(div);
                    setTimeout(function () { div.style.left = divData.length * divWidth + "px"; divData.push(div); }, 10);

                }
            });
            input[4].addEventListener("click", function () {
                if (divData.length > 0) {
                    var div = divData.pop();
                    div.style.left = (showPanel.offsetWidth + divWidth) + "px";
                    setTimeout(function () { div.parentNode.removeChild(div); }, 1000);
                }
            });
            input[5].addEventListener("click", function () {

                bulb1(0);
            });


    
}

function createCard(value) {
    var div = document.createElement("div");
    var width = divWidth - 5;
    var height = value;
    var top = showPanel.offsetHeight - height;
    div.style.cssText = "width:" + width + "px;height:" + height + "px;position:absolute;top:"+top+"px;background:#8ea;text-align:center;line-height:50px;transition:1s;";
    return div;
}
function moveLeft() {
    for (var i = 0; i < divData.length; i++) {
        divData[i].style.left = (parseInt(divData[i].style.left) - divWidth) + "px";
    }
}
function moveRight() {
    for (var i = 0; i < divData.length; i++) {
        divData[i].style.left = (parseInt(divData[i].style.left) + divWidth) + "px";
    }
}
/*
function mySort() {
    for (var i = 0; i < divData.length - 1; i++) {
        
        for (var j = 0; j < divData.length - 1 - i; j++) {
            if (divData[j].offsetHeight > divData[j + 1].offsetHeight) {
                exchange(j, j + 1);
                //setTimeout(function () {  },1000);
                
            }
        }

    }
}
*/

function bulb1(turn) {
    turn++;
    bulb2(0, turn);
    if (turn < divData.length-1) {
        setTimeout("bulb1(" + turn + ")", (divData.length - turn) * 1000);
    }
}
function bulb2(index,i) {
    if (divData[index].offsetHeight > divData[index + 1].offsetHeight) {
        exchange(index,index + 1);
        console.log(divData[0].offsetHeight, divData[1].offsetHeight,divData[2].offsetHeight);
    }
    index++;
    if (index < divData.length - i) {
        setTimeout("bulb2(" + index + ","+i+")", 1000);
    } else if (i >= divData.length - 2) {
        input[0].value = "success";
    }
}


function exchange(a, b) {
    console.log(divData[a].offsetHeight, divData[b].offsetHeight);
    divData[a].style.left = parseInt(divData[a].style.left) + divWidth + "px";
    divData[b].style.left = parseInt(divData[b].style.left) - divWidth + "px";
    var t = divData[a];
    divData[a] = divData[b];
    divData[b] = t;
    
}