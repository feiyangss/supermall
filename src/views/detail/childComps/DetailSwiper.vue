<template>
    <swiper class="detail-swiper" :loaded="loaded">
      <swiper-item class="swiper-item" v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="" @load="imgLoad(topImages.length)">
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      imagCount: 0,
      loaded: false
    };
  },
  methods: {
    imgLoad(length) {
      this.imagCount ++;
      if (this.imagCount == length) {
        this.loaded = true
      }
    }
  },
  computed: {},
 
};
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>