;(function(window,document){
    function Drag(el) {

        if(!(this instanceof Drag)){
            return new Drag(el);
        }
        //属性
        if (typeof (el) === "string") {
            this.div = document.querySelector(el);
        } else {
            this.div = el;
        }
        this.disX = 0;
        this.disY = 0;
        //初始化
        this.init();
       
    }
    Drag.prototype = {
        init:function(){
                if (this.div) {
                    this.div.style.cursor = "move";
                    this.div.style.position = "absolute";
                }
            
                var _this = this;
                this.div.onmousedown = function (evt) {
                    _this.getDistance(evt);
                    document.onmousemove = function (evt) {
                        _this.setPosition(evt);
                    }
                    _this.div.onmouseup = function () {
                        _this.clearEvent();
                    }
                }
            },
        getDistance:function(evt){
            var oEvent = evt || event;
            this.disX = oEvent.clientX - this.div.offsetLeft;
            this.disY = oEvent.clientY - this.div.offsetTop;
            },
        setPosition:function(evt){
            var oEvent = evt || event;
            var l = oEvent.clientX - this.disX;
            var t = oEvent.clientY - this.disY;
            if (l <= 0) {
                l = 0;
            }
            else if (l >= document.body.clientWidth - this.div.offsetWidth) {
                l = document.body.clientWidth - this.div.offsetWidth;
            }
            if (t <= 0) {
                t = 0;
            }
            else if (t >= document.body.clientHeight - this.div.offsetHeight) {
                t = document.body.clientHeight - this.div.offsetHeight;
            }
            this.div.style.left = l + "px";
            this.div.style.top = t + "px"; 

            console.log(this.div.offsetLeft, this.div.offsetParent);
            },
        clearEvent:function(){
            this.div.onmouseup = null;
            document.onmousemove = null;
        }
    }
    

    window.Drag = Drag;
}
)(window,document);
