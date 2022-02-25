import {ADD_COUNTER, ADD_TOCART} from './mutation-type'


export default {
  [ADD_COUNTER](state, payload) {
    payload.count ++
  },
  [ADD_TOCART](state, payload) {
    payload.cheched = true;
    payload.count = 1;
    state.cartList.push(payload)
  },
  
}