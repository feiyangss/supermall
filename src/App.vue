<template>
  <div id="app">
    <keep-alive exclude="Detail">
       <router-view></router-view>
    </keep-alive>
    <main-tab></main-tab>
  </div>
</template>

<script>
import MainTab from "components/content/mainTabbar/MainTab.vue";

export default {
  name: "App",
  components: {
    MainTab,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
@import "assets/css/base.css";
</style>