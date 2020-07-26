<template>
    <div class="top">
        <el-row>
            <el-col class="character" :span=4>范国栋的博客</el-col>
            <el-col :span=20>
                <el-menu class="menu" :default-active="$route.path" :router="true" mode="horizontal">
                    <el-menu-item index="1" :route="{ name: 'articles'}" @click="reload">首页</el-menu-item>

                    <el-submenu index="2">
                        <template slot="title">分类</template>
                        <div v-for="classification in this.classifications">
                            <el-menu-item :index="'2-' + classification.id"
                                          :route="{ name: 'articles', query: {classificationid: classification.id }}"
                                          @click="reload">
                                {{classification.name}}
                            </el-menu-item>
                        </div>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">标签</template>
                        <div v-for="tag in this.tags">
                            <el-menu-item :index="'3-' + tag.id"
                                          :route="{ name: 'articles', query: { tagid: tag.id}}"
                                          @click="reload">
                                {{tag.name}}
                            </el-menu-item>
                        </div>
                    </el-submenu>

                </el-menu>
            </el-col>
        </el-row>
        <MyLine></MyLine>
    </div>
</template>

<script>
    import axios from 'axios'
    import MyLine from '@/components/util/MyLine'

    export default {
        name: "top",
        components: {MyLine},
        data() {
            return {
                baseurl: this.GLOBAL.domain,
                classifications: [],
                tags: [],
            }
        },
        methods: {
            reload: function () {
                this.$router.go(0)
            }
        },

        created() {
            axios.get(this.baseurl + 'api/blog/tags/')
                .then(response => {
                    console.log(response);
                    this.tags = response.data
                })
                .catch(error => {
                    console.log(error);
                });

            axios.get(this.baseurl + 'api/blog/classifications/')
                .then(response => {
                    console.log(response);
                    this.classifications = response.data
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
</script>

<style scoped>
    .top {
        position: fixed;
        left: 25%;
        width: 50%;
        z-index: 1000;
        /*background-color: #5daf34;*/
    }

    .character {
        text-align: left;
        font-size: x-large;
        background-color: #fff;
    }

    .menu {
        display: flex;
        justify-content: flex-end;
        border-bottom: 0;
        /*透明背景*/
        /*background-color:rgba(0,0,0,0);*/
    }
</style>
