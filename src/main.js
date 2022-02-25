import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//  导入toast 插件
import toast from '@/components/common/toast'
//  安装toast 插件
Vue.use(toast)

// 解决移动端300ms 延时
import fastclick from 'fastclick'
fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
