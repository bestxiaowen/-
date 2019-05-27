import Icon from './components/icon.vue'
import Option from './components/option.vue'
import Table from './components/table.vue'

const comments ={
    Icon,
    Option,
    Table
}

export default {
    install(Vue) {
        Object.keys(comments).forEach((key) => {
            Vue.component(key,comments[key])
        })
    }
}