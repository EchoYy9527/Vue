<template>
    <!-- 歌手详情 -->
    <div class="singerlist">
        <div class="singerlist-box">
            <a v-for="(item,index) in list" :key="index" 
            :href="`/singer/info/${item.singerid}`">
                <div class="singer-li">
                    <img :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
                    <span class="singer-tit">{{item.singername}}</span>
                </div>
            </a>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'
export default {
    data() {
        return {
            name:'',//歌手
            list:[]
        }
    },
    methods: {
        getlist () {
            Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
            })
            const singerid = this.$route.params.id
            this.$http.get(`/m_kugou/singer/list/${singerid}?json=true`).then(({data}) => {
                Indicator.close()
                this.name = data.classname
                this.list = data.singers.list.info
            })
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            //路由进入前去请求数据 
        vm.getlist()
        })
    },
    mounted() {
        // this.getlist()
    },
}
</script>
<style lang="less">
    .singerlist{
        .singerlist-box{
            .name{
                text-align: center
            }
            .singer-li{
                position: relative;
                padding: 5px 5px;
                border-bottom: 1px solid #e8e8e8;
                .singer-tit{
                    // display: inline;
                    position: absolute;
                    left: 20%;
                    top: 30%;
                }
            }
        }
    }
    .singer-li:after{
        border: solid 2px #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 20px;
        position: absolute;
        width: 5px;
        height: 5px;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg)
    }
</style>