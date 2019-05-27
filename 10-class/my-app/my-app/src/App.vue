<template>
  <div id="app">
      <Button class='btn'>111</Button>
  </div>
</template>

<script>
import Button from './components/Button.vue'

export default {
  name: 'app',
  components: {
    Button
  }
}
</script>

<style lang='less' scoped>
.btn{
  background-color: red;
}
</style>
