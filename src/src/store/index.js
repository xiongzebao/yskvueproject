import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import culture from './modules/culture/culture'
import mainIndex from './modules/mainIndex/mainIndex'
Vue.use(Vuex);
export default new Vuex.Store({
//	actions,
//	getters,
  	modules: {
	   culture,
	   mainIndex
  	}
 
})