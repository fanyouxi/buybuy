import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入全局样式
import './assets/site/css/style.css'
//导入路由
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//写组件
 import index from './components/index.vue'

//写路由规则
const routes =[
  {path:'/',redirect:'/index'},
  {path:'/index',component:index},

]

//初始化VueRouter
let router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
