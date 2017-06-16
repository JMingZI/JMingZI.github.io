'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Index = function () {
    function Index() {
        _classCallCheck(this, Index);

        this.localKey = 'jmingzi-bg';
        this.separator = 'jmingzi';

        this.initBg();
    }

    _createClass(Index, [{
        key: 'setBgFromLocal',
        value: function setBgFromLocal(url) {
            var bg = redom.el('div', {
                style: {
                    width: '100%',
                    height: document.body.clientHeight + 'px'
                }
            }, redom.el('img', { src: url, style: { width: '100%', height: '100%' } }));

            redom.mount(document.body, bg);
        }
    }, {
        key: 'setBgFromRandom',
        value: async function setBgFromRandom() {
            var res = await resource.getBg();
            if (localStorage) {
                localStorage.setItem(this.localKey, String(+new Date()) + this.separator + res.url);
            }

            this.setBgFromLocal(res.url);
        }
    }, {
        key: 'initBg',
        value: function initBg() {
            if (window.localStorage) {
                var local = localStorage.getItem(this.localKey),
                    timeDiff = void 0;

                if (local) {
                    local = local.split(this.separator);
                    timeDiff = +new Date() - Number(local[0]);

                    if (timeDiff / 3600 <= 12) {
                        // 12h update
                        this.setBgFromLocal(local[1]);
                        return;
                    }
                }
            }

            this.setBgFromRandom();
        }
    }]);

    return Index;
}();

var index = new Index();