<template>
  <div>
    <nav>
      <ul class="pagination">
        <li @click="prve">
          <a href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          :key="item"
          v-for="item in befores"
          @click="iCurrent=item"
          :class="{active:iCurrent===item}"
        >
          <a href="#">{{item}}</a>
        </li>

        <li @click="move">
          <a href="#">...</a>
        </li>

        <li
          :key="item"
          v-for="item in afters"
          @click="iCurrent=item"
          :class="{active:iCurrent===item}"
        >
          <a href="#">{{item}}</a>
        </li>

        <li @click="next">
          <a href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import "../../assets/bootstrap/dist/css/bootstrap.css";
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: [Number,String],
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      iCurrent: this.current
    };
  },
  watch: {
    iCurrent() {
      //this.$emit("update:current", v);
      //console.log(this.iCurrent);
    },
    current(v) {
      this.iCurrent = v;
    }
  },
  computed: {
    page() {
      if (!this.total) return 0;
      return Math.ceil(this.total / this.pageSize);
    },
    pagePercent50() {
      return this.page / 2;
    },
    befores() {
      if (this.iCurrent > this.pagePercent50) {
        return [1];
      }
      const arr = [];
      for (let i = 1; i <= this.iCurrent + 2; i++) {
        arr.push(i);
      }
      return arr;
    },
    afters() {
      if (this.iCurrent <= this.pagePercent50) {
        return [this.page];
      }
      const arr = [];
      for (let i = this.iCurrent - 2; i <= this.page; i++) {
        arr.push(i);
      }
      return arr;
    }
  },
  methods: {
    move() {
      if (this.iCurrent > this.pagePercent50) {
        this.iCurrent -= this.pagePercent50;
      } else if (this.iCurrent <= this.pagePercent50) {
        this.iCurrent += this.pagePercent50;
      }
    },
    prve() {
      this.iCurrent--;
      if (this.iCurrent < 1) {
        this.iCurrent = 1;
      }
    },
    next() {
      this.iCurrent++;
      if (this.iCurrent > this.page) {
        this.iCurrent = this.page;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>