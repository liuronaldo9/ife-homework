
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
    //last li border-bottom：none 
    var ul = document.getElementsByClassName("con");
    for (var i = 0; i < ul.length; i++) {
        ul[i].lastElementChild.style.border="none";
    }
    //even odd section margin
    var section = document.getElementsByClassName("section");
    for (var i = 0; i < section.length; i++) {
        if (i % 2 === 0) {
            section[i].style.marginLeft = "0";
            section[i].style.marginRight = "2%";
        } else {
            section[i].style.marginLeft = "2%";
            section[i].style.marginRight = "0";
        }
    }
    
});