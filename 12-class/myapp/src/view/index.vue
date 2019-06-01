<template>
  <div id="app">
    <!-- <Layout class="index-layout">
      <Header class="header"></Header>
      <Layout class="layout">
        <Sider class="sider">
          <router-link to="/view/commodity" :key='item.id' v-for="item in arr">{{item.msg}}</router-link>
        </Sider>
        <Content class="content">222</Content>
      </Layout>
      <Footer class="footer">111</Footer>
    </Layout>-->
    <Layout class="weap">
      <Header class="header">Header</Header>
      <Layout class="center">
        <Sider hide-trigger class="sider">
          <ul>
            <li 
              :key='item.id' 
              v-for="item in arr1" 
              class="sider-list" 
              @click="goDetail(item)"
            >
              {{item.msg}}
            </li>
          </ul>
          
        </Sider>
        <Content class="content">
          <div class="head-list">
            <router-link class="list" to="/commodity" :key='index' v-for="(item,index) in arr2">{{item.msg}}</router-link>
          </div>
        </Content>
      </Layout>
      <Footer class="footer">
        Footer
        <router-link to="/commodity">1111</router-link>
      </Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr1: [
        {
          id: 1,
          msg: "电子商品"
        },
        {
          id: 2,
          msg: "家具"
        },
        {
          id: 3,
          msg: "水果"
        },
        {
          id: 4,
          msg: "玩具"
        },
        {
          id: 5,
          msg: "服饰"
        }
      ],
      arr2:[
        {
          id:1,
          msg:'秒杀'
        },
        {
          id:1,
          msg:'优惠券'
        },
        {
          id:1,
          msg:'会员'
        },
        {
          id:1,
          msg:'闪购'
        },
        {
          id:1,
          msg:'拍卖'
        },
        {
          id:1,
          msg:'京东时尚'
        },
        {
          id:1,
          msg:'京东超市'
        }
      ]
    };
  },
  methods: {
    goDetail(item){
        console.log(this.$route)
      this.$router.push({
        path:"/commodity/"+item.id,
        query:{}
      })
    }
  }
};
</script>

<style lang='less' scoped>
.weap {
  width: 100vw;
  height: 100vh;
  .header {
    height: 20%;
    background-color: red;
    color: black;
    font-size: 30px
  }
  .center {
    color: black;
    .sider{
      width: 20%;
      .sider-list{
        display: block;
        font-size: 30px;

      }
    }
    .content{
      .head-list{
        height: 30px;
        background-color: palevioletred;
        .list{
          padding: 0 15px;
          margin-top: 0;
          color: black;
          font-size: 20px;
          line-height: 30px;
          display: inline-block;
        }
      }
    }
  }
  .footer {
    height: 20%;
    background-color: green;
    color: black;
    font-size: 30px
  }
}
</style>
