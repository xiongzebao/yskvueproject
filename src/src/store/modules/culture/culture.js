import * as types from '../../mutation-types';
/*初始化count*/
const state={
    count:1
}
// mutations
const mutations={
    [types.ADD_TO_COUNt](state){
        state.count++;
    },
    [types.REDUCE_TO_COUNt](state){
        state.count--;
    }
}
export default {
  state,
  mutations
}