var liHeight = 50;
var liWidth = 100;

var database = {
    className: ["name", "math", "chinese", "english"],
    data: [
        ["zhangsan", 70, 80, 90],
        ["zhaosi", 90, 70, 80],
        ["wangwu",80,90,70]
    ]
}

window.onload = function () {
    var ul = document.getElementsByTagName("ul");
    
    for (var i = 0; i < ul.length; i++) {
        ul[i].style.top = liHeight * i + "px";
        var li = ul[i].getElementsByTagName("li");
        for (var j = 0; j < li.length; j++) {
            if (i == 0) {
                li[j].innerHTML = database.className[j];
                li[j].style.left = liWidth * j + "px";
            } else {
                li[j].innerHTML = database.data[i - 1][j];
                li[j].style.left = liWidth * j + "px";
            }
        }
    }
}

function ulData() {
    return document.getElementsByTagName("ul");
}

function liData() {
    var g = new Array();
    var ul = ulData();
    for (var i = 0; i < ul.length; i++) {
        g[i] = ul[i].getElementsByTagName("li");
    }
    return g;
}


var uldata = ulData();
var lidata = liData();
for (let t = 0; t < lidata[0].length; t++) {
    lidata[0][t].onclick = function () {
        database.data.sort(function (a, b) {
            if (typeof (a[t]) == "string") {
                return a[t].localeCompare(b[t]);
            } else {
                return a[t] - b[t];
            }
        });
        for (var i = 0; i < database.data.length; i++) {

            for (var j = 1; j <= uldata.length; j++) {
                if (lidata[j][0].innerHTML == database.data[i][0]) {

                    uldata[j].style.top = liHeight * (i + 1) + "px";
                    break;
                }
            }
        }
    }
}

//console.log(lidata[0][0].innerHTML);


