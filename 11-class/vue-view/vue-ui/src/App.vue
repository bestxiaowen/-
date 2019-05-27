<template>
  <div id="app">
    <Button type="primary" icon="ios-person">按钮</Button>
    <Button type="success">按钮</Button>
    <Switch v-model="switch1" @on-change="change"/>
    <Page :total="100" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      switch1: false
    };
  },
  methods: {
    change(status) {
      this.$Message.info("开关状态：" + status);
    }
  }
};
</script>

<style>
</style>
