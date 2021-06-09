import Vue from 'vue'
import Vuex from 'vuex'
import news from './news'
import team from './team'
import games from './games'
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
		news, team, games, user, shared
	}
})
