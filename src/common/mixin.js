
import BackTop from "components/content/backtop/BackTop.vue";

export const backTopMixin = {
  
  components: {
    BackTop,
  },
  data() {
    return {
      backTop: false,
    }
  },
  methods: {
    // 返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    listenShowBackTop(position) {
      this.backTop = -position.y > 1000;
    }
  }
}