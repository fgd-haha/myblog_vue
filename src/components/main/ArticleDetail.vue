<template>

    <div ref="page" class="detail">
        <!--时间 点击 评论数 子组件-->
        <Overview class="overview"
                  :create_time="this.article.create_time"
                  :click_nums="this.article.click_nums"
                  :comments_num="this.article.comments_num"></Overview>

        <!--博客主体-->
        <vue-markdown :source="article.content"  v-highlight></vue-markdown>

        <!--评论子组件-->
        <Comments class="comments" :article_id="article_id"></Comments>

    </div>

</template>
<script>
    import axios from 'axios'
    import Comments from '@/components/main/Comments'
    import Overview from '@/components/util/Overview'


    export default {
        name: 'detail',
        components: {
            Comments,
            Overview
        },
        data() {
            return {
                baseurl: this.GLOBAL.domain,
                article: {},
                article_id: this.$route.path.substring(8).split('/')[0]
            }
        },

        methods: {},

        created() {
            axios.defaults.withCredentials = true;
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.defaults.xsrfCookieName = 'csrftoken';

            axios.get(this.baseurl + 'api/blog/article/' + this.article_id)
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
    .detail {
        padding-left: 10%;
        padding-right: 10%;
        margin-bottom: 20%;
    }

    .overview {
        margin-bottom: 50px;
        margin-top: 50px
    }

    .comments {
        padding-top: 10%;
    }

</style>
