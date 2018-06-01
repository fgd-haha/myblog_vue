<template>
  <div style="position: fixed; width: 58%">
    <el-menu :default-active="activeIndex" router="false" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="3" style="float: right;">
        <template slot="title">标签</template>
        <div v-for="tag in this.tags">
          <el-menu-item :index="'3-' + tag.id" :route='"/tag/"+tag.id' @click="reload">{{tag.title}}</el-menu-item>
        </div>
      </el-submenu>

      <el-submenu index="2" style="float: right;">
        <template slot="title">分类</template>
        <div v-for="fenlei in this.classifications">
          <el-menu-item :index="'2-' + fenlei.id" :route="'/classification/' + fenlei.id" @click="reload">{{fenlei.title}}</el-menu-item>
        </div>
      </el-submenu>


      <el-menu-item index="1" route="/" style="float: right;">首页</el-menu-item>

    </el-menu>

    <!--<el-row>-->
      <!--<el-col :span="14"><div class="grid-content bg-purple-light"></div>-->
        <!--<el-button style="font-size:15px" type="text"  @click="jump()">首页</el-button>-->
        <!--<el-button style="font-size:15px" type="text"  @click="jump()">分类</el-button>-->
        <!--<el-button style="font-size:15px" type="text"  @click="jump()">标签</el-button>-->
      <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
        name: "top",
      data() {
        return {
          classifications: [],
          tags: [],
        }
      },
      methods: {
        reload: function () {
          this.$router.go(0)
        }
      },

      created(){
        axios.get('http://localhost:8000/blog/tags/')
          .then(response => {
            console.log(response);
            this.tags = response.data
          })
          .catch(error => {
            console.log(error);
            alert('获取标签信息失败');
          });

        axios.get('http://localhost:8000/blog/classifications/')
          .then(response => {
            console.log(response);
            this.classifications = response.data
          })
          .catch(error => {
            console.log(error);
            alert('获取分类信息失败');
          });
      }
    }
</script>

<style scoped>

</style>
