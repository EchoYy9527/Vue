<template>
<!-- 歌单详情 -->
    <div class="singin">
        <div class="singin-box">
            <div class="banner-wrap" :style="{backgroundImage: 'url('+ imgurl + ')'}"></div>
        </div>
         <div class="rank-list">
            <li v-for="(item,index) in list" :key="index" 
            class="rank-li" @click="playAudio(index)">
                <span class="rank-tit">{{item.filename}}</span>
                <img src="../assets/images/download_icon.png" width="20" height="20" class="rank-down">
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
            const singid = this.$route.params.id
            this.$http.get(`/m_kugou/plist/list/${singid}?json=true`).then(({ data }) => {
                Indicator.close()
                const img = data.info.list
                this.imgurl = img.imgurl.replace('{size}', '400')
                this.list = data.list.list.info
            })
        },
    },
    mounted() {
        this.getlist()
    }
}
</script>
<style lang="less">
    .singin{
        padding-top: 43px;
        .singin-box{
            .banner-wrap{
                width: 100%;
                height: 200px;
                margin-top: -43px;
                position: relative;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100%;
            }
        }
        .rank-list{
               .rank-li{
                border-bottom: 1px solid #e8e8e8;
                font-size: 14px;
                padding:20px 0;
                    .rank-down{
                        float: right;
                        padding-right: 15px;
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
    
</style>