<template>
  <div id="app">
    <el-container>
      <el-aside width="20%">
        <Me></Me>
      </el-aside>
      <el-container>
        <el-header>
          <Top></Top>
        </el-header>
        <el-main style="width: 75%">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
  import Me from '@/components/Me'
  import Top from '@/components/Top'

  export default {
    name: 'app',
    components: {
      Me,
      Top
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0px;
    padding: 0px;
  }
  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
    text-align: right;
    line-height: 60px;
  }

  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    /*line-height: 200px;*/
  }

  .el-main {
    background-color: #fff;;
    color: #333;
    text-align: left;
    /*line-height: 50px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
