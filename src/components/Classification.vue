
<template>

  <el-container>
    <el-aside width="20%" style="background-color: #fff">
     <Me></Me>
    </el-aside>
    <el-main>
      <div class="articles">
        <div v-for="{ id, title, create_time, click_nums, tags, classification} in this.articles">
          <el-row style="margin-top: 100px" v-if="classification.id == classification_id">
            <el-col :span="21" :offset="1">
              <div>
                <router-link  :to="{path: '/' + id}" style="font-size:18px; color: #333; text-decoration: none;">{{title}}</router-link>
                <span v-for="tag in tags">
            <el-tag size="mini" type="info">{{tag.title}}</el-tag>
            </span>
              </div>
            </el-col>
            <el-col :span="2">
              <div><span style="font-size:15px">{{create_time}}</span></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>
    <el-aside width="20%" style="background-color: #fff"></el-aside>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import Me from "./Me";
  // const Tag_router = new Router({});

  export default {

    name: 'articles',
    components: {Me},
    data() {
      return {
        articles: [],
        tags: [],
        classification_id: this.$route.path.substr(16,1),
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

      axios.get('http://localhost:8000/blog/articles/')
        .then(response => {
          console.log(response);
          if (this.articles = response.data)
            this.get_time();
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
