<template>
    <div class="player-box">
        <div class="player-cont" @click="show">
            <!-- 播放器 接收数据 -->
            <audio :src="audio.songUrl" autoplay id="audioPlay" ></audio>
            <img :src="audio.imgUrl" alt="" class="kg" width="30px">
            <div class="player-status">
                <p class="player-title ellipsis">{{audio.title}}</p>
                <p class="player-singer ellipsis">{{audio.singer}}</p>
            </div>
        </div>
        <div class="mark">
            <span class="player-play-box">
                <i class="player-play" @click="play()" 
                :class="{'player-pause': isPlay}"></i>
            </span>
            <span class="player-next">
                <img :src="nextimg" alt="" class="next" @click="next">
            </span>
        </div>
    </div>
</template>
<script>
//接收vuex里返回的数据
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            img:'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
            playimg:require("../assets/images/pause_icon.png"),
            stopimg:require("../assets/images/play_icon.png"),
            nextimg:require("../assets/images/next_icon.png"),
        }
    },
    methods: {
        //详细播放开关
        show(){
            if(!this.showPlayer){
                this.$store.commit('showDetailPlayer', true)
            }
        },
        //暂停播放按钮
        play () {
            if (!this.isPlay) {
                document.getElementById('audioPlay').pause()
            } else {
                document.getElementById('audioPlay').play()
            }
            this.$store.commit('isPlay', !this.isPlay)
        },
        //下一曲
        next(){
            console.log(this.$store.state.listInfo)
            this.$store.dispatch('next')
        }
    },
    computed: {
        ...mapGetters(['audio', 'audioLoading', 'isPlay'])
    },
}
</script>
<style lang="less">
    .player-box{
        z-index: 999;
        height: 64px;
        background-color: rgba(0, 0, 0, 0.8);
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        .player-cont{
            padding: 7px;
            height: 100%;
            .kg{
                height: 80%;
                width: 50px;
                border-radius: 3px;
                float: left;
            }
        }
    }
    .mark{
        position: absolute;
        top: 0;
        right: 0;
        width: 30%;
        height: 100%;
    }
    .player-play-box{
        position: relative;
        display: block;
        width:50%;
        height: 100%;
        .play,.stop{
            position: absolute;
            top: 13%;
        }
    }
    .player-next{
        position: relative;
        top: -78%;
        right: -45%;
        display: block;
        width: 50%;
        height: 100%;
        .next{
            position: absolute;
            top: -7%;
        }
    }
    .player-status {
      float: left;
      width: 50%;
      height: 100%;
      margin-left: 3%;
      padding: 5px 0;
      color: #fff;
    }
    .player-title {
      width: 100%;
      font-size: 16px;
      overflow: hidden;
      display: block;
    }
    .player-singer {
      display: block;
      height: 50%;
      width: 100%;
      color: #c4c4c4;
      padding-top: 2px
    }
    .player-play{
        background: url("~@/assets/images/pause_icon.png") no-repeat center;
        background-size: auto 80%;
        display: block;
        width: 50%;
        height: 100%;
        float: left;
    }
    .player-pause {
        background: url("~@/assets/images/play_icon.png") no-repeat center;
        background-size: auto 80%;
    }
</style>