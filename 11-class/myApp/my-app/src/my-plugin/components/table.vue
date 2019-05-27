<template>
  <div>
    <table
      :class="['table',{
                        'table-striped':striped,
                        'table-bordered':border,
                        'table-hover':hover,
                        'table-condensed':condensed
                    }]"
    >
      <tbody>
        <tr>
          <th :key="index" v-for="(item,index) in colums">{{item}}</th>
        </tr>
        <tr :key="index" v-for="(item,index) in data">
          <td :key="index" v-for="(data,index) in item">{{data}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import "../../assets/bootstrap/dist/css/bootstrap.css";
export default {
    props:{
                striped:Boolean,
                border:Boolean,
                hover:Boolean,
                condensed:Boolean,
                // colums:{
                //     validator(value){
                //         return typeof value==='object' 
                //     }
                // },
                colums:[Object,Array],
                data:Array
            },
};
</script>

<style lang="less" scoped>
</style>