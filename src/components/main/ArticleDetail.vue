<template>
    <el-container>
        <el-main>
            <div ref="page" class="detail" style="padding-left: 10%; padding-right: 10%; margin-bottom: 20%">
                <!--博客时间，阅读，评论数-->
                <el-row type="flex" justify="end" style="margin-bottom: 50px; margin-top: 50px">
                    <i class="el-icon-date" style="margin-top: 2px"></i>&nbsp{{this.article.create_time}}&nbsp&nbsp
                    <i class="el-icon-view" style="margin-top: 2px"></i>&nbsp{{this.article.click_nums}}&nbsp&nbsp
                    <icon name="comments2" :scale="1.5" style="margin-top: 3px"></icon>
                    &nbsp{{this.article.comments_num}}
                </el-row>

                <!--博客主体-->
                <vue-markdown :source="article.content" style="font-size: small;" v-highlight></vue-markdown>

                <Comments></Comments>

            </div>
        </el-main>
        <el-aside width="20%" style="background-color: #f8f9fa"></el-aside>
    </el-container>
</template>
<script>
    import axios from 'axios'
    import Comments from '@/components/main/Comments'


    export default {
        name: 'detail',
        components: {
            Comments
        },
        data() {
            return {
                baseurl: this.GLOBAL.domain,
                article: {},
            }
        },

        methods: {},

        created() {
            axios.defaults.withCredentials = true;
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.defaults.xsrfCookieName = 'csrftoken';

            var article_id = this.$route.path.substring(8).split('/')[0];
            axios.get(this.baseurl + 'api/blog/article/' + article_id)
                .then(response => {
                    this.article = (response.data);
                    this.article.create_time = this.article.create_time.replace(/T/, ' ').replace(/-/g, '.').substr(0, 10);
                })
                .catch(error => {
                    console.log(error);
                    console.log('获取文章失败');
                });
        },
    }
</script>


<style scoped>
    :last-child {
        margin-bottom: 0;
    }

    img:hover {
        cursor: pointer;
    }
</style>
