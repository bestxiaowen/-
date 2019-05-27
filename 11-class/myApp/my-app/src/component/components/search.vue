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
        v-for="(item,index) in searchList"
        :class="{bg:listIndex===index}"
        @mouseover="hover(index,$event)"
        @mouseout="out(index,$event)"
        @click="click(index)"
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
      val: this.value,
      listIndex: 0,
      arr1: ["张三", "李四", "老王", "赵柳", "金科", "张四"]
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
  methods: {
    hover(i, e) {
      //console.log(i);
      //console.log(e.currentTarget);
      e.currentTarget.classList.add("bg");
      //e.currentTarget.className+="bg"
    },
    out(i, e) {
      e.currentTarget.classList.remove("bg");
    },
    down() {
      if (this.listIndex >= this.searchList.length - 1) {
        this.listIndex = 0;
      } else {
        this.listIndex++;
      }
    },
    up() {
      if (this.listIndex == 0) {
        this.listIndex = this.searchList.length - 1;
      } else {
        this.listIndex--;
      }
    },
    enter() {
      this.val = this.searchList[this.listIndex];
      //console.log(this.searchList);
      this.searchList = [];
    },
    click(i) {
      this.val = this.searchList[i];
      //console.log(i);
    }
  },
  computed: {
    searchList: {
      get() {
        var reg = new RegExp(this.val);// eslint-disable-line no-unused-vars
        if (!this.val) return [];
        return this.arr1.filter(item => {
          return new RegExp(this.val).test(item);
        });
      },
      set() {}
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  width: 200px;
  padding: 0;
  margin: 0;
  list-style: none;
  border: 1px solid black;
  border-top: none;
}

li {
  font-size: 20px;
}

.bg {
  background-color: gray;
  color: white;
}

input {
  width: 200px;
  height: 22px;
  border: 1px solid black;
}
</style>