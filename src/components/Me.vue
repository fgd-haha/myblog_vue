<template>
  <!--<div class="Me" style="position: relative;">-->
  <div class="Me" style="position: fixed; left: 8%; ">
    <div style="margin-top: 180px">
      <h3>{{name}}</h3>
      <span>{{email}}</span>
    </div>
    <router-link to="/"><img style="margin-top: 100px;" src="./../assets/GitHub-Mark-32px.png" @click="jump_github()"/></router-link>
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
        window.location.href = 'https://github.com/fgd-haha/';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
