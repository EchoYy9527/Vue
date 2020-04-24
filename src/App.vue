<template>
  <div id="app">
      <headf></headf>
      <div class="main">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <player></player>
      <movie></movie>
  </div>
</template>
<script>
import headf from './components/head/headf';
import player from './components/player';
import movie from './components/movie';
export default {
  name: 'App',
  components:{
    headf,player,movie
  }
}
</script>

<style lang="less">
#app {
  .main {
    margin-top: 110px;
  }
}
</style>
