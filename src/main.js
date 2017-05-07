import $ from 'jquery'
import utils from './utils'
// http://joaopereirawd.github.io/animatedModal.js/
import './components/animatedModal'
import './style/index.scss'

const appId = 'eQwIRpI6625dT6h8eibTeGKv-gzGzoHsz'
const appKey = 'OMlds2G9XRScgsOjPP715eQN'
AV.init({ appId, appKey })

class Index {
    init() {
        utils.scrollListen()
        
        this.panel = $(utils.app)
        this.form = $('#form')
        
        this.loginBox()
        this.renderList()
        this.renderSort()
        this.bind()
    }
    
    renderList() {
        const query = new AV.Query('CollectionList')
        query.addDescending('createdAt')
        query.find().then(data=> {
            let maps = {}
            data.map(item=> {
                maps[item.attributes.sort] = maps[item.attributes.sort] || []
                maps[item.attributes.sort].push(item.attributes)
            })
            // console.log(maps)
            
            let str= ''
            Object.keys(maps).map(item=> {
                str += '<div class="app-list"><h1 class="sort-title">'+ item +'</h1>'
                maps[item].map(list=> {
                    str += '<div class="app" data-url="'+ list.url +'">' +
                                '<div class="icon"></div>' +
                                '<div class="description">' +
                                '<p class="name">'+ list.name +'</p>' +
                                '<p class="desc">'+ list.desc +'</p>' +
                                '<p class="author">贡献者:'+ list.user +'</p>' +
                                '</div>' +
                            '</div>'
                })
                str += '</div>'
            })
            
            this.panel.find('.app-list-wrap').html(str)
        })
    }
    
    renderSort() {
        // 查询分类
        const query = new AV.Query('Sort')
        query.find().then(data=> {
            // console.log(data)
            let p = this.form[0].sort
            data.map(item=> {
                $(p).append($('<option/>', { value: item.attributes.name }).text(item.attributes.name))
            })
        })
    }
    
    loginBox() {
        $("#login-btn").animatedModal({
            width: 500,
            height: 440,
            top: ( document.body.clientHeight - 440 ) / 2,
            left: ( document.body.clientWidth - 500 ) / 2,
            modalTarget:'add',
            animatedIn:'bounceInDown',
            animatedOut:'bounceOutDown',
            color:'#fff'
        })
    }
    
    getData() {
        return {
            name: this.form[0].name.value,
            desc: this.form[0].desc.value,
            url: this.form[0].url.value,
            sort: this.form[0].sort.value,
            user: this.form[0].user.value
        }
    }
    
    bind() {
        
        $('body').on('click', '.confirm-btn', e=> {
            e.stopPropagation()
    
            let data = this.getData()
            const collectionList = AV.Object.extend('CollectionList')
            const list = new collectionList()
            
            Object.keys(data).map(item=> {
                list.set(item, data[item])
            })
            
            list.save().then(res=> {
                // console.log(res)
                if (res.id) {
                    $('#btn-close-modal').click()
                    alert('添加成功')
                    this.renderList()
                }
            })
        })
        
        this.panel.on('click', '.app', function(e) {
            e.stopPropagation()
            window.open(this.getAttribute('data-url'))
        })
        
    }
}

const index = new Index()
index.init()
