'use strict';

(function (win) {

    win.resource = {
        getBg: function getBg() {
            // https://github.com/xcss/bing
            return new Promise(function (resolve, reject) {
                win.cb = function (res) {
                    if (res.status.code === 200) {
                        resolve(res.data);
                    } else {
                        reject(res);
                    }
                };

                var script = redom.el('script', { src: 'https://bing.ioliu.cn/v1?callback=cb' });
                redom.mount(document.body, script);
            });
        }
    };
})(window);