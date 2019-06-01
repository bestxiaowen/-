import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../page/Login.vue'
import UsersPage from '../page/admin/Users.vue'
import WelcomePage from '../page/admin/welcome.vue'
import AdminPage from '../page/admin/admin.vue'




Vue.use(VueRouter)

const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/sys'
        },
        {
            path:'/sys',
            component:AdminPage,
            meta:{
                auth_login:true
            },
            children:[
                {
                    path:'/',
                    alias: 'index',
                    component:WelcomePage,
                    meta:{
                        auth_login:true
                    },
                },
                {
                    path:'user',
                    component:UsersPage,
                    meta:{
                        auth_login:true
                    },
                },
                
                
            ]
        },
        {
            path:'/login',
            component:LoginPage
        },
        
    ]
    
})

/**
 * 如果需要双层验证登录  ？？？？？
 * 
 * 
 */
router.beforeEach((to, from, next) => {
    // 验证登录
    if(to.meta.auth_login){
        
        if(localStorage.getItem('token')){ // 如果已经登录
            next()

        }else{ // 如果没有登录
            next({ // 跳转登录页面
                path:'/login'
            })
        }
    // 不需要验证登录直接放行
    }else{
        next()
    }
})

export default router