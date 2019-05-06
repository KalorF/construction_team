import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/homepage/Home'
import Personal from '@/pages/personalpage/personal'
import Notices from '@/pages/notices/notice'
import Wallet from '@/pages/walletpage/wallet'
import Finish from '@/pages/walletpage/finish'
import Unfinish from '@/pages/walletpage/unfinish'
import MonthData from '@/pages/homepage/monthData'
import ShowMember from '@/pages/personalpage/showMember'
import changeFace from '@/pages/personalpage/changeFace'
import PerMsg from '@/pages/msgpage/perMsg'
import UonMsg from '@/pages/msgpage/uonMsg'
import Evaluate from '@/pages/evaluatepage/evaluateList'
import showEvaluate from '@/pages/evaluatepage/showEvaluate'
import login from '@/pages/loginpage/login'
import forgetPwd from '@/pages/loginpage/forgetPwd'
import resetPwd from '@/pages/loginpage/resetPwd'
import order from '@/pages/orderpage/orderHome'
import writeFirstData from '@/pages/orderpage/components/first/writeFirstData'
import viewFirst from '@/pages/orderpage/components/viewFirst'
import viewOrder from '@/pages/orderpage/components/order/viewOrder'
import finishDetail from '@/pages/orderpage/components/finishDetail'
import writeSecondData from '@/pages/orderpage/components/second/writeSecondData'
import secondDetail from '@/pages/orderpage/components/secondDetail'
import viewSecondReport from '@/pages/orderpage/components/viewSecondReport'
import uploadPicture from '@/pages/orderpage/components/order/uploadPicture'
import resetFirst from '@/pages/orderpage/components/first/resetFirst'
import writePrice from '@/pages/orderpage/components/first/writePrice'
import writeToolPrice from '@/pages/orderpage/components/first/writeToolPrice'
import resetToolPrice from '@/pages/orderpage/components/first/resetToolPrice'
import holiday from '@/pages/homepage/holiday'
import changePwd from '@/pages/personalpage/changePwd'
Vue.use(Router)
Router.prototype.goBack = () => {
  window.history.go(-1)
}
const router = new Router({
  routes: [
    {path: '/login', name: 'login', meta: {index: -2}, component: login},
    {path: '/forgetPwd', name: 'forgetPwd', meta: {index: -1}, component: forgetPwd},
    {path: '/resetPwd', name: 'resetPwd', meta: {index: 0}, component: resetPwd},
    {path: '/', name: 'Home', meta: {index: 0, requiresAuth: true}, component: Home},
    {path: '/holiday', name: 'holiday', meta: {index: 1}, component: holiday},
    {path: '/order', name: 'order', meta: {index: 1}, component: order},
    {path: '/writeFirstData', name: 'writeFirstData', meta: {index: 2}, component: writeFirstData},
    {path: '/viewFirst', name: 'viewFirst', meta: {index: 2}, component: viewFirst},
    {path: '/resetFirst', name: 'resetFirst', meta: {index: 2}, component: resetFirst},
    {path: '/writePrice', name: 'writePrice', meta: {index: 2}, component: writePrice},
    {path: '/writeToolPrice', name: 'writeToolPrice', meta: {index: 2}, component: writeToolPrice},
    {path: '/resetToolPrice', name: 'resetToolPrice', meta: {index: 2}, component: resetToolPrice},
    {path: '/viewOrder', name: 'viewOrder', meta: {index: 2}, component: viewOrder},
    {path: '/uploadPicture', name: 'uploadPicture', meta: {index: 2}, component: uploadPicture},
    {path: '/finishDetail', name: 'finishDetail', meta: {index: 2}, component: finishDetail},
    {path: '/writeSecondData', name: 'writeSecondData', meta: {index: 2}, component: writeSecondData},
    {path: '/secondDetail', name: 'secondDetail', meta: {index: 2}, component: secondDetail},
    {path: '/viewSecondReport', name: 'viewSecondReport', meta: {index: 2}, component: viewSecondReport},
    {path: '/personal', name: 'Personal', meta: {index: 1}, component: Personal},
    {path: '/changePwd', name: 'changePwd', meta: {index: 2}, component: changePwd},
    {path: '/changeFace', name: 'changeFace', meta: {index: 2}, component: changeFace},
    {path: '/perMsg', name: 'PerMsg', meta: {index: 2}, component: PerMsg},
    {path: '/uonMsg', name: 'UonMsg', meta: {index: 2}, component: UonMsg},
    {path: '/showMember', name: 'ShowMember', meta: {index: 2}, component: ShowMember},
    {path: '/notices', name: 'Notices', meta: {index: 1}, component: Notices},
    {path: '/wallet', name: 'Wallet', meta: {index: 1}, component: Wallet},
    {path: '/finish', name: 'Finish', meta: {index: 2}, component: Finish},
    {path: '/unfinish', name: 'Unfinish', meta: {index: 2}, component: Unfinish},
    {path: '/monthData', name: 'MonthData', meta: {index: 1}, component: MonthData},
    {path: '/evaluate', name: 'Evaluate', meta: {index: 1}, component: Evaluate},
    {path: '/showEvaluate', name: 'showEvaluate', meta: {index: 2}, component: showEvaluate}
  ]
})
// 进入路由前判断是否存在token
router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth) && (token === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (to.name === 'resetPwd') {
    next()
  } else {
    next()
  }
})
export default router
