<template>

  <el-menu :default-active="$route.path" :router="true" class="el-menu-demo" mode="horizontal"
           style="position: fixed; left: 25%; width: 50%; z-index: 1000">
    <el-submenu index="3" style="float: right;">
      <template slot="title">标签</template>
      <div v-for="tag in this.tags">
        <el-menu-item :index="'3-' + tag.id"
                      :route="{ name: 'articles', query: { tagid: tag.id}}" @click="reload">
          {{tag.name}}
        </el-menu-item>
      </div>
    </el-submenu>

    <el-submenu index="2" style="float: right;">
      <template slot="title">分类</template>
      <div v-for="fenlei in this.classifications">
        <el-menu-item :index="'2-' + fenlei.id"
                      :route="{ name: 'articles', query: {classificationid: fenlei.id }}" @click="reload">
          {{fenlei.name}}
        </el-menu-item>
      </div>
    </el-submenu>

    <el-menu-item index="1" :route="{ name: 'articles'}"
                  style="float: right;"
                  @click="reload"
    >首页
    </el-menu-item>

  </el-menu>

</template>

<script>
  import axios from 'axios'

  export default {
    name: "top",
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

</style>
