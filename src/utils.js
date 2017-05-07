export default {
    app: document.getElementById('app'),
    scrollListen() {
        const menu = document.querySelector('.app-top-menu')
        
        this.app.addEventListener('scroll', (e)=> {
            let dp = (e.target.scrollTop / 100).toFixed(1)
            dp = dp >= 1 ? 1 : dp
            menu.style.backgroundColor = 'rgba(0, 0, 0, '+ dp +')'
        })
    }
}
