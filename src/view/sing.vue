<template>
    <!-- 歌单 -->
    <div class="page-sing">
        <a v-for="(item,index) in list" :key="index" :href="`/sing/info/${item.specialid}`">
            <div class="sing-box">
                <img :src="item.imgurl.replace('{size}', '400')" alt="" width="60px" height="60px" 
                class="sing-box-img">
                <span class="song-box-span">{{item.specialname}}</span>
                <span class="sing-label">{{ item.playcount }}</span>
            </div>
        </a>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'
export default {
    data() {
        return {
            list:[],
        }
    },
    methods: {
        getlist(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
            })
            this.$http.get('/m_kugou/plist/index&json=true').then((data)=>{
                this.list = data.data.plist.list.info
                console.log(this.list.specialid)
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
    .sing-box{
        position: relative;
        padding: 10px 5px;
        border-bottom: 1px solid #e8e8e8;
        .sing-box-img{
            vertical-align: middle;
            padding-left: 20px;
        }
    }
    .song-box-span{
        font-size: 16px;
        position: absolute;
        left: 100px;
        top: 25px;
        padding-right: 40px;
        height: 16px;
        overflow: hidden;
        line-height: 16px;
    }
    .sing-label::before{
        content: '';
        display: inline-block;
        margin-right: 6px;
        width: 12px;
        height: 12px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAkFBMVEWZmZn///+ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZnXdS81AAAAL3RSTlMAAAENExQdHh8hJCU3OEhNTltcYHR1eHx9hYeIlZaZmqarztTZ2tvc3fHz+fv8/rBVCGIAAACgSURBVBjTpdDLDoIwEIXhCio3RRHUIverAnX6/m/nFBwDCTv/TXO+dNGUbVZi68hUh6zquio7jmPCbQ5QFkUJkO8IrVrEhrqyj0VtTag3vcu+uX2jj5jAif06Q6LQECmblQoD8Q7mHE3giH7AFgU+vXMRYjjI1qZtt3IIEd9SSk54xTEg4iEfhDe1/scXHhdCD8cT0eGRpxFqXsSd9Z//ACaMEn/WbtR7AAAAAElFTkSuQmCC) no-repeat center;
        background-size: 100%;
    }
    .sing-label{
        position: absolute;
        left: 100px;
        top: 40px;
        color: #888;
        display: block;
        font-size: 12px;
        margin-top: 6px;
    }
</style>