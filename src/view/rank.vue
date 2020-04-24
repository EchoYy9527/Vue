<template>
    <!-- 排行路由 -->
    <div class="page-rank">
        <a  v-for="(item,index) in list" 
         :key="index" :href="`/rank/info/${item.rankid}`" >
            <div class="rank-box" >
                <img :src="item.imgurl.replace('{size}', '400')" alt="" width="60px" height="60px" class="rank-box-mig">
                <span class="rank-box-span">{{item.rankname}}</span>
            </div>
        </a>   
    </div>
</template>
<script>
//加载中...
import { Indicator } from 'mint-ui'
export default {
    data() {
        return {
            list:[],
        }
    },
    methods: {
        //获取数据的方法
        getlist(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
            })
            this.$http.get('/m_kugou/rank/list&json=true').then((data)=>{
                this.list = data.data.rank.list
            }).then(()=>{
                Indicator.close()
            })
        }
    },
    mounted() {
        this.getlist()
    },
}
</script>
<style lang="less">
    .rank-box{
        font-size: 16px;
        padding: 10px 5px;
        position: relative;
        border-bottom: 1px solid #e8e8e8;
        z-index: 999;
        .rank-box-span,.rank-box-mig{
            vertical-align: middle;
            padding-left: 25px;
        }
    }
    .rank-box:after{
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
        transform: translateY(-50%) rotate(45deg);
    }
</style>