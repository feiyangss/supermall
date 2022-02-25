<template>
  <div class="check-button" :class="{Checked: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    },
    components: {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    },
 }
</script>

<style scoped>
.check-button {
 
  border-radius: 50%;
  border: 2px solid #aaa;
}
.Checked {
   background-color: red;
  border-color: red;
}
</style>