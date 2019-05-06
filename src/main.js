import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import './assets/styles/border.css'
import './assets/styles/reset.css'
import './assets/styles/common.css'
import VueLazyload from 'vue-lazyload'
import { NavBar, Icon } from 'vant'
import { Loading } from 'vux'
import Mui from 'vue-awesome-mui'
import axios from 'axios'
FastClick.attach(document.body)
axios.defaults.baseURL = 'http://www.lvxiaoluo.com/lvxiaoluo'
// http request 拦截器/请求前处理

axios.interceptors.request.use(
  config => {
    let token = window.localStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// 判断token失效跳转/请求后处理
axios.interceptors.response.use(response => {
  if (response) {
    switch (response.data) {
      case 403: // 与后台约定登录失效的返回码,根据实际情况处理
        localStorage.removeItem('token') // 删除用户登录验证的key值，即token值
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
    }
  }
  return response
}, error => {
  return Promise.reject(error.response.data) // 返回接口返回的错误信息
})

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(NavBar, Icon)
Vue.use(Mui)
Vue.use(VueLazyload)
Vue.component('loading', Loading)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
