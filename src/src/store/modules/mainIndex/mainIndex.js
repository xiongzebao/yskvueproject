import * as types from '../../mutation-types';
/*初始化count*/
/*报考标志*/
const state={
    count:false
}
// mutations
const mutations={
    [types.REFRESH_BAOKAO](state){
        state.count=!state.count;
    }
}
export default {
  state,
  mutations
}