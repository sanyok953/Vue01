
export default {
	state: {
		loading: false,
		//langs: localStorage.getItem('lang') || 'en',
		error: null
	},
	mutations: {
		/*setLangs (state, payload) {
			state.langs = payload
		},*/
		setLoading (state, payload) {
			state.loading = payload
		},
		setError (state, payload) {
			state.error = payload
		},
		clearError (state) {
			state.error = null
		}
	},
	actions: {
		/*setLangs ({commit}, payload) {
			commit('setLangs', payload)
		},*/
		setLoading ({commit}, payload) {
			commit('setLoading', payload)
		},
		setError ({commit}, payload) {
			commit('setError', payload)
		},
		clearError ({commit}) {
			commit('clearError')
		}
	},
	getters: {
		loading (state) {
			return state.loading
		},
		error (state) {
			return state.error
		},
		/*langs (state) {
			return state.langs
		}*/
	}
}
