<template>
  <div>
    <div class="text" @click="show=!show">
      <span>{{val}}</span>
      <div class="btn">↓</div>
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      val: this.value,
      show: false,
      list: [],
      listIndex: 0
    };
  },
  watch: {
    val(v) {
      this.$emit("input", v);
    },
    listIndex(v) { // eslint-disable-line no-unused-vars
      //console.log(this.listIndex);
      //console.log(this.model);
      this.val = this.model;
    }
  },
  computed: {
    model() {
      return this.$children[this.listIndex - 1].data;
    }
  },
  mounted() {
    const children = this.$children;// eslint-disable-line no-unused-vars
    //console.log(children);
    //console.log(this.listIndex);
    //console.log(this.show);
    document.addEventListener("keydown", e => {
      if (this.show) {
        //console.log(e.keyCode)
        //console.log(this.listIndex);
        //console.log(this)
        if (e.keyCode === 38) {
          if (this.listIndex <= 1) {
            this.listIndex = this.$children.length;
          } else {
            this.listIndex--;
          }
          //console.log(this.listIndex);
        } else if (e.keyCode === 40) {
          if (this.listIndex === this.$children.length) {
            this.listIndex = 1;
          } else {
            this.listIndex++;
          }
          //console.log(this.listIndex);
        }
        if (e.keyCode === 13) {
          this.$parent.listIndex = this.value;
        }
      }
    });

    // document.addEventListener('mousedown',(e)=>{
    //     if(this.show){
    //         this.show=false
    //     }

    // })

    //}
    // console.log(typeof children)
    // if(typeof children==="object"){
    //     const filter=children.filter(item => item.value)
    //     this.list=filter
    //     console.log(filter)
    //     console.log(typeof filter)
    // }
    //const filter= children.filter(item => item.value===item.listIndex)
    //console.log(children[2].content)
    //console.log(filter)
  },
  methods: {}
};
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