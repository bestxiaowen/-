<template>
    <div class="weap">
        <Input
            placeholder="搜索角色"
            search
            class="search"
        />
        <Button
            type="primary"
            @click="showModel=true,modelTitle='添加角色'"
        >
        添加角色
        </Button>
        <Modal
            v-model="showModel"
            :title="modelTitle"
        >
            <Form
                :model='form'
            >
                <FormItem :label-width="60" label="角色名称" prop="roleName">
                    <Input v-model="form.roleName" placeholder="角色名称" />
                </FormItem>

                <FormItem :label-width="60" label="备注" prop="roleName">
                    <Input v-model="form.remark" placeholder="备注" />
                </FormItem>

            </Form>
        </Modal>

        <Table :columns="columns" :data="data"></Table>


    </div>
</template>

<script>
    import {getRoleList} from '../../api/getRoleList'
    export default {
        data() {
            return {
               
                // 表单数据对象
                form:{
                    roleId: 0,
                    roleName: "",
                    remark: "",
                    menuIdList: []
                },
                // 表单行
                columns:[
                    {
                        title: 'ID',
                        key: 'roleId'
                    },
                    {
                        title: '角色名称',
                        key: 'roleName'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '操作',

                    }
                ],
                // 表体数据
                data:[],
                // 当前页码
                currPage:1,
                // 每页多少条
                pageSize: 10,
                // 总条数
                totalCount:1,
                // 总页数
                totalPage: 1,
                // 搜索角色
                rolename:'',
                // 模态框显示状态
                showModel:false,
                // 模态框标题
                modelTitle:'',
                // 批量删除数组
                selectDel:[],


            }
        },
        methods: {
            getRoles(){
                const { currPage,pageSize,rolename } = this
                getRoleList({
                    page:currPage,
                    limit:pageSize,
                    sidx:'roleId',
                    order:'desc',
                    roleName:rolename
                }).then(res => {
                    console.log(res)
                })
            }
        },
        created() {
            this.getRoles()
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
    
}
</style>