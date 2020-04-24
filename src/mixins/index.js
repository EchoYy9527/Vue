module.exports = {
    'PLAY_AUDIO': {
      methods: {
        //公用播放器
        playAudio (index) {
          //变量接对应歌曲的数据
          const songInfo = this.list[index]
          console.log(songInfo)
          //歌词  下标 赋值
          this.$store.commit('setListInfo', {
            list: this.list,
            index: index
          })
          // 根据变量数据  传参触发vuex方法
          this.$store.dispatch('getSong', songInfo.hash)
          //歌词
          this.$store.dispatch('getLrc', {
            hash: songInfo.hash,
            timelength: songInfo.duration * 1000 // 歌曲时间
          })
        },
      }
    }
  }