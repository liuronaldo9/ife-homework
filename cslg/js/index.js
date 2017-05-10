

$(document).ready(function () {
    //下拉菜单滑动
    $("#navbar>ul>li:not(:first)").hover(function () {
        $(this).find("ul").stop().slideToggle("fast");

    });
    //手机的下拉按钮
    $("#toggle-bar").click(function () {
        $("#navbar").toggleClass("navbar-overflow");
        $("#toggle-bar2").fadeToggle("fast");
    });

    /*
    //菜单栏字体大小
    var fontsize = $("#navbar>ul>li").width() / 8;
    $("#navbar>ul>li>a").css("font-size", fontsize+"px");
    */
    //计算图片大小
    var imgW = $("#carousel").width();
    var imgH = imgW * 2 / 3;
    $("#carousel img").css("height", imgH + "px");  //改变图片高度
    //myFocus插件
    function carouselInit(imgW,imgH) {
   
        myFocus.set({
            id: 'carousel',//焦点图盒子ID
            pattern: 'mF_YSlider',//风格应用的名称
            time: 5,//切换时间间隔(秒)
            trigger: 'mouseover',//触发切换模式:'click'(点击)/'mouseover'(悬停)
            width: imgW,//设置图片区域宽度(像素)
            height: imgH,//设置图片区域高度(像素)
            txtHeight: 'default'//文字层高度设置(像素),'default'为默认高度，0为隐藏
        });
    }

    carouselInit(imgW,imgH);


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