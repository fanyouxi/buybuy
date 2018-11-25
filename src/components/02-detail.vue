<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <!-- 用element做的计数器(购买数量) -->
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" :min="1" :max="goodsinfo.stock_quantity"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="add2Cart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                               <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="tabIndex=0" :class="{selected:tabIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="tabIndex=1" :class="{selected:tabIndex==1}" >商品评论</a>
                                    </li>
                                </ul>
                               </div>
                            </Affix>
                            <div class="tab-content entry" v-html="goodsinfo.content" v-show="tabIndex == 0">
                             
                            </div>
                            <div class="tab-content" v-show="tabIndex == 1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="comment" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="submitComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="totalcount == 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item,index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <!-- 过滤器 -->
                                                    <span>{{item.add_time | shortTimepinglun}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- 使用iview做的分页 -->
                                         <Page :total="totalcount" show-sizer show-elevator @on-page-size-change="sizeChange" :current="pageIndex" @on-change="pageChange" placement="top" :page-size-opts="[6,8,10]" :page-size="pageSize" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class="">  -->
                                          <router-link :to="'/detail/' + item.id">
                                               <img :src="item.img_url">
                                          </router-link>
                                                
                                                                      
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/' + item.id">
                                            {{item.title}}
                                            </router-link>
                                            <!-- </a> -->
                                            <!-- 过滤器 -->
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 使用iview框架 返回顶部 -->
        <BackTop :height="100" :bottom="200">
             <div class="top">返回顶端</div>
        </BackTop>
    </div>
</template>

<script>
// 导入axios
import axios from "axios";
//导入moment
import moment from "moment";
export default {
  name: "detail",
  data: function() {
    return {
      // 商品id
      artID: "",
      // 服务器返回的商品数据
      // 商品详情
      goodsinfo: {},
      // 热卖商品
      hotgoodslist: [],
      // 图片列表
      imglist: [],
      //购买数量
      buyCount: 1,

      //记录点击tap栏所有
      tabIndex:0,

      //页码
      pageIndex:1,
      //页容量
      pageSize:6,

      //评论信息
      comments:[],

      //总评论数
      totalcount:0,

      //发布评论
      comment:''

    };
  },
  methods:{
      initData(){
        //   初始化购买个数
        this.buyCount =1;
        //   保存数据
          this.artID = this.$route.params.artID;
        //   调用接口 获取详情数据 axios
        axios
      .get(`http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`)
      .then(result => {
        // console.log(result);

        this.goodsinfo = result.data.message.goodsinfo;
        this.hotgoodslist = result.data.message.hotgoodslist;
        this.imglist = result.data.message.imglist;
      });
      //调用获取评论的方法
      this.getComments();     
      },
      //获取评论数据
      getComments(){
          axios.get(`http://111.230.232.110:8899/site/comment/getbypage/goods/${this.artID}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
      .then(result =>{
        //   console.log(result);
          //评论内容
          this.comments = result.data.message;
          //总评论数
          this.totalcount = result.data.totalcount;    
      })
      },
      //显示评论
      pageChange(pageIndex){
        //   console.log(pageIndex);
        this.pageIndex = pageIndex;
        // 获取评论
        this.getComments();        
      },
     //页容量改变
      sizeChange(pageSize){
          this.pageSize = pageSize;
        //   获取评论
          this.getComments();

      },
    //   提交评论
      submitComment(){
          //判断是否非空
          if(this.comment == ''){
            //   iview 视图 message全局提示
              this.$Message.warning('内容不能为空,请输入内容');
          }else{
              // 内容
              axios.post(`site/validate/comment/post/goods/${this.artID}`,{
                  commenttxt:this.comment
              }).then(result=>{
                //   console.log(result);
                  if(this.data.status == 0){
                      this.$Message.success('this.data.message');
                    //   清空
                    this.commnet =''
                    // 
                    this.pageIndex = 1;
                    // 获取评论
                    this.getComments();
                  }
              })

          }
      },
    //   加入购物车
      add2Cart(){
        //   获取商品id
        // 获取商品数量
        // 获取提交载荷
        this.$store.commit("add2Cart",{
            // 商品id
            goodId:this.artID,
            // 商品数量
            goodNum:this.buyCount
        })

      }   
  },
  //生命周期函数
  created() {
      console.log(this.$route.params);
    this.initData();
  
  },
  //侦听器
  watch:{
      $route(newval,oldval){
          this.initData();
      }
  },


};
</script>

<style>
   .tab-content img {
       display: block;
       max-width: 100%;
   }
   .top{
       background-color: red;
        padding: 10px;
        color: #fff;
        text-align: center;
        border-radius: 2px;
   }
</style>
