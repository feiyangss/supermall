<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
    },
    components: {
    },
    data () {
      return {
        scroll: null,
        message: '您好'
      }
    },
    mounted() {
      //1 创建BSscroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true,
      observeImage: true,
      click: true,
      
      });
      // 2 监听滚恶事件
      this.scroll.on('scroll', position => {
        // console.log(position);
        this.$emit('scroll', position)
      })
      // 监听上拉事件
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp');
      })
    },
    methods: {
      scrollTo(x, y, time=300) {
       this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
       this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
    computed: {

    },
 }
</script>

<style scoped>

</style>