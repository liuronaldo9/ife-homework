var input = null;
var divData = [];
var divWidth = 60;
var showPanel = document.getElementById("show");

window.onload = function () {
    input = document.getElementsByTagName("input");
    //×ó²àÈë
    input[1].addEventListener("click", function () {
        if (input[0].value) {            
            var div = createCard(input[0].value);
            
            div.style.left = -divWidth + "px";
            showPanel.appendChild(div);
            setTimeout(function () { div.style.left = "0px";divData.unshift(div); }, 10);
            moveRight();
        }
    });
    input[2].addEventListener("click", function () {
        if (divData.length>0) {
            var div = divData.shift();
            div.style.left = -divWidth + "px";
            setTimeout(function () { div.parentNode.removeChild(div); }, 1000);
            moveLeft();
        }
    });
    input[3].addEventListener("click", function () {
        if (input[0].value) {
            var div = createCard(input[0].value);

            div.style.left = (showPanel.offsetWidth + divWidth) + "px";   //370+50
            showPanel.appendChild(div);
            setTimeout(function () { div.style.left = divData.length * divWidth + "px"; divData.push(div); }, 10);
            
        }
    });
    input[4].addEventListener("click", function () {
        if (divData.length>0) {
            var div = divData.pop();
            div.style.left = (showPanel.offsetWidth + divWidth) + "px";
             setTimeout(function () { div.parentNode.removeChild(div); }, 1000); 
        }
    })

}

function createCard(value) {
    var div = document.createElement("div");
    div.style.cssText = "position:absolute;width:50px;height:50px;background:#8ea;text-align:center;line-height:50px;transition:1s;";
    div.innerHTML = value;
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