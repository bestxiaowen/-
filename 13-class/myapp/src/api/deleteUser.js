/**
 * 
 * 删除管理员
 */

import { http } from './http'

export function deleteUser(data){
    return http.post('/sys/user/delete',data)
}