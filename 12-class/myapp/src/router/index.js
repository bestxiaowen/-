import Vue from 'vue'
import VueRouter from 'vue-router'

import IIndex from '../view/index.vue';
import Commodity from '../view/commodity.vue';
import NotFound from '../view/notfond.vue'


Vue.use(VueRouter)

export default new VueRouter({
    model:'history',
    routes:[
        {
            path:'/',
            component:IIndex
        },
        {
            path:'/commodity/:id',
            component:Commodity
        },
        {
            path:'/404',
            component:NotFound
        },
        {
            path:'*',
            redirect:'/404'
        }
        
    ]
})









