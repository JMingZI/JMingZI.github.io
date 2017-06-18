class Index {
    
    constructor() {
        this.localKey = 'jmingzi-bg'
        this.separator = 'jmingzi'
        
        this.initBg()
        
        this.initNav()
    }
    
    loadImg(url) {
        return new Promise((resolve, reject)=> {
            const img = new Image()
    
            img.src = url
            img.onload = ()=> {
                resolve(true)
            }
            img.onerror = ()=> {
                reject(false)
            }
        })
    }
    
    async setBgFromLocal(url) {
        let isLoad = await this.loadImg(url)
        
        if (isLoad) {
            const bg = redom.el('div', { style: {
                        width: '100%',
                        height: document.body.clientHeight + 'px'
                    }
                },
                redom.el('img', { src: url, style: {
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    transition: 'opacity .5s',
                    '-webkit-transition': 'opacity .5s'
                }, onload: (e)=> e.target.style.opacity = 1 })
            )
    
            redom.mount(document.body, bg)
        }
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
    
    initNav() {
        const navA = constant.navData.map((item, i)=> {
            return redom.el('a', {
                className: 'display-ib align-middle color-fff px-padding-lr20' + (i !== constant.navData.length - 1 ? ' bd-fff-r' : ''),
                textContent: item.name,
                href: item.url,
                target: '_blank'
            })
        })
        
        const nav = redom.el('div', { className: 'position-a top-nav px-font-14' })
        
        redom.setChildren(nav, navA)
        redom.mount(document.getElementById('-wrap-index'), nav)
    }
    
}

let index = new Index()