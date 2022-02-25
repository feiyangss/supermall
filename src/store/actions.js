import {ADD_COUNTER, ADD_TOCART} from '@/store/mutation-type'

export default {
  addCart({state,commit}, payload){
   return new Promise((resolve, reject) => {
      // 1. 查找之前数组是否有该商品
    let oldProduct = state.cartList.find( item => item.iid === payload.iid);
    // 2.判断是否有gai
    if (oldProduct) { // 数量加 1
      commit(ADD_COUNTER, oldProduct);
      resolve('当前商品的数量+1')
    }else {          // 添加新的商品
      commit(ADD_TOCART, payload)
      resolve('新商品数量+1')
    } 
   })
  }
}