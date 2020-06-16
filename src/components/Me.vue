<template>
  <!--<div class="Me" style="position: relative;">-->
  <div class="Me" style="position: fixed; left: 8%; ">
    <!--<img src="../assets/shuye.jpg" style="width: 100px; margin-top: 150px">-->
    <img src="../assets/shuye2.jpg" style="width: 100px; margin-top: 150px">
      <div>
      <!--<h3>{{name}}</h3>-->
      <span>{{email}}</span>
    </div>
    <router-link :to="{name: 'articles'}"><img style="margin-top: 100px;" @click="jump_github()" src="./../assets/GitHub-Mark-32px.png"/></router-link>
  </div>
</template>

<script>
  export default {
    name: 'Me',
    data() {
      return {
        name: 'fgd',
        email: 'f_gd@foxmail.com'
      }
    },
    methods:{
      jump_github: function () {
        window.open('https://github.com/fgd-haha/');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
