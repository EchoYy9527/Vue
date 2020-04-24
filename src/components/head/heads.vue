<template>
    <div class="logo-container">
        <div class="head-logo">
          <img src="http://m.kugou.com/v3/static/images/index/logo.png" />
        </div>
        <div class="head-search">
            <img src="http://m.kugou.com/v3/static/images/index/search.png" />
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
.logo-container {
  padding: 10px 0 0 10px;
  background-image: linear-gradient(to bottom, #2ca2f9 ,#76C0F7);
  overflow: hidden;
  height: 51px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1050;
  .head-logo {
    float: left;
    height: 100%;
    img {
      height: 80%
    }
  }
  .head-search {
    float: right;
    height: 31px;
    padding: 5px 0;
    margin-right: 25px;
    img {
      height: 100%;
    }
  }
}
</style>