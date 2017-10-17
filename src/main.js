// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import App from './App'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
// styl文件统一引入
import "common/stylus/index.styl"

Vue.use(Router)
Vue.use(Resource)

const routes = [{
    path: '/',
    redirect: '/goods'
  },{
    path: '/goods',
    component: Goods
  }, {
    path: '/ratings',
    component: Ratings
  }, {
    path: '/seller',
    component: Seller
  }]

const router = new Router({
  linkActiveClass: 'active',
  routes
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  render: h => h(App)
   
})
