import Email from './components/email.vue'
import Search from './components/search.vue'
import Select from './components/select.vue'
import ISwitch from './components/switch.vue'
import Page from './components/分页.vue'
import Button from './components/button.vue'

const comments ={
    Email,
    Search,
    Select,
    ISwitch,
    Page,
    Button
}

export default {
    install(Vue) {
        Object.keys(comments).forEach((key) => {
            Vue.component(key,comments[key])
        })
    }
}