<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll
      :probe-type="3"
      :pull-up-load="true"
      class="content"
      ref="scroll"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop :shop="shop"></detail-shop>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="goodsList"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="backTop"></back-top>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
  </div>
</template>
 
<script>
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
import { debounce } from "common/utils";
import {backTopMixin} from "common/mixin"


import Scroll from "@/components/common/scroll/Scroll.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";


import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailShop from "./childComps/DetailShop.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailShop,
    DetailBaseInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
   
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      res: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodsList: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
      
    };
  },
  created() {
    // 1.取出iid
    this.iid = this.$route.params.iid;

    // 2.发送商品请求
    this._getDetail(this.iid);

    // 3.请求推荐请求
    this._getRecommend();

    
  },
  methods: {
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300);
    },
    imageLoad() {
      // 4 给getThemeTopY赋值, 防抖操作
      debounce(() => {
       this.themeTopY = [];
       this.themeTopY.push(0);
       this.themeTopY.push(this.$refs.param.$el.offsetTop);
       this.themeTopY.push(this.$refs.comment.$el.offsetTop);
       this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
       this.themeTopY.push(Number.MAX_VALUE);
      }, 100)()
    },
    _getDetail(iid) {
      getDetail(iid).then((res) => {
        // 1.获取数据
        const data = res.result;
        // console.log(data);
        // 2 获取顶部轮播图数据
        this.topImage = data.itemInfo.topImages;
        //  3. 获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 4.获取店铺信息
        this.shop = new Shop(data.shopInfo);
        // 5.获取商品详细信息
        this.detailInfo = data.detailInfo;
        // 6.保存参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 7.保存评论数据
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    _getRecommend() {
      getRecommend().then((res) => {
        this.goodsList = res.data.list;
      });
    },
    contentScroll(position) {
      // 1 获取 y值
      let positionY = -position.y;
      // 2 y值和主题中的值对比
      let length = this.themeTopY.length;
      for (let i = 0; i < length-1; i++) {
        if(this.currentIndex !== i){
          if(positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1]){
           this.currentIndex = i;
           this.$refs.nav.currentIndex = this.currentIndex
        }
        }
      };
     // 3 返回顶部
      this.listenShowBackTop(position)
    },
    addCart() {
      // 1 获取购物车需要展示的信息
      const product ={};
      product.image = this.topImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.services = this.goods.realPrice;
      product.iid = this.iid
      // 2.将商品加入到购物车
      this.$store.dispatch('addCart', product).then( res => {
        console.log(res);
        this.$toast.show( res, 1000)
      })
    }
      
    
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
}
</style>