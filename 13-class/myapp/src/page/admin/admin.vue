<template>
    <div class="layout">
        <Layout>
            <Header class="header">
                111
            </Header>
            <Layout class="center">
                <Sider class="sider">
                    <Menu
                        theme="light"
                        width="atuo"
                    >
                        <div v-for="item in menuList" :key="item.menuId">
                            <Submenu
                                :name="item.name"
                                v-if="item.type===0"
                            >
                                <template slot="title">
                                    {{item.name}}
                                </template>
                                <MenuItem 
                                    :name="child.name"
                                    v-for="child in item.children"
                                    :key="child.menuId"
                                >
                                    <div @click="goto(child)">
                                        {{child.name}}
                                    </div>
                                </MenuItem>
                            </Submenu>
                        </div>

                    </Menu>

                </Sider>
                <Content class="content">
                    <router-view></router-view>
                </Content>
            </Layout>
            <Footer class="footer">444</Footer>

        </Layout>
    </div>
</template>

<script>
    import { getMenuList } from '../../api/getMenuList'
    import { deepMenu } from '../../method/deepMenu';
    export default {
        data() {
            return {
                menu:[]
            }
        },
        beforeCreate () {
            getMenuList().then(res => {
                // 请求到的菜单放入组件变量成员中
                this.menu = res.data
                //console.log(res)
                //console.log(this.menu)
            })
        },
        computed: {
            menuList(){
                return deepMenu(this.menu,0)
            }
        },
        methods: {
            goto(child){
                //console.log(child)
                this.$router.push({
                    path:`/${child.url}`
                })
                //console.log(child.url)
            }
        },
    }
</script>

<style lang="less" scoped>
.layout{
    width: 100vw;
    height: 100vh;
    display: flex;
    .header{
        width: 100%;
        height: 15%;
        background-color: #fff;
    }
    .center{
        width: 100%;
        background-color: #ffc;
        flex: 1;
        overflow: auto;
        .content{
            padding: 10px;
        }
    }
    .footer{
        width: 100%;
        height: 15%;
        background-color: #fff;
    }
}
</style>