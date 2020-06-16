<template>
  <el-container>
    <el-aside width="20%" style="background-color: #fff">
      <Me></Me>
    </el-aside>
    <el-main>
      <div class="articles" style="padding-left: 10%; padding-right: 10%; margin-top: 10%;">
        <div v-for="{ id, title, abstract, create_time, click_nums, tags, comments } in this.articles"
             style="margin-top: 8%;">
          <div v-for="tag in tags" v-if="tag.id == tagid">
            <el-row style="margin-bottom: 1%;">
              <router-link :to="{path: '/' + id}"
                           style="font-size:18px; font-weight: bold; color: #333; text-decoration: none;">
                {{title}}
              </router-link>
              <span v-for="tag in tags">
            <el-tag size="mini" type="info">{{tag.name}}</el-tag>
              </span>
            </el-row>

            <el-row style="margin: 0; font-size: 15px">
              {{abstract}}
            </el-row>

            <el-row type="flex" style="margin-top: 1%">
              <i class="el-icon-date" style="margin-top: 2px"></i>&nbsp{{create_time}}&nbsp&nbsp
              <i class="el-icon-view" style="margin-top: 2px"></i>&nbsp{{click_nums}}&nbsp&nbsp
              <icon name="comments2" :scale="1.7" style="margin-top: 2px"></icon>
              &nbsp{{comments.length}}
            </el-row>

          </div>
        </div>
      </div>
    </el-main>
    <el-aside width="20%" style="background-color: #fff"></el-aside>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import Me from './Me'
  // const Tag_router = new Router({});

  export default {

    name: 'articles',
    components: {Me},
    data() {
      return {
        baseurl: this.GLOBAL.domain,
        articles: [],
        tags: [],
        classification: '',
        tagid: 0,
      }
    },
    methods: {
      // jump: function (article_id) {
      //   this.detail_url = '/' + article_id;
      //   this.$router.push({path: this.detail_url})
      // },

      get_time: function () {
        for (let i = 0; i < this.articles.length; i++) {
          var time = this.articles[i].create_time;
          time = time.replace('T', ' ').substr(0, 10);
          this.articles[i].create_time = time;
        }
      }
    },

    created() {
      this.tagid = this.$route.path.substr(5, 1);
      axios.get(this.baseurl + 'api/blog/articles/')
        .then(response => {
          console.log(response);
          if (this.articles = response.data)
            this.get_time();
          this.articles.reverse();

        })
        .catch(error => {
          console.log(error);
          alert('网络错误，不能访问');
        });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row {
    margin-bottom: 50px;

  &
  :last-child {
    margin-bottom: 0;
  }

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
