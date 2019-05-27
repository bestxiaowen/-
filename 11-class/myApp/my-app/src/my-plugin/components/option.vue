<template>
    <div
    :class="['option',{bg:$parent.listIndex.toString()===value}]"
    v-if="show"
    @click.stop="click"
  >{{data}}</div>
</template>

<script>
    import "../../assets/css/var.less"
    export default {
        props:{
                value:[Number,String],
                data:String,
            },
            computed: {
                  show(){
                      return this.$parent.show
                  },
                  content(){
                      return this.data
                  }
            },
            methods: {
                click(){
                    // console.log(this.$parent.listIndex)
                    // console.log(typeof this.$parent.listIndex.toString())
                    // console.log(this.value)
                    // console.log(typeof this.value)

                    this.$parent.listIndex=this.value
                    this.$parent.show=!this.$parent.show
                    // console.log(typeof this.$parent.listIndex)
                },
                
            },
    }
</script>

<style lang="less" scoped>
  
  .text {
    width: 250px;
    height: 30px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
  }
  .option {
    width: 250px;
    height: 28px;
    border: 1px solid black;
    border-top: none;
  }
  .btn {
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 0;
  }
  .bg {
    background-color: gray;
    color: white;
  }
</style>