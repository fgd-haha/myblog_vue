<template>
    <!--博客时间，阅读，评论数-->
    <el-row class="flex_center" type="flex" justify="end">
        <i class="el-icon-date"></i>&nbsp{{create_time}}&nbsp&nbsp
        <i class="el-icon-view"></i>&nbsp{{click_nums}}&nbsp&nbsp
<!--        <i class="el-icon-s-comment"></i>&nbsp{{comments_num}}&nbsp&nbsp-->
        <vue-svg-icon name="comments2" :scale="1.5"></vue-svg-icon>
        &nbsp{{comments_num}}
    </el-row>
</template>

<script>
    export default {
        props: ['create_time', 'click_nums', 'comments_num']
    }
</script>

<style>
    .flex_center{
        display: flex;
        align-items: center;
    }
</style>
