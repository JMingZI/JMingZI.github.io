((win)=> {
    
    win.resource = {
        getBg() {
            // https://github.com/xcss/bing
            return new Promise((resolve, reject)=> {
                win.cb = (res)=> {
                    if (res.status.code === 200) {
                        resolve(res.data)
                    } else {
                        reject(res)
                    }
                }
                
                const script = redom.el('script', { src: 'https://bing.ioliu.cn/v1?callback=cb' })
                redom.mount(document.body, script)
            })
            
            
        }
    }
    
})(window)