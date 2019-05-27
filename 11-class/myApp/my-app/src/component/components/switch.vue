<template>
  <div class="switch" @click="change" :class="{bg:check===true}">
    <div class="button" :class="{active:check===true}"></div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      check: this.value
    };
  },
  watch: {
    onoff(v) {
      this.check = v;
    },
    check(v) {
      this.$emit("input", v);
    }
  },
  methods: {
    change() {
      this.check = !this.check;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/css/var.less';
.switch {
  width: 50px;
  height: 22px;
  border-radius: 22px;
  background-color:@primary;
  position: relative;
  cursor: pointer;
  transition: all 0.5s;
  &.bg{
    background-color: gray !important;
  }
  .button {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: all 0.5s;
  &.active{
    left: 30px;
  }
  }
}
</style>