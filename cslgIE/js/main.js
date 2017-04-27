$("li.dropdown").mouseover(function () {
    $(this).addClass("open")
}).mouseout(function () {
    $(this).removeClass("open");
});

$(".nav-tabs a").mouseover(function () {
    $(this).tab("show");
});

$(document).ready(function () {
    //下拉菜单滑动
    $("#navbar>ul>li").hover(function () {
        $(this).find("ul").stop().slideToggle("fast");
    });
    /*
    var duration = 3000;
    var speed = 1000;
    var width = $("#carousel").width();
    var curIndex = 0;
    var totalIndex = $("#carousel>ul>li").length;
    var timer;
    //init
    $("#carousel>ul>li").each(function (index) {
        $(this).css("left", index * width + "px");
        $("#indicators").append("<span>" + (index + 1) + "</span>");
    })
    $("#indicators>span").eq(0).addClass("active");
    //lastshild
    var lastChild = $("#carousel>ul>li").eq(0).clone();
    $("#carousel>ul").append(lastChild);
    lastChild.css("left", totalIndex * width + "px");



    function move() {
        curIndex++;
        if (curIndex > totalIndex) {
            curIndex = 1;
            $("#carousel>ul").css("left", "0px");
        }
        $("#carousel>ul").animate({ left: curIndex * width * -1 }, speed);
        for (var i = 0; i < totalIndex; i++) {
            $("#indicators>span").eq(i).removeClass("active");
        }
        if (curIndex === totalIndex) {
            $("#indicators>span").eq(0).addClass("active");
        } else {
            $("#indicators>span").eq(curIndex).addClass("active");
        }

        timer = setTimeout(move, duration + speed);
    }

    timer = setTimeout(move, duration);
    //pause,start
    $("#carousel").hover(
        function () {
            clearTimeout(timer);
        },
        function () {
            timer = setTimeout(move, duration);
        });
    
    //indicators ָʾ
    */
    //myFocus插件
    myFocus.set({
        id: 'carousel',//焦点图盒子ID
        pattern: 'mF_YSlider',//风格应用的名称
        time: 5,//切换时间间隔(秒)
        trigger: 'mouseover',//触发切换模式:'click'(点击)/'mouseover'(悬停)
        width: 600,//设置图片区域宽度(像素)
        height: 400,//设置图片区域高度(像素)
        txtHeight: 'default'//文字层高度设置(像素),'default'为默认高度，0为隐藏
    });

    //日期
    var riqi = document.getElementById("riqi");
    handle();
    setInterval(handle, 1000);
    function handle() {
        var date = new Date();
        var now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        riqi.innerText = now;
    }
});