<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick" ref="tabControl1" 
        class="tab-control" v-show="isTabFixed"
      ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll" @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature></feature>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick" ref="tabControl2" 
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="backTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backtop/BackTop.vue";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import Feature from "./childComps/Feature.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";

import {debounce} from "common/utils"

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      backTop: false,
      taboffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

   
  },
  methods: {
    /* 
    事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
      // console.log(this.$refs.scroll.message);
    },

    contentScroll(position) {
      //  判断backtop是否显示
      this.backTop = -position.y > 1000;
      // 决定tabcontrol是否吸顶
      this.isTabFixed = (-position.y) > this.taboffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
        // 获取tabControl的offsetTop
    this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /* 
    网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        (this.banners = res.data.banner.list),
          (this.recommends = res.data.recommend.list);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page + 1;
        
        this.$refs.scroll.finishPullUp()
      });
    },
 
  },
  mounted() {
     // 3 监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 300)
  
    this.$bus.$on('itemIamgeload', () => {
      refresh()
      // this.$refs.scroll.refresh()
    })
  
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* height: 400px; */
  /* height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px; */
}
.tab-control{
  position: relative;
  z-index: 5;
}
/* .fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
</style>