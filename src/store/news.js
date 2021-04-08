
export default {
	state: {
		news: [
			{
				en: {
					title: 'First',
					description: 'First de',
					text: 'First txt'
				},
				es: {
					title: 'Primer',
					description: 'Primer de',
					text: 'Primer txt'
				},
				ru: {
					title: 'Первый',
					description: 'Первый de',
					text: 'Первый txt'
				},
				date: '22-03-2020',
				promo: false,
				imageSrc: 'https://pbs.twimg.com/media/CbxjMb7WIAEjY8a.jpg',
				id: '1'
			},
			{
				en: {
					title: 'Second',
					description: 'Second de',
					text: 'Second txt'
				},
				es: {
					title: 'Segundo',
					description: 'Segundo de',
					text: 'Segundo txt'
				},
				ru: {
					title: 'Второй',
					description: 'Второй de',
					text: 'Второй txt'
				},
				date: '28-03-2021',
				promo: true,
				imageSrc: 'https://www.ejin.ru/wp-content/uploads/2018/11/zjv6swd8fsa.jpg',
				id: '2'
			},
			{
				en: {
					title: 'Third',
					description: 'Third de',
					text: 'Third txt'
				},
				es: {
					title: 'Tercer',
					description: 'Tercer de',
					text: 'Tercer txt'
				},
				ru: {
					title: 'Третий',
					description: 'Третий de',
					text: 'Третий txt'
				},
				date: '22-05-2021',
				promo: true,
				imageSrc: 'https://c1.wallpaperflare.com/preview/424/569/238/sky-dark-night-stars.jpg',
				id: '3'
			}
		]
	},
	mutations: {
		createNews (state, payload) {
			//console.log(payload)
			state.news.push(payload)
		}
	},
	actions: {
		createNews ({commit}, payload) {
			payload.id = 'r334r4'
			commit('createNews', payload)
		}
	},
	getters: {
		news (state) {
			return state.news
		},
		promoNews (state) {
			return state.news.filter(ne => {
				return ne.promo === true
			})
		},
		newsById (state) {
			return newsId => {
				return state.news.find(ne => ne.id === newsId) // Потом переделать по название
			}
		}
	}
}
