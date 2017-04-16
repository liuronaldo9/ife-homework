var input = null;
var textArea = document.getElementsByTagName("textarea")[0];
var textArray = [];
var showPanel = document.getElementById("show");
var spanArray = [];


window.onload = function () {
    input = document.getElementsByTagName("input");
    //ȷ�����밴ť
    input[0].onclick = function () {
        init();    
    };
    //��ѯ��ť
    input[2].onclick = function () {
        mySerach();
    };
}

function init() {
    //ɾ��span�ڵ㣬���spanArray����
    var span = showPanel.getElementsByTagName("span");
    var len = span.length;
    for (var i = 0; i < len; i++) {
        showPanel.removeChild(span[0]);
        spanArray.pop();
    }
    //append �µ�span�ڵ㣬����spanArray
    textArray = textArea.value.split(/\s+|[\,\uff0c\u3001]/);
    for (var i = 0; i < textArray.length; i++) {
        var span = createSpan(textArray[i]);
        showPanel.appendChild(span);
        spanArray.push(span);
    }
}

function createSpan(value) {
    var span = document.createElement("span");
    span.style.cssText = "color:#eee;background:#333;margin:3px;transition:.6s";
    span.innerHTML = value;
    return span;
}

function mySerach() {
    var pattern = new RegExp(input[1].value);

    for (var i = 0; i < textArray.length; i++) {
        if (textArray[i].match(pattern)) {
            spanArray[i].style.background = "#e45";
        }
    }
}
