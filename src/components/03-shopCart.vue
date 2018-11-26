<template>

    <div class="shopCart">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 有数据的提示内容 -->
                                <tr v-for="(item, index) in goodsList" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.isSelected" active-color="#13ce66" inactive-color="#9e9e9e">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img :src="item.img_url" alt="">
                                        <span>{{item.title}}</span>
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    <td><el-input-number v-model="item.buycount" size="mini" :min="1"></el-input-number></td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td>
                                     <el-button type="danger" @click="delOne(item.id)" icon="el-icon-delete" circle></el-button>
                                    </td>
                                </tr>
                                <!-- 没有商品的数据提示内容 -->
                                <tr v-show="goodsList.length == 0">
                                    <td>
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectedCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selectedPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                             <router-link to="/order">
                            <button class="submit">立即结算</button>
                            </router-link>

                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>

        <audio controls="controls" style="display: none;"></audio>
    </div>
</template>

<script>
// 导入axios
import axios from 'axios'
export default {
  name: "default",
  data: function() {
    return {
        // 购买商品数量
      goodsList:[]
    };
  },
//   方法
methods:{
    // 删除添加到购物车的商品
    delOne(id){
        this.$confirm('此操作将永久删除该商品, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // 删除数据
            // 删除当前这个组件中的数据
            this.goodsList.forEach((v,index)=>{
                if(v.id == id){
                    this.goodsList.splice(index,1);
                }
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }

},
// 计算属性
computed:{
    selectedCount(){
        // 选中的个数
        let num = 0;
        this.goodsList.forEach(v=>{
            if(v.isSelected == true){
                num += v.buycount;
            }
        })
        return num;
    },

    // 选中的总金额
    selectedPrice(){
        let price =0;
        this.goodsList.forEach(v=>{
           if(v.isSelected == true){
            //    累加上购买个数
                price += v.buycount * v.sell_price;
           }
        })
         return price;
    }
},
  //   生命周期函数
  created() {
    // 生成id1 id2 id3
    let ids = "";
    // 用Vuex 获取数据
    for (const key in this.$store.state.cartData) {
      ids += key;
      ids += ",";
    }
    // 取消最后一个,
    // console.log(ids.slice(0, ids.length - 1));
    ids = ids.slice(0, ids.length - 1);

    //调用接口
    axios.get(`site/comment/getshopcargoods/${ids}`)
    .then(result=>{
        // console.log(result);
    // 服务器返回的数据中是没有个数的 所以要自行拼接
    result.data.message.forEach(v => {
        // 通过id 获取个数 赋值给v.buycount
        v.buycount = this.$store.state.cartData[v.id]
       // 增加一个是否被选择的字段 用来切换 页面中的switch 开关
       v.isSelected = true;
    });
    console.log(result);
    this.goodsList = result.data.message;
        
    })
  },
//   使用watch观察数据的改变
  watch:{
      goodsList:{
        //   引用类型两次的值都是一样
        handler(val,oldVal){
            // console.log(val);
            // console.log(oldVal);
            // 最终需要的个数是id:个数
            let obj ={};
            val.forEach(v=>{
                // 动态添加属性
                obj[v.id]=v.buycount;

            });
            console.log(obj);
            // 同步修改Vuex中的数据
            this.$store.commit("undateCartData",obj)
        },
        // 深度观察 内部的属性改变也会触发
        deep:true

      }

  }
};
</script>

<style>
tr td img{
    width: 100px;
    height: 100px;
}
td>span{
   margin-left: 10px;  
}
td:nth-child(2){
    display: flex;
    align-items: center;
}
</style>
