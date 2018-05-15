<template>
  <div class="articles">
    <el-row type="flex" v-for="{ id, title, create_time } in this.articles">
      <el-col :span="18" :offset="1">
        <div class="grid-content bg-purple" >
          <!--<router-link :to="{name: 'detail', params: {article_id: id}}">  {{id}}        {{title}}-->
          <!--</router-link>-->
          <div @click="jump(id)">{{id}}{{title}}</div>
        </div>
      </el-col>
      <el-col :span="4" >
        <div class="grid-content bg-purple-light">
          {{create_time}}
        </div>
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
        id: '',
        tags: [],
        classification: '',
        title: '',
        click_nums: '',
        create_time: '',
        content: '',
        detail_url: '',
      }
    },
    methods:{
      jump: function (article_id) {
        this.detail_url = '/' + article_id;
        this.$router.push({path: this.detail_url})
      }
    },

    created() {
      axios.get('http://localhost:8000/blog/articles/')
        .then(response => {
          console.log(response);
          this.articles = response.data;
        })
        .catch(error => {
          console.log(error);
          alert('网络错误，不能访问');
        })
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
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
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
