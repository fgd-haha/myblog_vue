<template>
  <div id="app">
    <!--<div class="left">-->
      <!--<Me></Me>-->
    <!--</div>-->
    <!--<div class="main">-->
      <!--<div class="top">-->
        <!--<Top></Top>-->
      <!--</div>-->
      <!--<div class="down">-->
        <!--<router-view></router-view>-->
      <!--</div>-->

    <!--</div>-->
    <el-container>
      <el-aside width="200px">
        <Me></Me>
      </el-aside>
      <el-container>
        <el-header>
          <Top></Top>
        </el-header>
        <el-main>
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

  /*.left{*/
    /*color:#fff;*/
    /*font-size:10px;*/
    /*height:100%;*/
    /*background-color: #1D8ce0;*/
    /*float:left;*/
    /*width:20%;*/
  /*}*/
  /*.main {*/
    /*!*float: left;*!*/
    /*width: 80%;*/
    /*background-color: #EFF2F7;*/
    /*height: 100%;*/
    /*overflow: auto;*/
  /*}*/

  /*.top{*/
    /*float: left;*/
    /*width: 100%;*/
    /*background-color: #EFF2F7;*/
    /*height: 5%;*/
    /*overflow: auto;*/
  /*}*/
  /*.down{*/
    /*float: left;*/
    /*width: 95%;*/
    /*background-color: #EFF2F7;*/
    /*height: 100%;*/
    /*overflow: auto;*/
  /*}*/
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
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
