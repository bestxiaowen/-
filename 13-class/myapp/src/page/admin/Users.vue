<template>
    <div>
        <router-view></router-view>
        <Button type="primary" @click="modal1 = true">新增管理员</Button>
        <Layout>
        <Modal
            v-model="modal1"
            title="新增管理员"
            @on-ok="ok"
            @on-cancel="cancel"
        >
            <Form
                :model='msg'
            >
                <FormItem prop='username'>
                    <Input v-model="msg.username" placeholder="账号"/>
                </FormItem>
                <FormItem prop='password'>
                    <Input v-model="msg.password" placeholder="密码"/>
                </FormItem>
                <FormItem prop='email'>
                    <Input v-model="msg.email" placeholder="邮箱"/>
                </FormItem>
                <FormItem prop='mobile'>
                    <Input v-model="msg.mobile" placeholder="手机号"/>
                </FormItem>
                
            </Form>
        </Modal>
        </Layout>
        <Table :columns="columns1" :data="data1"></Table>

    </div>
</template>

<script>
    import { addUser } from '../../api/addUser'
    import { getUserList } from '../../api/getUserList'
    export default {
        data(){
            return {
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'email',
                        key: 'email'
                    },
                    {
                        title: 'mobile',
                        key: 'mobile'
                    }
                ],
                data1: [
                    {
                        name: '11',
                        email: '11',
                        mobile: '222'
                    },
                ],
                modal1: false,
                data:[],
                msg:{
                    username:'',
                    password:'',
                    email:'',
                    mobile:'',
                },
                // rules: {
                //     username: [
                //         { required: true, message: "用户名必须" },
                //         { min: 5, max: 18, message: "用户名必须6-18位" },
                //     ],
                //     password: [
                //         { required: true, message: "密码必须" },
                //         { min: 5, max: 18, message: "用户名必须6-18位" },
                //     ],
                //     captcha: [
                //         { required: true, message: "验证码必须" },
                //         { min: 5, max: 5, message: "验证码必须5位" },
                //     ]
                // }
                list:[]
            }
        },
        methods: {
            ok(){
            //增添管理员
                addUser({
                    "userId":1,
                    "username":this.msg.username,
                    "password":this.msg.password,
                    "email":this.msg.email,
                    "mobile":this.msg.mobile,
                    "status": 0,
                    "roleIdList": [
                     0
                    ]
                }).then(res => {
                    console.log(res)
                    if(res.data.code===500){
                        getUserList({
                            page: 1,
                            limit: 10,
                            sidx: 'userId',
                            order: 'desc',
                        }).then(res =>{
                            console.log(res)
                        })
                    }
                })
                
            },
            cancel(){
                console.log(this.msg)
            }
        },
        beforeCreate () {
            //获取管理员列表
            getUserList({
                page: 1,
                limit: 10,
                sidx: 'userId',
                order: 'desc',
            }).then(res =>{
                console.log(res)
            })
        }
        
    }
</script>

<style lang="scss" scoped>

</style>