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
    }
)
