; (function(window, document) {
    var FuDong = function (options) {
        
        if (!(this instanceof FuDong)) {
            return new FuDong(options);
        }
        //this.options
        this.options = options;
        //this.target
        if (typeof (this.options.targetDom) === "string") {
            this.targetDom = document.querySelector(this.options.targetDom);
        } else {
            this.targetDom = this.options.targetDom;
        }
        
        //this.boxDom
        var boxDom = document.createElement("div");
        var fudongDom = document.createElement("div");
        var confirmDom = document.createElement("div");
        //
        boxDom.style.cssText = "display:none;z-index=999;position:fixed;top:0px;width:100%;height:100%;background:rgba(100,104,103,0.5);";
        //
        fudongDom.style.cssText = "display:none;z-index=1000;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:350px;height:200px;background:#f5f9f6;text-align:center;border:1px solid #ccc;border-radius:2px;box-shadow:0 0 10px 4px #777;";
        if (this.options.boxDomStyle) {
            boxDom.style.cssText = this.options.boxDomStyle;
        }
        if (this.options.fudongDomStyle) {
            fudongDom.style.cssText = this.options.fudongDomStyle;
        }
        
        //
        confirmDom.style.cssText = "display:block;width:60px;height:30px;position:absolute;top:130px;left:250px;background:#fff;color:#7e7;text-align:center;line-height:30px;border:1px solid #7e7;border-radius:2px;transition:.3s;"
        confirmDom.innerHTML = "ok";
        //
        var tishiP = document.createElement("p");
        var contentP = document.createElement("p");
        tishiP.innerHTML = "warning";
        tishiP.style.cssText = "width:100%;position:absolute;top:10px;line-height:30px;border-bottom:1px solid #ddd;";
        contentP.innerHTML = "warning!";
        if (this.options.fudongDomText) {
            contentP.innerHTML = this.options.fudongDomText;
        }
        contentP.style.cssText = "position:absolute;top:60px;"
        fudongDom.appendChild(tishiP);
        fudongDom.appendChild(contentP);
        this.confirmDom = confirmDom;
        fudongDom.appendChild(confirmDom);
        this.fudongDom = fudongDom;
        this.boxDom = boxDom;
        //initial
        this.init();
        return fudongDom;
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
                document.body.appendChild(_this.fudongDom);
                _this.boxDom.style.display = "block";
                _this.fudongDom.style.display = "block";
                //open
            },false);
            this.boxDom.addEventListener("click", function () {
                this.style.display = "none";
                _this.fudongDom.style.display = "none";
                //close
            }, false);
            this.confirmDom.addEventListener("mouseover", function () {
                //this.style.cssText = "background:#7e7;color:#fff;"; //使用cssText没有效果
                this.style.background = "#7e7";
                this.style.color = "#fff";
                this.style.cursor = "pointer";
            }, false);
            this.confirmDom.addEventListener("mouseout", function () {
                this.style.background = "#fff";
                this.style.color = "#6e6";
            })
            this.confirmDom.addEventListener("click", function () {
                _this.boxDom.style.display = "none";
                _this.fudongDom.style.display = "none";
            })
            
        }
    };
   window.FuDong = FuDong;
})(window, document);