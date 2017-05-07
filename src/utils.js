export default {
    app: document.getElementById('app'),
    scrollListen() {
        const menu = document.querySelector('.app-top-menu')
        
        this.app.addEventListener('scroll', (e)=> {
            let dp = (e.target.scrollTop / 100).toFixed(1)
            dp = dp >= 1 ? 0.9 : dp
            menu.style.backgroundColor = 'rgba(33, 33, 33, '+ dp +')'
        })
    }
}
