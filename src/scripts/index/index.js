class Index {
    
    constructor() {
        this.localKey = 'jmingzi-bg'
        this.separator = 'jmingzi'
        
        this.initBg()
    }
    
    setBgFromLocal(url) {
        const bg = redom.el('div', {
                style: {
                    width: '100%',
                    height: document.body.clientHeight + 'px'
                }
            },
            redom.el('img', { src: url, style: { width: '100%', height: '100%' } }))
        
        redom.mount(document.body, bg)
    }
    
    async setBgFromRandom() {
        let res = await resource.getBg()
        if (localStorage) {
            localStorage.setItem(this.localKey, String(+new Date) + this.separator + res.url)
        }
        
        this.setBgFromLocal(res.url)
    }
    
    initBg() {
        if (window.localStorage) {
            let local = localStorage.getItem(this.localKey),
                timeDiff
            
            if (local) {
                local = local.split(this.separator)
                timeDiff = +new Date - Number(local[0])
    
                if (timeDiff / 3600 <= 12) {
                    // 12h update
                    this.setBgFromLocal(local[1])
                    return
                }
            }
        }
        
        this.setBgFromRandom()
    }
    
}

let index = new Index()