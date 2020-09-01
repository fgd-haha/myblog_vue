<template>
    <div>
        <el-row type="flex" style="background-color: #fff">
            <el-col :span=4>
                <router-link class="character" :to="{ name: 'articles'}" :underline="false">HaHaHa</router-link>
            </el-col>
            <el-col :span=18>
                <el-menu class="menu" :default-active="$route.path" :router="true" mode="horizontal">
                    <el-menu-item index="1" :route="{ name: 'articles'}" @click="reload">首页</el-menu-item>

                    <el-submenu index="2">
                        <template slot="title">分类</template>
                        <div v-for="classification in this.classifications">
                            <el-menu-item :index="'2-' + classification.id"
                                          :route="{ name: 'articles', query: {classificationid: classification.id }}"
                                          @click="reload">
                                {{ classification.name }}
                            </el-menu-item>
                        </div>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">标签</template>
                        <div v-for="tag in this.tags">
                            <el-menu-item :index="'3-' + tag.id"
                                          :route="{ name: 'articles', query: { tagid: tag.id}}"
                                          @click="reload">
                                {{ tag.name }}
                            </el-menu-item>
                        </div>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span=20 :offset=2>
                <MyLine></MyLine>
            </el-col>
        </el-row>

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
                isphone: this.GLOBAL.isphone(),
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
    .character {
        text-align: right;
        font-size: x-large;
        background-color: #fff;
        color: #000000;
        text-decoration: none;
    }

    .small_text {
        text-align: left;
        font-size: small;
        background-color: #5daf34;
    }

    .menu {
        display: flex;
        justify-content: flex-end;
        border-bottom: 0;
        /*透明背景*/
        /*background-color:rgba(0,0,0,0);*/
    }
</style>
