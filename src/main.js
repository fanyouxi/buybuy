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

// 导入axios
import axios from "axios"
// 使用axios的方式获取全局的基础地址
axios.defaults.baseURL = 'http://111.230.232.110:8899/';

//写组件
import index from './components/index.vue'
// 详情页
import detail from './components/02-detail.vue'
// 购物车详情页
import shopCart from './components/03-shopCart.vue'
// 地址注册
import order from './components/04-order.vue'

//写路由规则
const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  },
  {
    path: '/detail/:artID',
    component: detail
  },
  {
    path: '/shopCart',
    component: shopCart
  },
  {
    path: '/order',
    component: order
  },
]

//初始化VueRouter对象
let router = new VueRouter({
  routes
});

// router导航守卫
router.beforeEach((to, from, next) => {
  // console.log("守卫了");
  // console.log(to);
  // console.log(from); 
  if (to.path == "/order") {
    // 正要去订单页
    axios.get('site/account/islogin').then(result => {
      // console.log(result);
      // 必须先判断登录
      if (result.data.code == "nologin") {
        // 提示用户先登录
        Vue.prototype.$Message.warning('请先登录');
        // 跳转页面
        router.push('/index')
      }
    })
  } else {
    // next()如果不执行,就会自动跳转
    next();
  }
})
// 注册全局过滤器 方便使用
// 导入 moment
import moment from "moment"
Vue.filter("shortTime", value => {
  //   console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  // console.log(moment(value).format("YYYY-MM-DD"));
  //   return '哈哈哈';
  return moment(value).format("YYYY-MM-DD");
});

//评论过滤器时间
Vue.filter("shortTimepinglun", value => {
  //   console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  // console.log(moment(value).format("YYYY-MM-DD hh:mm:ss"));
  //   return '哈哈哈';
  return moment(value).format("YYYY-MM-DD hh:mm:ss");
});


// 导入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// let data = JSON.parse(window.localStorage.getItem('hm24'));
// if (!data) {
//   data = {
//     84: 5,
//     90: 10
//   }
// }

// 实例化Vuex
const store = new Vuex.Store({
  // 状态
  state: {
    // count: 0
    // 购物车数据对象
    // 短路运算 || 如果没有数据 左边的值是 false 去获取 || 右边的值

    cartData: JSON.parse(window.localStorage.getItem('hm24')) || {
      84: 5,
      90: 10
    }
    // cartData: data
  },
  // Vuex的计算属性
  getters: {
    totalCount(state) {
      // 通过state获取内部的数据 计算并返回
      let num = 0;
      for (const key in state.cartData) {
        // 数据累加
        num += state.cartData[key]
      }
      return num;
    }
  },
  // 数据改变的方法
  mutations: {
    // 增加
    // increment(state,obj) {
    // console.log("触发了")
    // state.count++
    // state.count+=3  每次加3条数据
    // state.count += n
    // state.count+=m
    // console.log(state);
    // console.log(obj);

    // 约定 对象的属性名  goodId(商品id)  goodNum(商品个数)
    add2Cart(state, obj) {

      // console.log(obj)
      // 商品已经存在
      if (state.cartData[obj.goodId] != undefined) {
        state.cartData[obj.goodId] += obj.goodNum

      } else {
        // 商品不存在
        //  动态添加键值对
        //  state.cartData[obj.goodId] = obj.goodNum;
        Vue.set(state.cartData, obj.goodId, obj.goodNum);



      }
      // console.log(state);

    },
    // 添加一个修改数据的方法
    undateCartData(state, obj) {
      // console.log(obj);
      state.cartData = obj;


    }
  }
})
// 浏览器关闭保存数据
window.onbeforeunload = function () {
  window.localStorage.setItem('hm24', JSON.stringify(store.state.cartData))
}

// vue实例化
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')