var liHeight = 50;
var liWidth = 100;
var canClick = true;

var database = {
    className: ["name", "math", "chinese", "english","sum"],
    data: [
        ["zhangsan", 70, 80, 90,222],
        ["zhaosi", 90, 70, 80,333],
        ["wangwu", 80, 90, 70,212],
        ["guapi",88,99,55,343]
    ]
}

window.onload = function () {
   
}

//初始化
function init() {
    if (canClick) {
        //创建表格
        createTable(database.data.length + 1, database.className.length);
        //加click监听器
        setClick();
    }
    canClick = false;
}
function createTable(ulLen, liLen) {
    var div = document.createElement("div");
    div.id = "container";
    div.style.width = (liLen * liWidth) + "px";
    div.style.height = ((ulLen-1) * (liHeight)+20) + "px";
    div.style.marginLeft = (-parseInt(div.style.width) / 2) + "px";
    
    for (var i = 0; i < ulLen; i++) {
        var ul = document.createElement("ul");
        ul.style.top = liHeight * i + "px";

        for (var j = 0; j < liLen; j++) {
            var li = document.createElement("li");
            if (i == 0) {
                li.innerHTML = database.className[j];
                li.style.left = liWidth * j + "px";
            } else {
                li.innerHTML = database.data[i - 1][j];
                li.style.left = liWidth * j + "px";
            }
            ul.appendChild(li);
        }
        div.appendChild(ul);
    }
    document.body.appendChild(div);

}
//获得ul的数据
function ulData() {
    return document.getElementsByTagName("ul");
}
//获得li的数据
function liData() {
    var g = new Array();
    var ul = ulData();
    for (var i = 0; i < ul.length; i++) {
        g[i] = ul[i].getElementsByTagName("li");
    }
    return g;
}
//变换排序图标ui
function changeColor(x, dir, pos, len) {
    
        for (var k = 0; k < len; k++) {
            document.styleSheets[0].deleteRule(0);
        }
    
    for (var k = 0; k < len; k++) {
        if (k == x) {
            document.styleSheets[0].insertRule("#container ul:first-of-type li:nth-of-type(" + (k + 1) + ")::"+pos+"{border-"+dir+"-color:#fff;}", 0);
        }
        else {
            document.styleSheets[0].insertRule("#container ul:first-of-type li:nth-of-type(" + (k + 1) + ")::" + pos +"{border-" + dir +"-color:#acc;}", 0);
        }
    }
}
//加click
function setClick() {
    
    var uldata = ulData();
    var lidata = liData();
    var liflag = [];
    for (var k = 0; k < database.className.length; k++) {
        liflag[k] = 0;
        document.styleSheets[0].insertRule("*{}", 0);
    }
    for (let t = 0; t < lidata[0].length; t++) {            //let
        lidata[0][t].onclick = function () {
            database.data.sort(function (a, b) {
                if (typeof (a[t]) == "string") {
                    return a[t].localeCompare(b[t]);
                } else {
                    return a[t] - b[t];
                }
            });
            if (liflag[t] % 2 == 0) {
                changeColor(t, "top", "before", lidata[0].length);
            } else {
                changeColor(t, "bottom", "after", lidata[0].length);
                database.data.reverse();
            }


            //var liBefore = window.getComputedStyle(lidata[0][t], "::before");
            //console.log(liBefore.borderTopColor);
            //liBefore.borderTopColor = "#fff";

            for (var i = 0; i < database.data.length; i++) {

                for (var j = 1; j <= uldata.length; j++) {
                    if (lidata[j][0].innerHTML == database.data[i][0]) {
                        uldata[j].style.top = liHeight * (i + 1) + "px";
                        break;
                    }
                }
            }
            liflag[t]++;
        }
    }
}





