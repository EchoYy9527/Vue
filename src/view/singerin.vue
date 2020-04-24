<template>
    <!-- 歌手歌曲详情 -->
    <div class="singerin">
        <div class="singerin-box">
            <div class="banner-wrap" :style="{backgroundImage: `url(${imgurl})`}">
            </div>
            <div class="singerin-cont">
                <p class="cont-tit" :class="flag ? 'height':''">{{msg.profile}}</p>
                <img src="../assets/images/close_icon.png" alt="" 
                v-if="flag" class="cont-img" @click="change">
                <img src="../assets/images/open_icon.png" alt="" 
                v-else class="cont-img" @click="change">
            </div>
            <div class="other"></div>
            <div class="singer-cont">
                <div class="singer-sin" v-for="(item,index) in list" :key="index" @click="playAudio(index)">
                    <span class="sin-tit">{{item.filename}}</span>
                    <img src="../assets/images/download_icon.png" width="20" height="20" class="sin-img">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'
import { PLAY_AUDIO } from '../mixins'
export default {
    mixins:[PLAY_AUDIO],
    data() {
        return {
            msg:[], //文字说明
            imgurl:'', //歌手图片
            list:[], //歌曲
            flag:true //文字开关
        }
    },
    methods: {
        getlist () {
            Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
            })
            const singerid = this.$route.params.id
            this.$http.get(`/m_kugou/singer/info/${singerid}&json=true`).then(({data}) => {
                Indicator.close()
                const img = data.info
                this.msg = img
                this.imgurl = img.imgurl.replace('{size}', '400')
                this.list = data.songs.list
                // console.log(this.list[0].hash)
            })
        },
        change(){
            this.flag=!this.flag
        }
    },
    mounted() {
        this.getlist()
    },
}
</script>
<style lang="less">
    .singerin{
        padding-top: 43px;
        .singerin-box{
            .banner-wrap{
                width: 100%;
                margin-top: -43px;
                position: relative;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100%;
                height: 250px;
            }
            .singerin-cont{
                padding: 12px;
                font-size: 16px;
                position: relative;
                text-align: justify;
                .cont-tit{
                    overflow: hidden;
                    padding-right: 50px;
                    line-height: 135%;
                }
                .cont-img{
                    display: block;
                    width: 24px;
                    height: 24px;
                    position: absolute;
                    right: 20px;
                    top: 10px;
                }
            }
            .singer-cont{
                .singer-sin{
                    border-bottom: 1px solid #e8e8e8;
                    font-size: 14px;
                    overflow: hidden;
                    padding: 0 10px;
                    line-height: 52px;
                    position:relative;
                }
                .sin-tit{
                   padding-left: 10px;
                }
                .sin-img{
                    float: right;
                    padding: 15px 15px 0 0;
                }
            }
            .other{
                height: 5px;
                background-color: rgb(241, 241, 241);
            }
        }
    }
    .height{
        height: 1.35em;
    }
</style>