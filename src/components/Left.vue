<template>
<!--  <div style="position: fixed; left: 8%;">-->
<!--    <img src="../assets/shuye2.jpg" style="width: 100px; margin-top: 150px">-->
<!--      <div>-->
<!--      <span>{{email}}</span>-->
<!--    </div>-->
<!--    <router-link :to="{name: 'articles'}"><img style="margin-top: 100px;" @click="jump_github()" src="./../assets/GitHub-Mark-32px.png"/></router-link>-->
<!--  </div>-->
</template>

<script>
  export default {
    name: 'Left',
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

