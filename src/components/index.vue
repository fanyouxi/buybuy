<template>
   
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!-- 分类类别 -->
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(it, i) in item.subcates" :key="it.id">
                                                {{it.title}}&nbsp;
                                            </span>
                                            
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(it, i) in itemsubcates" :key="it.id" href="/goods/43.html">{{it.title}}</a>
                                               
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <!-- 轮播图 -->
                    <div class="left-705">
                        <div class="banner-img">
                            <!-- <div id="focus-box" class="focus-box">
                                <ul class="slides">
                                    <li class="" style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;">
                                        <a href="/goods.html">
                                            <img style="width: 100%;height:100%;" src="http://39.108.135.214:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg" draggable="false">
                                        </a>
                                    </li>
                                    <li style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;" class="flex-active-slide">
                                        <a href="/goods.html">
                                            <img style="width: 100%;height:100%;" src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200314272543.jpg" draggable="false">
                                        </a>
                                    </li>
                                </ul>
                                <ol class="flex-control-nav flex-control-paging">
                                    <li>
                                        <a class="">1</a>
                                    </li>
                                    <li>
                                        <a class="flex-active">2</a>
                                    </li>
                                </ol>
                            </div> -->
                          <el-carousel height="341px">
                            <el-carousel-item v-for="item in sliderlist" :key="item.id">
                               <img :src="item.img_url" alt="">
                            </el-carousel-item>
                          </el-carousel>
                      
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <!-- 置顶推荐列表 -->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <!-- 过滤器 -->
                                    <span>{{item.add_time | shortTime}}</span>
                                </div>
                            </li>
                        
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="(item, index) in gropList" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="(it, i) in item.level2catelist" :key="it.subcateid" href="/goods/43.html">{{it.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(item, index) in item.datas" :key="item.artID">
                            <a href="#/site/goodsinfo/87" class="">
                                <div class="img-box">
                                    <router-link :to="'/detail/' + item.artID">
                                        <img :src="item.img_url">
                                    </router-link>
                                    
                                </div>
                                <div class="info">
                                    <h3>{{item.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{item.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{item.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{item.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
//导入axios
import axios from "axios";

//导入moment.js
import moment from "moment";

export default {
  name: "index",
  data: function() {
    return {
      // 分类数据
      catelist: [],
      // 轮播图数据
      sliderlist: [],
      // 置顶推荐数组
      toplist: [],

      //底部数据
      gropList: []
    };
  },
  //生命周期函数 在github中可以找到文档
  created() {
    axios
      .get("http://111.230.232.110:8899/site/goods/gettopdata/goods")
      .then(result => {
        console.log(result);
        this.catelist = result.data.message.catelist;
        this.sliderlist = result.data.message.sliderlist;
        this.toplist = result.data.message.toplist;
      }),
      axios
        .get("http://111.230.232.110:8899/site/goods/getgoodsgroup")
        .then(result => {
          // console.log(result);
          this.gropList = result.data.message;
        });
  },
  //私有过滤器  用moment.js 百度
  filters: {
    shortTime(value) {
      console.log(moment(value).format("YYYY-MM-DD"));
      // return 111;
      return moment(value).format("YYYY-MM-DD");
    }
  }
};
</script>
   
<style>

  .banner-img img {
      width: 100%;
      height: 100%;  
  }
</style>

