<template>
  <div class="bottom-bar">
    <div class="check-button">
      <check-button class="check" :is-checked="isSelectAll" 
       @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <span class="total">合计：{{totalPrice | showPrice}}</span>
    <div class="com" @click="btnClick">去计算: {{totalCom}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckButton from '@/components/content/checkButton/CheckButton.vue'
  export default {
    name: 'CartBottomBar',
    components: {
    CheckButton 
    },
    computed: {
       ...mapGetters(['cartList']),
      totalPrice() {
        return this.$store.state.cartList.filter( item => {
          return item.cheched
        }).reduce( (preValue, item) => {
          return preValue + item.services * item.count
        }, 0)
      },
      totalCom() {
        return this.$store.state.cartList.filter( res => {
          return res.cheched
        }).length
      },
      isSelectAll() {
      if(this.cartList.length === 0) return false
       return !(this.cartList.filter( item => !item.cheched).length)
      }
    },
    data () {
 
        return {

      }
    },
    methods: {
      checkClick() {
        // 1.判断是否有未选中的按钮
        // let isSelectAll = this.cartList.find(item => !item.checked);

        if(this.isSelectAll){
          this.cartList.forEach(item => item.cheched = false);
        }else {
          this.cartList.forEach(item => item.cheched = true);
        }
      },
      btnClick() {
        this.$toast.show()
      }
    },
    filters: {
      showPrice: function(value) {
       return value.toFixed(2)
      }
    },
    
 }
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  position: relative;
  /* bottom: 40px; */
}
.check-button {
   display: inline;
}
.check-button .check{
  display: inline;
  width: 20px;
  height: 20px;
  line-height: 20px;
  /* position: absolute;
  top: 10px;
  left: 10px; */
  margin: 0 5px 0 10px;
}
.total {
  margin-left: 20px;
}
.com {
  /* display: inline-flex; */
  /* position: relative; */
  position: absolute;
  top: 0px;
  right: 0;
  height: 40px;
  width: 100px;
  margin-right: 0;
  background: red;
  color: white;
}
</style>