import axios from 'axios';

axios.post('/urlload/sys/login',{})

//创建一个请求模板
export const http = axios.create({
    baseURL:'/urlload'
})

// 拦截请求的 每次请求都会经过这个方法
http.interceptors.request.use((option) => {
    // console.log(option.headers.post)
    option.headers.token = localStorage.getItem('token')
    return option
})

// 拦截响应 每次收到响应都会经过这个方法
http.interceptors.response.use((response) => {
    if(response.data.code && response.data.code===401){
        localStorage.removeItem('token')
    }
    return response
})