; (function(window, document) {
    var FuDong = function (targetDom, options) {
        
        if (!(this instanceof FuDong)) {
            return new FuDong(targetDom,options);
        }
        
        //this.target
        if (typeof (targetDom) === "string") {
            this.targetDom = document.querySelector(targetDom);
        } else {
            this.targetDom = targetDom;
        }
        //this.options
        this.options = options;
        //this.boxDom
        var boxDom = document.createElement("div");
        var fudongDom = document.createElement("div");
        boxDom.style.cssText = "display:none;z-index=999;position:fixed;top:0px;width:100%;height:100%;background:rgba(100,104,103,0.5)";
        fudongDom.style.cssText = "display:block;z-index=1000;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:300px;height:200px;background:#bde";
        if (this.options.boxDomStyle) {
            boxDom.style.cssText = this.options.boxDomStyle;
        }
        if (this.options.fudongDomStyle) {
            fudongDom.style.cssText = this.options.fudongDomStyle;
        }
        boxDom.appendChild(fudongDom);
        this.boxDom = boxDom;
        //initial
        this.init();
    }
    //prototype
    FuDong.prototype = {
        init: function () {
           this.event();
        },
        event: function () {
            var _this = this;

            this.targetDom.addEventListener("click", function () {
                document.body.appendChild(_this.boxDom);
                _this.boxDom.style.display = "block";
                //open
            },false);
            this.boxDom.addEventListener("click", function () {
                this.style.display = "none";
                //close
            },false);
        }
    };
   window.FuDong = FuDong;
})(window, document);