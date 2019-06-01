/**
 * 
 * 获取管理员列表
 */
import { http } from './http'

export function getUserList(params) {
    return http.get('/sys/user/list',params)
}