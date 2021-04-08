import Vue from 'vue'
import Vuex from 'vuex'
import news from './news'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		news, user, shared
	}
})
