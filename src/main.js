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
        this.sort = {}
        
        this.loginBox()
        this.renderSort()
        this.bind()
    }
    
    renderList() {
        Object.keys(this.sort).map(item=> {
            this.sort[item] = []
        })
        
        const query = new AV.Query('CollectionList')
        query.addDescending('createdAt')
        query.find().then(data=> {
            let value
            data.map(item=> {
                value = item.attributes
                value.id = item.id
                this.sort[value.sort].push(value)
            })
            // console.log(maps)
            
            let str= ''
            Object.keys(this.sort).map(item=> {
                str += '<div class="app-list"><h1 class="sort-title">'+ item +'</h1>'
                this.sort[item].map(list=> {
                    str += '<div class="app" data-url="'+ list.url +'" id="'+ list.id +'">' +
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
                this.sort[item.attributes.name] = []
                $(p).append($('<option/>', { value: item.attributes.name }).text(item.attributes.name))
            })
            this.renderList()
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
    
    getDetail(id) {
        const query = new AV.Query('CollectionList')
        query.get(id).then(res=> {
            let data = res.attributes
            for(let name in data) {
                this.form[0][name].value = data[name]
            }
        })
    }
    
    bind() {
        let me = this
        
        $('body').on('click', '.confirm-btn', e=> {
            e.stopPropagation()
    
            let data = this.getData(),
                id = $('body').attr('id'),
                list = null
            
            if (id) {
                list = AV.Object.createWithoutData('CollectionList', id)
            } else {
                const collectionList = AV.Object.extend('CollectionList')
                list = new collectionList()
            }
            Object.keys(data).map(item=> {
                list.set(item, data[item])
            })
            list.save().then(res=> {
                $('body').removeAttr('id')
                if (res.id) {
                    $('#btn-close-modal').click()
                    this.renderList()
                }
            })
        })
        
        this.panel.on({
            click: function(e) {
                e.stopPropagation()
                window.open(this.getAttribute('data-url'))
            }
        }, '.app')
        
        this.panel.on('click', '.icon', function(e) {
            e.stopPropagation()
            $('#login-btn').click()
            
            let id = $(this).parent().attr('id')
            $('body').attr('id', id)
            me.getDetail(id)
        })
    }
}

const index = new Index()
index.init()
