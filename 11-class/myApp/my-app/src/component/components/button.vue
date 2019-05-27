<template>
    <div>
        <button :class="['btn','btn-'+type]">
            <slot />
        </button>
    </div>
</template>

<script>
    export default {
        props:{
            type:String
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/var.less';
.border(@width:1px,@style:solid,@color:none){
    border-width: @width;
    border-style: @style;
    border-color: @color;
}
.borderRadius{
    border-radius: 50%
}
.btn{
    //.borderRadius();
    .border(2px,solid,black);
    outline: none;
}
.btn-fn(@color;@font-color:black;@font-width:20px){
    background-color: @color;
    color: @font-color;
    font-size: @font-width;
    &:hover{
        //颜色加深20%
        //background-color: darken(@color,20%)
        //颜色变浅20%
        background-color: lighten(@color,20%)
    }
}
.btn-primary{
    .btn-fn(@primary)
}
.btn-warning{
    .btn-fn(@warning,red,30px)
}
.btn-success{
    .btn-fn(@success,black,15px)
}

</style>