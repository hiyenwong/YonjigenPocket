/**
 * Created by robinwong51 on 07/03/2017.
 */
(
    function Yojigen() {

        this.getQueryString = function (name) {
            'use strict';
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]).toLowerCase();
            }
            return null;
        };

        /**
         * get resource uri
         * @param name
         */
        this.getQuery = function (name) {
            'use strict';
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        };


        /**
         * comments trans to html
         * @param f
         * @returns {*}
         */
        this.hereDoc = function (f) {
            return f.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '');
        };


        /**
         * unique array
         *
         * @param arr
         * @returns {Array}
         */
        this.uniArray = function (arr) {
            var uniqueArr = [];
            $.each(arr, function (i, el) {
                if ($.inArray(el, uniqueArr) === -1) uniqueArr.push(el);
            });

            return uniqueArr;
        };

        /**
         * is a array?
         * @param obj
         * @returns {boolean}
         */
        this.isArray = function (obj) {
            return Object.prototype.toString.call(obj).toLowerCase() == "[object array]";
        };

        /**
         * show what object type is
         */
        this.whatObjectType = function (obj) {
            return Object.prototype.toString.call(obj);
        };

        /**
         * is empty
         * @param value
         * @returns {boolean}
         */
        this.isNotEmpty = function (value) {
            return !$.isEmptyObject(value);
        };

        /**
         * top array
         * @param res
         * @param tag
         * @returns {*}
         */
        this.topArray = function (res, tag) {
            $.each(res[tag].v, function (i, v) {
                res[tag].v[i].data = res[tag].v[i].data.slice(0, 10);
                res[tag].all = res[tag].all.slice(0, 10);
            });
            return res;
        };

        /**
         * post to URL
         * @param path
         * @param params
         * @param method
         */
        this.postToURL = function (path, params, method) {
            method = method || "post";

            var form = document.createElement("form");

            //Move the submit function to another variable
            //so that it doesn't get overwritten.
            form._submit_function_ = form.submit;

            form.setAttribute("method", method);
            form.setAttribute("action", path);

            for (var key in params) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }

            document.body.appendChild(form);
            form._submit_function_(); //Call the renamed function.
        };

        this.isSafari = function () {
            if (navigator.userAgent.indexOf("Safari") > -1) {
                return true;
            }
            return false;
        };


        this.safariNoCache = function () {
            if (isSafari()) {
                $(window).bind("pageshow", function (event) {
                    if (event.originalEvent.persisted && $('body').hasClass("no-cache")) {
                        document.body.style.display = "none";
                        window.location.reload();
                    }
                });
            }
        };

        this.userAgent = function () {
            return {
                versions: function () {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    return {
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                        qq: u.match(/\sQQ/i) == " qq" //是否QQ
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            }
        };

        /**
         * check IE version
         *
         * @returns {*}
         */
        this.isIE = function () {
            'use strict';
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
        };


        /**
         * loading js
         * @param url
         * @param callback
         */
        this.loadingJS = function (url, callback) {
            var script = document.createElement("script")
            script.type = "text/javascript";

            if (script.readyState) {  //IE
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" ||
                        script.readyState == "complete") {
                        script.onreadystatechange = null;
                        if (typeof callback == 'function') {
                            callback();
                        }
                    }
                };
            } else {  //Others
                script.onload = function () {
                    if (typeof callback == 'function') {
                        callback();
                    }
                };
            }

            script.src = url;
            document.body.appendChild(script);
        };

        /**
         * remove all spaces in the text
         * @param str
         */
        this.rmAllSpace = function (str) {
            'use strict';
            return String(str).replace(/\s/g, "");
        };

        /**
         * 手机号码格式验证
         * @param s
         * @returns {boolean}
         */
        this.isMobile = function isMobil(s) {
            'use strict';
            var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
            if (reg.test(s)) {
                return true;
            } else {
                return false;
            }

        };
    }
)
