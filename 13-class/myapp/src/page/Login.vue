<template>
    <div class='page'>
        <Form
            class="login-box"
            :model="form"
            :rules="rules"
            ref="form"
        >
            <FormItem>
                <h1>登录</h1>
            </FormItem>
            <FormItem
                prop='username'
            >
                <Input
                    prefix='md-person'
                    v-model="form.username"
                    placeholder="用户名"
                />
            </FormItem>
            <FormItem
                prop='password'
            >
                <Input
                    type='password'
                    prefix='md-lock'
                    v-model="form.password"
                    placeholder="密码"
                />
            </FormItem>
            <FormItem
                prop='captcha'
            >
                <div class="captcha">
                    <Input
                        prefix='md-image'
                        v-model="form.captcha"
                        placeholder="验证码"
                        class="captcha-input"
                    />
                    <img @click="changeUid" :src="newUid" alt="验证码" class="img">
                </div>
                
            </FormItem>
            <FormItem>
                <Button :loading='loading' @click="login" type="primary">登录</Button>
            </FormItem>
        </Form> 
    </div>
</template>

<script>
    import uuid from 'uuid'
    import {login} from '../api/login';
    export default {
        data(){
            return {
                uid:uuid(),
                loading:false,
                form:{
                    username:'',
                    password:'',
                    captcha:'',
                },
                // 验证规则
                rules:{
                    username:[
                        {required: true,message:'用户名必须'},
                        {min:5,max:16,message:'用户名必须5-16位'}
                    ],
                    password:[
                        {required: true,message:'密码必须'},
                        {min:5,max:16,message:'密码必须5-16位'}
                    ],
                    captcha:[
                        {required: true,message:'验证码必须'},
                        {min:5,max:5,message:'验证码必须5位'}
                    ],
                },
            }
        },
        
        methods: {
            changeUid(){
                this.uid=uuid()
            },
            login(){
                this.$refs['form'].validate( () => {
                    //console.log(valid.parent())
                    this.loading=true;
                    login({
                        ...this.form,
                        uuid:this.uid
                    }).then(res =>{
                        this.loading=false;
                        const {code,msg,token} =res.data
                        if(code===0){
                            localStorage.setItem('token',token)
                            this.$router.push({
                                path:'/sys'
                            })
                        }else{
                            this.$Notice.error({
                                title:'提示',
                                desc:msg
                            })
                            this.changeUid()
                        }
                    })
                })
            }
        },
        computed: {
            newUid(){
                return '/urlload/captcha.jpg?uuid='+this.uid
            },
            //newUid:'/urlload/captcha.jpg?uuid='+this.uid
        },
    }
</script>

<style lang="less" scoped>
.page{
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    .login-box{
        width: 350px;
        height: atuo;
        background-color: #fff;
        padding: 15px;
        border: 1px solid black;
        border-radius: 5px;
        .captcha{
            display: flex;
            justify-content: space-between;
            .captcha-input{
                width: 200px;
            }
            .img{
                width: 90px;
                height: 30px;
            }
        }
    }
}
</style>