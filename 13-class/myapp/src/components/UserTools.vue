<template>
    <div>
        <Button type="success" size='small' @click="$emit('edit')">编辑</Button>
        <Button type="error" size='small' @click="$emit('del')">删除</Button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>