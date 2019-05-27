<template>
  <div>
    <span :style="[{color:color},{fontSize:size}]" :class="['glyphicon',iconName]"></span>
  </div>
</template>

<script>
import "../../assets/bootstrap/dist/css/bootstrap.css";
export default {
  props: {
    name: String,
    size: String,
    color: String
  },
  computed: {
    iconName() {
      return "glyphicon-" + this.name;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>