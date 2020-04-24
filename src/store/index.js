import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        audio: {
          songUrl: '', //歌曲路径
          imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png', //歌曲图片
          title: '',  //歌曲名称
          singer: '', //歌手
          },
        detailPlayerFlag: false,//大屏幕开关
        isPlay: true,//暂停 播放开关
        //当前歌单 
        listInfo: {
          songList: [], //储存歌曲库
          songIndex: 0
        }
    },
    mutations:{
          setAudio (state, audio) {
            //数据传输 返回给player
            state.audio = {...(state.audio), ...audio}
          },
          //大屏幕显隐
          showDetailPlayer: (state, flag) => {
            state.detailPlayerFlag = flag
          },
          //播放开关
          isPlay: (state, flag) => {
            state.isPlay = flag
          },
          //歌词
          setLrc: (state, lrc) => {
            state.audio = {...state.audio, lrc}
          },
          //上下曲赋值
          setListInfo: (state, {list, index}) => {
            state.listInfo.songList = list
            state.listInfo.songIndex = index
          }
    },
    getters: {
      //state赋值
      audio: state => state.audio,
      audioLoading: state => state.audioLoading, 
      detailPlayerFlag: state => state.detailPlayerFlag,
      isPlay: state => state.isPlay
    },
    actions:{
        //请求歌曲
        getSong ({commit}, hash) {
          if (hash) {
            axios.get(`/m_kugou/api/v1/song/get_song_info?cmd=playInfo&hash=${hash}`).then((res) => {
              const data = res.data
              const songUrl = data.url  //MP3路径
              const imgUrl = data.imgUrl.replace('{size}', 400) //图片
              const title = data.songName //歌名
              const songLength = data.timeLength //长度
              const singer = data.singerName //歌手
              const currentLength = 0 // 歌曲初始进度
              const audio = { songUrl, imgUrl, title, singer, songLength, currentLength }
              if(this.state.isPlay){
                this.state.isPlay = !this.state.isPlay
              }
              commit('setAudio', audio)
            })
          }
        },
        //获取歌词
        getLrc ({commit}, { hash, timelength }) {
          if (hash && timelength) {
            axios.get(`/m_kugou/app/i/krc.php?cmd=100&timelength=${timelength}&hash=${hash}`)
            .then(res => {
              console.log(res)
              commit('setLrc', res.data)
            })
          }
        },
        //上一曲
        prev ({dispatch, state}) {
          const list = state.listInfo.songList
          if (state.listInfo.songIndex === 0) {
            state.listInfo.songIndex = list.length-1
          } else {
            state.listInfo.songIndex--
          }
          const hash = list[state.listInfo.songIndex].hash
          const timelength = list[state.listInfo.songIndex].duration*1000
          dispatch('getSong', hash)
          dispatch('getLrc',{hash,timelength})
        },
        //下
        next ({dispatch, state}) {
          const list = state.listInfo.songList
          if (state.listInfo.songIndex === list.length - 1) {
            state.listInfo.songIndex = 0
          } else {
            ++state.listInfo.songIndex
          }
          const hash = list[state.listInfo.songIndex].hash
          const timelength = list[state.listInfo.songIndex].duration*1000
          dispatch('getSong', hash)
          dispatch('getLrc',{hash,timelength})
        }
      }
})
export default store