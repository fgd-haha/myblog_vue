<template>
        <div class="main">
            <el-row class="article_block"
                    v-for="{ id, title, abstract, create_time, click_nums, tags, comments, img_address } in this.articles"
            >
                <el-col :span=6><img class="article_img" :src=img_address></el-col>
                <el-col :span=18>
                    <el-row class="article_row">
                        <router-link :to="{ name: 'article_detail', params: { articleid: id }}"
                                     style="font-size:18px; font-weight: bold; color: #333; text-decoration: none;">
                            {{title}}
                        </router-link>
                        <span v-for="tag in tags">
                                    <el-tag size="mini" type="info">{{tag.name}}</el-tag>
                                </span>
                    </el-row>

                    <el-row class="article_row">{{abstract}}</el-row>

                    <el-row class="article_row" type="flex">
                        <i class="el-icon-date" style="margin-top: 2px"></i>&nbsp{{create_time}}&nbsp&nbsp
                        <i class="el-icon-view" style="margin-top: 2px"></i>&nbsp{{click_nums}}&nbsp&nbsp
                        <icon name="comments2" :scale="1.7" style="margin-top: 2px"></icon>
                        &nbsp{{comments.length}}
                    </el-row>
                </el-col>
            </el-row>
        </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'articles',
        data() {
            return {
                articles: [],
                tags: [],
                classification: '',
                baseurl: this.GLOBAL.domain,
            }
        },
        methods: {
            get_time: function () {
                for (let i = 0; i < this.articles.length; i++) {
                    var time = this.articles[i].create_time;
                    time = time.replace('T', ' ').substr(0, 10);
                    this.articles[i].create_time = time;
                }
            }
        },

        beforeCreate() {
            document.title = 'HaHaHa的备忘录';
        },

        created() {
            axios.get(this.baseurl + 'api/blog/all/', {
                params: {
                    "classificationid": this.$route.query.classificationid,
                    "tagid": this.$route.query.tagid
                }
            })
                .then(response => {
                    console.log(response);
                    this.articles = response.data;
                    this.get_time();
                    this.articles.reverse();
                })
                .catch(error => {
                    console.log(error);
                });
        },

    }
</script>

<style scoped>
    .main {
        padding: 10% 10%;
    }

    .article_block {
        margin-bottom: 5%;
    }

    .article_row {
        margin-bottom: 1%;
        text-align: justify;
    }

    .article_img{
        width: 90%;
        max-height: 150px;
    }

    :last-child {
        margin-bottom: 0;
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #fff;
    }

    .bg-purple {
        background: #fff;
    }

    .bg-purple-light {
        background: #fff;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 66px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
