
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
    function sectionMargin() {
        var section = document.getElementsByClassName("section");
        var c = document.getElementById("CONTAINER");
        if (c.offsetWidth > 500) {
            if (section[0].classList) {
                for (var i = 0; i < section.length; i++) {
                    if (i % 2 === 0) {
                        section[i].classList.add("section-margin-even");
                    } else {
                        section[i].classList.add("section-margin-odd");
                    }
                }
            } else {
                for (var i = 0; i < section.length; i++) {
                    if (i % 2 === 0) {
                        section[i].style.marginLeft = "0";
                        section[i].style.marginRight = "2%";
                    } else {
                        section[i].style.marginRight = "0";
                        section[i].style.marginLeft = "2%";

                    }
                }
            }
            
        } else {
            if (section[0].classList) {
                for (var i = 0; i < section.length; i++) {
                    if (i % 2 === 0) {
                        section[i].classList.remove("section-margin-even");
                    } else {
                        section[i].classList.remove("section-margin-odd");
                    }
                }
            } else {
                for (var i = 0; i < section.length; i++) {
                    section[i].style.margin = "3% 0 0 0";
                }
            }
     
        }
        //console.log(document.getElementById("CONTAINER").offsetWidth);
    }
    sectionMargin();
    window.onresize = function () {
        sectionMargin();
    }
    
    
});