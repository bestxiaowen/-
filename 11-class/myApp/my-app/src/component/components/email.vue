<template>
  <div>
    <input
      type="text"
      v-model="val"
      @keydown.down.prevent="down"
      @keydown.up.prevent="up"
      @keydown.enter="enter"
    >
    <ul>
      <li
        :key="item"
        :class="{bg:listIndex==index}"
        v-show=" val !== '' "
        v-for="(item,index) in arr1"
        @click="change(index)"
        @mouseover="hover(index,$event)"
        @mouseout="out(index,$event)"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      arr: ["@qq.com", "@163.com", "@126.com", "@xiaowen.com", "@web.com"],
      listIndex: 0,
      val: this.value
    };
  },

  watch: {
    value(v) {
      this.val = v;
    },
    val(v) {
      this.$emit("input", v);
    }
  },
  computed: {
    arr1() {
      if (!this.val) return [];
      if (/@/.test(this.val)) return [];
      return this.arr.map(item => {
        return this.val + item;
      });
    }
  },
  methods: {
    change(i) {
      //console.log(this.arr1[i]);
      //console.log(i);
      this.val = this.arr1[i];
      //console.log(this.arr1);
    },
    hover(i, e) {
      e.currentTarget.classList.add("bg");
    },
    out(i, e) {
      e.currentTarget.classList.remove("bg");
    },
    down() {
      this.listIndex++;
      if (this.listIndex >= this.arr1.length) {
        this.listIndex = 0;
      }
    },
    up() {
      this.listIndex--;
      if (this.listIndex < 0) {
        this.listIndex = this.arr1.length - 1;
      }
    },
    enter() {
      this.val = this.arr1[this.listIndex];
    }
  }
};
</script>

<style lang="less" scoped>
ul{
    width: 200px;
    padding: 0;
    margin: 0;
    list-style: none;
    border: 1px solid black;
    border-top: none;
}
li{
    font-size: 20px;
}
.bg{
    background-color: gray;
    color: white;
}
input{
    width: 200px;
    height: 22px;
    border: 1px solid black;
}
</style>