// import utils from './utils'
const app = document.getElementById('app')

const utils = {
    scrollListen() {
        const menu = document.querySelector('.app-top-menu')

        app.addEventListener('scroll', (e)=> {
            let dp = (e.target.scrollTop / 100).toFixed(1)
            dp = dp >= 1 ? 0.9 : dp
            menu.style.backgroundColor = 'rgba(33, 33, 33, '+ dp +')'
        })
    }
}

utils.scrollListen()