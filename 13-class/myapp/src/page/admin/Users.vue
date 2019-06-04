<template>
    <div class="weap">
        
        <Input
            placeholder="搜索"
            search
            class="search"
            @on-search="handleSearch"
        />
        <Button
            type="primary"
            @click="showModal = true,modalTitle='新增管理员'"
        >新增管理员</Button>
        <Layout>
        <Modal
            v-model="showModal"
            :title="modalTitle"
            @on-ok="handleSubmit"
            @on-cancel="handleCancle"
        >
            <Form
                :model="form"
                :rules="rules"
                ref="form"
            >
                <FormItem prop='username' label="账号" :label-width="60">
                    <Input v-model="form.username" placeholder="账号"/>
                </FormItem>
                <FormItem prop='password' label="密码" :label-width="60">
                    <Input v-model="form.password" placeholder="密码"/>
                </FormItem>
                <FormItem prop='email' label="邮箱" :label-width="60">
                    <Input v-model="form.email" placeholder="邮箱"/>
                </FormItem>
                <FormItem prop='mobile' label="手机" :label-width="60">
                    <Input v-model="form.mobile" placeholder="手机号"/>
                </FormItem>
                <FormItem prop='status' label="状态" :label-width="60">
                    <iSwitch
                        :true-value=1
                        :false-value=0
                        v-model="form.status"
                    />
                </FormItem>
            </Form>
            <template slot="footer">
                <Button @click="handleCancle">取消</Button>
                <Button type="primary" @click="handleSubmit">确认</Button>
            </template>
        </Modal>
        </Layout>
        <Table @on-selection-change='handleSelectChange' :loading="loading" :columns="columns" :data="data" ></Table>
        <div class="footer1">
            <Button :disabled='selectList.length===0' @click='handleDelect' type="error">批量删除</Button>
            <Page
                :current.sync="currPage"
                :total="totalCount"
                show-sizer
                :page-size="pageSize"
                @on-page-size-change="handlePageSizeChange"
                :page-size-opts="[5, 10, 15]"
            /> 
        </div>
        <Tag color='primary' type='dot'>启用</Tag>

    </div>
</template>

<script>
    import { addUser } from '../../api/addUser'
    import { updateUser } from '../../api/aditUser'
    import { getUserList } from '../../api/getUserList'
    import { deleteUser } from '../../api/deleteUser'
    import UserTools from '../../components/UserTools.vue';
    import validator from 'validator';
    export default {
        data(){
            return {
                columns: [
                    {
                        type: 'selection',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '#',
                        key: 'userId',
                        width:150,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'username',
                        align: 'center',
                        width:180,
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        width:180,
                        align: 'center',
                    },
                    {
                        title: '手机号',
                        key: 'mobile',
                        width:210,
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width:120,
                        align: 'center',
                        render:(h,parmas) => h('Tag',{
                            props: {
                                type:'dot',
                                color: parmas.row.status===0? 'primary' :'warning'
                            }
                        }, parmas.row.status===0 ? '启用':'禁用')
                        
                    },
                    {
                        title: '创建人',
                        key: 'createUserId',
                        align: 'center',
                        width:130,
                    },
                    {
                        title: '创建事件',
                        key: 'createTime',
                        align: 'center',
                        width:160,
                    },
                    {
                        title: '操作',
                        render:(h,parmas) => h(UserTools,{
                            on:{
                                edit: () => {
                                    // console.log(parmas)
                                    this.modalTitle='修改管理员'
                                    this.showModal=true
                                    const { userId,roleIdList,email,mobile,status,username } =parmas.row
                                    this.form={
                                        email,
                                        mobile,
                                        password:'',
                                        status,
                                        username,
                                        roleIdList,
                                        userId
                                    }
                                },
                                del: () => {
                                    const { userId,username } =parmas.row
                                    this.$Modal.confirm({
                                        title:'警告',
                                        content:`您正在删除${username}，是否确认删除`,
                                        onOk: () =>{
                                            deleteUser([userId]).then(res => {
                                                if(res.data.code===0){
                                                    this.$Notice.success({
                                                        title:'提示',
                                                        desc:'删除成功'
                                                    })
                                                    this.getList()
                                                }else{
                                                    this.$Notice.error({
                                                        title:'提示',
                                                        desc:'删除失败'
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    },
                ],
                // 模态框数据
                form: {
                    username: '',
                    userId: 0,
                    password: '',
                    email: '',
                    mobile: '',
                    status: 1,
                    roleIdList: [],
                },
                // 模态框验证规则
                rules: {
                    username: [
                        { required: true, message: "用户名必须" },
                        { min: 5, max: 18, message: "用户名必须6-18位" },
                    ],
                    password: [
                        { min: 5, max: 18, message: "用户名必须6-18位" },
                    ],
                    email: [
                        { required: true, message: "邮箱必须" },
                        {
                            validator: (rule,value,callback) => {
                                if (!validator.isEmail(value)) {
                                    callback(new Error('邮箱格式不正确'))
                                }else{
                                    callback()
                                }
                            },
                            msg:'邮箱格式不正确'
                        }
                    ],
                    mobile: [
                        { required: true, message: "手机号必须" },
                        {
                            validator:(rule,value,callback) => {
                                if(!validator.isMobilePhone(value)){
                                    callback(new Error('电话格式不正确'))
                                }else{
                                    callback()
                                }
                            },
                            msg:'手机格式不正确'
                        }
                    ],
                },
                //list:[],

                // 加载状态
                loading:false,
                // 表体数据
                data: [],
                // 当前页码
                currPage: 1,
                // 每页多少条
                pageSize: 10,
                // 总条数
                totalCount: 1,
                // 总页数
                totalPage: 1,
                // 搜索用户名
                username: '',
                // 模态框状态
                showModal:false,
                // 模态框标题
                modalTitle:'',
                // 批量删除数组
                selectList:[]

            }
        },
        watch:{
            username(){
                this.getList()
            },
            currPage(){
                this.getList()
            },
            pageSize(){
                this.getList()
            }
        },
        created () {
            this.getList()
        },
        methods: {
            //模态框确定
            handleSubmit(){
                this.$refs.form.validate((valid) => {
                    if(valid){
                        if(this.modalTitle==='新增管理员'){
                            addUser(this.form).then(res => {
                                // console.log(res)
                                if(res.data.code===0){
                                    this.$Notice.success({
                                        title:'提示',
                                        desc:'添加成功'
                                    })
                                    this.getList()
                                    this.handleCancle()
                                }else{
                                    this.$Notice.error({
                                        title:'提示',
                                        desc:'添加失败'
                                    })
                                }
                            })
                        }else if (this.modalTitle==='修改管理员'){
                            updateUser(this.form).then(res => {
                                // console.log(res)
                                if(res.data.code===0){
                                    this.$Notice.success({
                                        title:'提示',
                                        desc:'修改成功'
                                    })
                                    this.getList()
                                    this.handleCancle()
                                }else{
                                    this.$Notice.error({
                                        title:'提示',
                                        desc:'修改失败'
                                    })
                                }
                            })
                        }
                    }
                })
                
            },
            //模态框取消
            handleCancle(){
                this.showModal=false
                this.$refs.form.resetFields()
            },
            /**
             * 获取用户列表
             */
            getList(){
                //获取管理员列表
                const { currPage, pageSize, username } = this;
                this.loading = true
                getUserList({
                    page: currPage,
                    limit: pageSize,
                    sidx: 'userId',
                    order: 'desc',
                    username: username,
                }).then(res => {
                    // console.log(res)
                    const { code, page } = res.data
                    this.loading = false
                    if (code === 0) {
                        const { currPage, list, pageSize, totalCount, totalPage } = page
                        this.currPage = currPage;
                        this.data = list;
                        this.pageSize = pageSize;
                        this.totalCount = totalCount;
                        this.totalPage = totalPage;
                    } 
                })
            },
            /**
             * 处理页码改变
             */
            handlePageSizeChange(pageSize) {
                this.pageSize = pageSize
            },

            /**
             * 处理搜索
             */
            handleSearch(username) {
                // console.log(e)
                this.username = username
            },

            handleSelectChange(select){
                this.selectList=select.map(item => item.userId)
            },

            handleDelect(){
                if(this.selectList.length>0){
                    this.$Modal.confirm({
                        title:'提示',
                        content:`是否删除${this.selectList.length}位管理员`,
                        onOk: () =>{
                            deleteUser(this.selectList).then(res => {
                                if(res.data.code===0){
                                    this.$Notice.success({
                                        title:'提示',
                                        desc:'删除成功'
                                    })
                                    this.getList()
                                }else{
                                    this.$Notice.error({
                                        title:'提示',
                                        desc:'删除失败'
                                    })
                                }
                            })
                        }
                    })
                }
            }
        },
        
        
        
        
    }

</script>

<style lang="less" scoped>
.weap{
    overflow: auto;
    .search{
        width: 200px;
        margin: 15px;
    }
    .footer1{
        display: flex;
        justify-content: space-between;
    }
}

</style>