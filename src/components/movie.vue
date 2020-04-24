<template>
    <div class="movie" v-show="detailPlayerFlag">
        <!-- 模糊大背景 -->
        <div class="movie-box" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
        <!-- 整体内容 -->
        <div class="movie-box-cont">
            <!-- 头部名称 -->
            <div class="movie-tit">
                <span class="back" @click="hide"></span>
                {{audio.title}}
            </div>
            <!-- 图片 -->
            <div class="movie-img">
                <img :src="audio.imgUrl" alt="">
            </div>
            <!-- 歌词 -->
            <div class="movie-lrc">
                <div class="lrc-content" :style="{marginTop: lrcOffset + 'px' }">
                    <p
                        v-for="(item, index) in songLrc"
                        :key="index"
                        :class="{'wait-lrc': item.seconds >= audio.currentLength}">
                        {{item.lrcContent}}
                    </p>
                </div>
            </div>
            <!-- 进度条 -->
            <div class="movie-range">
                <span class="star">{{audio.currentLength | time}}</span>
                <!-- mint-ui 进度条 -->
                <mt-range
                    id="range"
                    v-model="audio.currentLength" 
                    :min="0"
                    :max="audio.songLength"
                    :bar-height="5"
                    style="width: 70%">
                </mt-range>
                <span class="end">{{audio.songLength | time}}</span>
            </div>
            <!-- 按钮 -->
            <div class="movie-btn">
                <i class="detail-player-btn play-prev" @click="prev()"></i>
                <i
                class="detail-player-btn play-play"
                :class="{'play-pause': !isPlay}"
                @click="play()">
                </i>
                <i class="detail-player-btn play-next" @click="next()"></i>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            time:null
        }
    },
    //自定义过滤器  得到时间
    filters: {
        time (value) {
            let length = Math.floor(parseInt(value))
            let minute = Math.floor(value / 60)
            if (minute < 10) {
                minute = '0' + minute
            }
            let second = length % 60
            if (second < 10) {
                second = '0' + second
            }
            return minute + ':' + second
        }
    },
    computed: {
        //得到vuex里的歌曲数据
        ...mapGetters(['audio', 'detailPlayerFlag', 'isPlay']),
        songLrc () {
            if (this.audio.lrc) {
                console.log(this.audio.lrc)
                const lrcSentenceRE = /^\[(\d{1,3}):(\d{2}\.\d{2})\](.*)/
                // 过滤出像 [00:00.33]马英超 - 山水之间” 这类带时间的句子
                // 分割 返回的歌词  split() 方法用于把一个字符串分割成字符串数组
                const lrcItems = this.audio.lrc.split('\r\n')
                
                //过滤歌词
                .filter(item => {
                    return lrcSentenceRE.test(item)
                })
                //过滤时间
                .map(item => {
                    const matched = item.match(lrcSentenceRE)
                    const minute = Number(matched[1])
                    const second = Number(matched[2])
                    return {
                    seconds: minute * 60 + second,
                    lrcContent: matched[3]
                    }
                })
                return lrcItems
            }
        },
        lrcOffset () {
            if (this.songLrc) {
                // 选取标签  改变其样式
                const offset = (this.songLrc.length - document.querySelectorAll('.wait-lrc').length - 2) * (-20)
                return this.audio.currentLength + offset - this.audio.currentLength
            }
        },
        
    },
    mounted() {
        if(this.audio){
            this.time = setInterval(() => {
                this.audio.currentLength++
            }, 1000);
        }
    },
    methods: {
        hide(){
            this.$store.commit('showDetailPlayer', false)
            clearInterval(this.time)
        },
        play () {
            if (!this.isPlay) {
                document.getElementById('audioPlay').pause()
            } else {
                document.getElementById('audioPlay').play()
            }
            this.$store.commit('isPlay', !this.isPlay)
        },
        prev () {
            this.$store.dispatch('prev')
        },
        next () {
            this.$store.dispatch('next')
        }
    },
}
</script>
<style lang="less">
    .movie{
        .movie-box{
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1010;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            -webkit-filter: blur(5px);
            filter: blur(5px);//图片模糊
        }
        .movie-box-cont{
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1010;
            .movie-tit{
                width: 100%;
                height: 43px;
                background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
                color: #fff;
                font-size: 18px;
                text-align: center;
                line-height: 43px;
                margin-top: 60px;
                position: relative;
            }
            .movie-img{
                width: 50%;
                margin: 30px auto;
            }
            .movie-lrc{
                width: 100%;
                height: 60px;
                overflow: hidden;
                margin-bottom: 20px;
                text-align: center;
                color: #fff;
                line-height: 20px;
                .lrc-content {
                    transition: all .5s;
                    transform: translateZ(0)
                }
            }
            .movie-range{
                padding: 0 10px;
                width: 100%;
                overflow: hidden;
                .star,.end{
                    height: 30px;
                    line-height: 30px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                }
                .star{
                    float: left;
                }
                .end{
                    float: right;
                    margin: -30px 15px 0 0;
                }
            }
            .movie-btn{
                margin-top: 10px;
                padding: 0 20%;
                .detail-player-btn{
                    display: block;
                    width: 33.3%;
                    float: left;
                    height: 100px;
                }
            }
        }
    }
    .back{
        display: block;
        float: left;
        width: 24px;
        height: 100%;
        background: url("~@/assets/images/goback_icon.png") no-repeat center;
        background-size: 60% 60%;
        position: absolute;
        left: 5px;
        top: 0;
    }
    // 进度条
    .mt-range {
      width: 70%;
      padding: 0 10px;
      overflow: hidden
    }
    //整体透明度
    .mt-range--disabled {
      opacity: 1
    }
    //进度条盒子
    .mt-range-content {
      margin-right: 7px;
      width: 100%;
    }
    //小圆圈
    .mt-range-thumb {
        width: 16px;
        height: 16px;
        top: 7px;
    }
    //已走长度
    .mt-range-progress {
        position: absolute;
        display: block;
        background-color: #26a2ff;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
    }
    .play-prev {
      background: url("~@/assets/images/play_prev.png") no-repeat;
      background-size: 60% auto;
      background-position: center
    }
    .play-play {
      background: url("~@/assets/images/play_play.png") no-repeat;
      background-size: 80% auto;
      background-position: center
    }
    .play-pause {
      background: url("~@/assets/images/play_pause.png") no-repeat;
      background-size: 80% auto;
      background-position: center
    }
    .play-next {
      background: url("~@/assets/images/play_next.png") no-repeat;
      background-size: 60% auto;
      background-position: center
    }
</style>