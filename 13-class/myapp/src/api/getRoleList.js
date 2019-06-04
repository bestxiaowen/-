/**
 * 
 * 获取菜单列表
 */

import { http } from './http'

export function getRoleList(params){
    return http.get('/sys/role/list',{params})
}