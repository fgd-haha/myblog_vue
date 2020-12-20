<template>
    <div>
        <!--登录按钮-->
        <el-row v-if=!logined>
            <div class="flex_center" @click="login()">
                <img src="@/assets/GitHub-Mark-32px.png" :onerror="errorUserPhoto"/>
                <el-button class="login_text" type="text">登录</el-button>
            </div>
        </el-row>

        <el-row v-if=logined>
            <el-col :span="2">
                <el-popover
                    placement="right"
                    trigger="click">
                    <img :src=guest.img :onerror="errorUserPhoto" @error="defaultImgs()">
                    <img :src=guest.img width="50px" slot="reference" :onerror="errorUserPhoto">
                </el-popover>
            </el-col>
            <el-col class="flex_center" :span="20">
                {{ guest.nick }}
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['logined', 'article_id', 'baseurl', 'guest'],
    data() {
        return {
            errorUserPhoto: this.GLOBAL.errorUserPhoto,
        }
    },
    methods: {
        login: function () {
            axios.get(this.baseurl + 'api/oauth/login/?state=' + this.article_id)
                .then(response => {
                    console.log(response.data);
                    window.location.href = response.data.url;
                }).catch(error => {
                console.log(error);
                alert('获取login_url失败');
            });
        },
    }
}
</script>

<style>
.login_text {
    font-size: large;
    color: black;
}
</style>
