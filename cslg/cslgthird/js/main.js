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
   
    //last li border-bottom：none 
    $(".title-list").find("li").last().css("border-bottom", "none");

});