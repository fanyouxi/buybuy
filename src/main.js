import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入全局样式
import './assets/site/css/style.css'
//导入路由
import VueRouter from 'vue-router'
// 注册到vue上
Vue.use(VueRouter)

//导入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
 //注册到vue上
Vue.use(ElementUI);

//导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 注册到vue上
Vue.use(iView);

//写组件
 import index from './components/index.vue'

// 详情页
 import detail from './components/02-detail.vue'

//写路由规则
const routes =[
  {path:'/',redirect:'/index'},
  {path:'/index',component:index},
  {path:'/detail/:artID',component:detail},
]

//初始化VueRouter
let router = new VueRouter({
  routes
});
// 注册全局过滤器 方便使用
// 导入 moment
import moment from "moment"
Vue.filter("shortTime",value => {
    //   console.log(value);
    // 处理时间数据
    // 返回处理之后的数据
    // 要显示什么 就返回什么
    // console.log(moment(value).format("YYYY-MM-DD"));
    //   return '哈哈哈';
    return moment(value).format("YYYY-MM-DD");
  });

//评论过滤器时间
Vue.filter("shortTimepinglun",value => {
    //   console.log(value);
    // 处理时间数据
    // 返回处理之后的数据
    // 要显示什么 就返回什么
    // console.log(moment(value).format("YYYY-MM-DD hh:mm:ss"));
    //   return '哈哈哈';
    return moment(value).format("YYYY-MM-DD hh:mm:ss");
  });


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
