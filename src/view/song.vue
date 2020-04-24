<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in banners" 
                    :key="index"
                    :class="myindex==index? 'top' :''">
                    <img :src="item.imgurl">
                </div>
        </div>
        <div class="song-box">
            <!-- 每个歌曲绑定点击事件  传参index -->
            <li v-for="(item,index) in list" :key="index" class="song-li"
                @click="playAudio(index)">
                <span class="song-text">{{item.filename}}</span>
                <img src="../assets/images/download_icon.png" 
                width="20" height="20" class="song-img"/>
            </li>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'
import { PLAY_AUDIO } from '../mixins'
export default {
    mixins: [PLAY_AUDIO],
    data() {
        return {
            banners:[],
            list:[],
            myindex:0
        }
    },
    methods: {
        getsongs(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
            })
            this.$http.get('/m_kugou/?json=true').then((data) => {
                this.banners = data.data.banner
                this.list = data.data.data
            }).then(()=>{
                Indicator.close()
            })
        },
        go(){
            setInterval( () =>{
                this.myindex++
                    if(this.myindex>=4){
                        this.myindex=0
                    }
            }, 2000)
        },
    },
    mounted() {
        this.getsongs()
        this.go()
    },
}

</script>
<style lang="less">
    .swiper-container{
        position: relative;
        .swiper-slide{
            position: absolute;
        }
    }
    .swiper-wrapper{
        height: 39vw !important;
    }
    .song-li{
        padding-left: 10px;
        min-height: 52px;
        line-height: 52px;
        position: relative;
        border-bottom: 1px solid #e8e8e8;
        .song-text{
            width: 85%;
            display: inline-block;
        }
        .song-img{
            vertical-align: middle;
        }
    }
    .top{
        z-index: 999
    }
    .v-enter-active,
    .v-leave-active{
      transition: all 0.8s ease;
    }
    .v-enter, .v-leave-to{
        opacity: 0.2;
    }
</style>