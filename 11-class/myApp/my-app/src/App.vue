<template>
  <div id="app">
    <ISwitch v-model="onoff"></ISwitch>
    <Page :total="200" :current.sync="current"/>
    <Page :total="200" current="1"/>
    <Select value=''>
      <Option value="1" data="内容1"></Option>
      <Option value="2" data="内容2"></Option>
      <Option value="3" data="内容3"></Option>
      <Option value="4" data="内容4"></Option>
      <Option value="5" data="内容5"></Option>
      <Option value="6" data="内容6"></Option>
    </Select>
    <br>
    <h3>邮箱匹配</h3>
    <Email value=''></Email>
    <br>
    <h3>人名匹配</h3>
    <Search value=''></Search>
    <br>
    <Table striped border hover condensed :colums="head" :data="data"></Table>
    <Icon name="bishop" size="40px" color="red"></Icon>
    <Icon name="home" size="60px" color="blue"></Icon>
    <Icon name="ok" size="20px" color="green"></Icon>
    <Button type='primary'>默认</Button>
    <Button type='success'>成功</Button>
    <Button type='warning'>警告</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onoff: false,
      current: 1,
      head: [
        // <th>标题</th>,
        // <th>标题</th>,
        // <th>标题</th>,
        // <th>标题</th>
        "序号",
        "姓名",
        "年龄",
        "班级"
      ],
      data: [
        {
          num: 1,
          name: "张三",
          age: 33,
          class: "一年级"
        },
        {
          num: 2,
          name: "李四",
          age: 33,
          class: "二年级"
        },
        {
          num: 3,
          name: "老王",
          age: 33,
          class: "三年级"
        }
      ]
    };
  }
};
</script>

<style lang='less' scoped>

</style>
