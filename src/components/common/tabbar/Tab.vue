<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
#tabbar{
  /* height: 49px; */
  background-color:  #f6f6f6;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, .3);
}
</style>