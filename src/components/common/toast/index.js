
import Toast from './Toast'

const obj = {}

obj.install = function (vue) {

  // 1 创建组件构造函数
  const toastContrustor = vue.extend(Toast);
  // 2 new 的方式，根据组件构造器，构建出来一个组件对象
  const toast = new toastContrustor();
  // 3 将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));
  // 4 toast.$el 对应的就是div
  document.body.appendChild(toast.$el);
  //  5 添加到vue 原型上
  vue.prototype.$toast = toast;
}

export default obj