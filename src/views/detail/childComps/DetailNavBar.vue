<template>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" 
        class="title-item" :class="{active: currentIndex == index}" 
        @click="tutleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },

  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    };
  },
  methods: {
    tutleClick(index) {
     this.currentIndex = index;
     this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.go(-1)
    }
  },
  computed: {},
};
</script>

<style scoped>
.nav-bar {
  position: relative;
  background-color: white;
  z-index: 9;
}
.back {
    margin-top: 5px;
    
  }

  .title {
    display: flex;
    z-index: 9;
    padding: 0 20px;
  }

  .title-item {
    flex: 1;
    font-size: 14px;
  }

  .active {
    color: var(--color-high-text)
  }
  
</style>