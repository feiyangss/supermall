<template>
  <div class="tabbar-item" @click="btnClick">
    <div v-if="!isActive">
      <slot name="item-img"></slot>
    </div>
    <div v-else>
      <slot name="item-aimg"></slot>
    </div>
    <div :style="isColor">
      <slot name="item-text"></slot>
    </div>
    </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      aColor: {
        type: String,
        default: 'red'
      }
    },
    components: {
    
    },
    data () {
      return {
      isActive1: true
      }
    },
    methods: {
      btnClick() {
        // console.log(this.$route.path);
        this.$router.push(this.path).catch(err => err)
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      isColor() {
        return this.isActive ? {color: this.aColor} : {}
      }
    },
 }
</script>

<style scoped>
.tabbar-item{
  flex: 1;
  height: 49px;
  text-align: center;
  height: 49px;
  font-size: 14px; 
}
.tabbar-item img{
  width: 24px;
  height: 24px;
  margin-top: 0px;
  margin-bottom: 1px;
  vertical-align: middle;
}
</style>