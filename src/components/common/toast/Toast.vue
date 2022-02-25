<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
  export default {
    name: 'Toast',
    data () {
      return {
        message: '',
        isShow: false,
        timer: null
      }
    },
    methods: {
      show(message='默认添加', duration=1000) {
        this.isShow = true;
        this.message = message
        
       window.clearTimeout(this.timer);
       this.timer = setTimeout(() => {
          this.isShow = false;
          this.message = ''
        }, duration)
      }
    },
    computed: {

    },
 }
</script>

<style scoped>
.toast {
  position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(0,0,0,.8);
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
    z-index: 99;
}
</style>