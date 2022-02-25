<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <cart-list></cart-list>

    <cart-bottom-bar></cart-bottom-bar>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NavBar from '@/components/common/navbar/NavBar.vue';

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  data() {
    return {};
  },
  computed: {
  ...mapGetters(['cartLength']),

  },
  

};
</script>

<style scoped>
 .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: 700; */
  }
  .cart {
    height: 100vh;
  }
</style>