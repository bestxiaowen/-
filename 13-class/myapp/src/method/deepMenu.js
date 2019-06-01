/**
 * 
 * 递归菜单
 */


export function deepMenu(menu,parentId){
    if(Array.isArray(menu)){
        return menu.filter(item =>{
            if(item.parentId===parentId){
                item.children = deepMenu(menu,item.menuId)
                return true
            }
        })
    }
}