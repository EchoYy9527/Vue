<template>
    <!-- 排行歌手 -->
    <div class="rankin">
        <div class="rankin-box">
            <div class="banner-wrap" :style="{backgroundImage:'url('+ imgurl + ')'}">
                <div class="rank-status">
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;更新时间：{{gettime}}</p>
                </div>
            </div>
            <div class="rank-list">
                <li v-for="(item,index) in list" :key="index" 
                class="rank-li" @click="playAudio(index)">
                    <span class="rank-num" 
                    >{{index+1}}</span>
                    <span class="rank-tit">{{item.filename}}</span>
                    <img src="../assets/images/download_icon.png" width="20" height="20" class="rank-down">
                </li>
            </div>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'
import { PLAY_AUDIO } from '../mixins'  //公用播放器
export default {
    mixins: [PLAY_AUDIO],
    data() {
        return {
            imgurl:'',
            list:[]
        }
    },
    methods: {
        getlist(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
            })
            const rankid = this.$route.params.id
            console.log(rankid)
            this.$http.get(`/m_kugou/rank/info/?rankid=${rankid}&page=1&json=true`).then(({data}) => {
                Indicator.close()
                console.log(data)
                const img = data.info.banner7url
                this.imgurl = img.replace('{size}', '400')
                this.list = data.songs.list
                console.log(this.list)
            })
        }
    },
    computed: {
        //上次更新时间
        gettime () {
            const time = new Date()
            const year = time.getFullYear()
            let month = time.getMonth() + 1
            let date = time.getDate()
            if (month < 10) month = '0' + month
            if (date < 10) date = '0' + date
            return `${year}-${month}-${date}`
        },
    },
    mounted() {
        this.getlist()
    },
}
</script>
<style lang="less">
    .rankin{
        padding-top: 43px;
        .rankin-box{
           .banner-wrap{
                width: 100%;
                height: 200px;
                margin-top: -43px;
                position: relative;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100%;
                .rank-status{
                    height: 43px;
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background: -webkit-linear-gradient(bottom, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));
                    line-height: 43px;
                    font-size: 15px;
                    color: #fff
                }
           }
           .rank-list{
               .rank-li{
                border-bottom: 1px solid #e8e8e8;
                font-size: 14px;
                padding:20px 10px;
                    .rank-down{
                        float: right;
                    }
                    .rank-num{
                        font-size: 12px;
                        padding: 2px 8px;
                        left: 12px !important;
                        border-radius: 50%;
                        
                    }
                    .rank-tit{
                        padding: 0 35px ;
                    }
               }
           }
        }
    }
    // .ft{
    //     color: #fff;
    //     background-color: #e80000;
    // }
    // .se{
    //     color: #fff;
    //     background-color: #ff7200;
    // }
    // .tr{
    //     color: #fff;
    //     background-color: #f8b300;
    // }
</style>