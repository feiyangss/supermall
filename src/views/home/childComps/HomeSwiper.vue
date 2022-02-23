<template>
  <swiper :loaded="loaded">
    <swiper-item v-for="(item, index) in banners" :key='index'>
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad(banners.length)" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>

import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false,
      imagecount: 0,
      loaded: false
    };
  },
  methods: {
    imageLoad(num) {
      if (!this.isLoad) {
         this.$emit('swiperImageLoad')
         this.isLoad = true
      };
      this.imagecount ++
      if(this.imagecount == num){
        this.loaded = true;
      }
    }
  },
  computed: {},
  
};
</script>

<style scoped>
</style>