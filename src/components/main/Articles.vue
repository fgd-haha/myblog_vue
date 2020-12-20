<template>
    <div class="main">
        <div class="article_block"
             v-for="{ id, title, abstract, create_time, click_nums, tags, comments, img_address } in this.articles">
            <el-row type="flex">
                <el-col :span=7 @click.native="to_detail(id)"><div class="img_container"><img :src=img_address
                                                                                              :onerror="errorUserPhoto"></div></el-col>
                <el-col :span=17>
                    <el-row class="article_row">
                        <router-link :to="{ name: 'article_detail', params: { 'articleid': id }}"
                                     style="font-size:18px; font-weight: bold; color: #333; text-decoration: none;">
                            {{ title }}
                        </router-link>
                        <span v-for="tag in tags">
                                    <el-tag @click.native="to_tag(tag.id)" size="mini" type="success"
                                            style="cursor: pointer;">
                                        {{ tag.name }}
                                    </el-tag>&nbsp;&nbsp;
                                </span>
                    </el-row>

                    <el-row @click.native="to_detail(id)" class="article_row abstract" style="">{{ abstract }}</el-row>

                    <el-row class="article_row" type="flex">
                        <i class="el-icon-date" style="margin-top: 2px"></i>&nbsp{{ create_time }}&nbsp&nbsp
                        <i class="el-icon-view" style="margin-top: 2px"></i>&nbsp{{ click_nums }}&nbsp&nbsp
                        <vue-svg-icon name="comments2" :scale="1.7" style="margin-top: 2px"></vue-svg-icon>
                        &nbsp{{ comments.length }}
                    </el-row>
                </el-col>
            </el-row>
            <el-row style="padding-top: 3%">
                <my-line></my-line>
            </el-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import MyLine from '@/components/util/MyLine'

export default {
    name: 'articles',
    components: {MyLine},
    data() {
        return {
            errorUserPhoto: this.GLOBAL.errorUserPhoto,
            articles: [],
            tags: [],
            classification: '',
            baseurl: this.GLOBAL.domain,
        }
    },
    methods: {
        get_time: function () {
            for (let i = 0; i < this.articles.length; i++) {
                let time = this.articles[i].create_time;
                time = time.replace('T', ' ').substr(0, 10);
                this.articles[i].create_time = time;
            }
        },

        to_detail: function (articleid) {
            console.log('go to ' + articleid);
            this.$router.push({name: 'article_detail', params: {'articleid': articleid}})
        },
        to_tag: function (tagid) {
            console.log('go to ' + tagid);
            this.$router.push({name: 'articles', query: {'tagid': tagid}})
            this.$router.go(0)
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
    margin-bottom: 3%;
}

.article_row {
    margin-bottom: 2%;
    color: #828a92;
    text-align: justify;
}

.abstract{
    height: 45%;
    margin-top: 3%;
    cursor: pointer
}
.img_container {
    overflow: hidden;
    position: relative;
    width: 240px;
    height: 135px;
    background:black;
    border-radius: 10px;
}
.img_container > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 160px;
    cursor: pointer;
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
