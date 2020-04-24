import Vue from 'vue'
import Router from 'vue-router'
import song from '../view/song'
import rank from '../view/rank'
import sing from '../view/sing'
import singer from '../view/singer'
import rankin from '../view/rankin'
import singin from '../view/singin'
import singerlist from '../view/singerlist'
import singerin from '../view/singerin'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/song',
      name: 'song',
      component: song,
      alias: '/'
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
    },
    {
      path: '/sing',
      name: 'sing',
      component: sing,
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
    },
    {
      path: '/rank/info/:id',
      component: rankin
    },
    {
      path: '/sing/info/:id',
      component: singin
    },
    {
      path: '/singer/list/:id',
      component: singerlist
    },
    {
      path: '/singer/info/:id',
      component: singerin
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
