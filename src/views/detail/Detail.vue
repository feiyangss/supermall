<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick"></detail-nav-bar>
    <scroll :probe-type="3" :pull-up-load="true" class="content" ref="scroll">
      <detail-swiper :top-images="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop :shop="shop"></detail-shop>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="goodsList"></goods-list>
    </scroll>
      <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>
 
<script>
import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";
import {debounce} from 'common/utils'

import Scroll from "@/components/common/scroll/Scroll.vue";
import GoodsList from '@/components/content/goods/GoodsList.vue';

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailShop from "./childComps/DetailShop.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from './childComps/DetailBottomBar.vue'


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
       getThemeTopY: null
    };
  },
  created() {
    // 1.取出iid
    this.iid = this.$route.params.iid;

    // 2.发送商品请求
    this._getDetail(this.iid);

     // 3.请求推荐请求
    this._getRecommend();
    
    // 4 给getThemeTopY赋值, 防抖操作
    this.getThemeTopY = debounce(() => {
        this.themeTopY = [];
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.param.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopY);
      }, 500)

  },
  methods: {
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300)
    },
    imageLoad() {
      this.getThemeTopY()
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
       getRecommend().then( res => {
         this.goodsList = res.data.list
       })
      
    }
  },
  mounted() {
  },
  updated() {
    
  }
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