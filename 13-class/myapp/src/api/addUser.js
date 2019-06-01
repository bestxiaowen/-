/**
 * 
 * 添加管理员
 */

 import { http } from './http'

 export function addUser(data){
     return http.post('/sys/user/save',data)
 }