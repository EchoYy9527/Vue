<template>
    <div class='header-nav'>
        <ul class="header-ul">
            <li class="header-li" @click="fun1" >新歌</li>
            <li class="header-li" @click="fun2">排行</li>
            <li class="header-li" @click="fun3">歌单</li>
            <li class="header-li" @click="fun4">歌手</li>
        </ul>
    </div>
</template>
<script>
export default {
    methods: {
        fun1(){
            this.$router.replace('/song')
        },
        fun2(){
            this.$router.replace('/rank')
        },
        fun3(){
            this.$router.replace('/sing')
        },
        fun4(){
            this.$router.replace('/singer')
        }
    },
}
</script>
<style lang="less">
    .header-nav{
        position: fixed;
        top: 60px;
        left: 0;
        width: 100%;
        background-image: linear-gradient(to bottom,#76C0F7,#BEE1FB);
        z-index: 1000;
        .header-ul{
            display: inline;
            .header-li{
                float: left;
                margin: 10px 19px;
                padding: 5px 10px;
                color: #fff;
            }
        }
    }
</style>