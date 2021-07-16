import fb from 'firebase'
import 'firebase/database'
import 'firebase/storage'

class Newa {
	constructor (ten, tes, tru, den, des, dru, teen, tees, teru, url, date, promo = false, imageSrc = '', id = null) {
		this.en = {title: ten, description: den, text: teen}
		this.es = {title: tes, description: des, text: tees}
		this.ru = {title: tru, description: dru, text: teru}
		this.url = url
		this.date = date
		this.promo = promo
		this.imageSrc = imageSrc
		this.id = id
	}
}

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
				url: 'test1',
				date: '22-03-2020',
				promo: false,
				imageSrc: 'https://pbs.twimg.com/media/CbxjMb7WIAEjY8a.jpg',
				id: '1'
			}
		]
	},
	mutations: {
		createNews (state, payload) {
			//console.log(payload)
			state.news.push(payload)
		},
		editNews (state, payload) {
			const ene = state.news.find(ne => {
				return ne.id === payload.id
			})
			
			ene.en = payload.en,
			ene.es = payload.es,
			ene.ru = payload.ru,
			ene.promo = payload.promo,
			ene.imageSrc = payload.imageSrc
			console.log('Local data updated')
		},
		loadNews (state, payload) {
			state.news = payload
		}
	},
	actions: {
		async createNews ({commit}, payload) {
			//payload.id = 'r334r4'
			commit('clearError')
			commit('setLoading', true)
			
			const image = payload.image
			try {
				const newNews = new Newa(
					payload.en.title, payload.es.title, payload.ru.title,
					payload.en.description, payload.es.description, payload.ru.description,
					payload.en.text, payload.es.text, payload.ru.text,
					payload.url, payload.date, payload.promo, '' //payload.imageSrc
				)
				
				const ne = await fb.database().ref('news').push(newNews)
				
				const imageExt = image.name.slice(image.name.lastIndexOf('.'))
				//console.log(ad.key, imageExt)
				const fileData = await fb.storage().ref(`news/${ne.key}${imageExt}`).put(image)
				//console.log(fileData)
				const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
				//console.log(ne)
				await fb.database().ref('news').child(ne.key).update({
					imageSrc
				})
				commit('setLoading', false)
				commit('createNews', {
					id: ne.key,
					imageSrc
				})
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async editNews ({commit}, payload) {
			commit('clearError')
			commit('setLoading', true)
			//console.log("EDIT ", payload)
			var imageSrc = payload.imageSrc
			const image = payload.image
			try {
				
				/*const ediNews = new Newa(
					payload.en.title, payload.es.title, payload.ru.title,
					payload.en.description, payload.es.description, payload.ru.description,
					payload.en.text, payload.es.text, payload.ru.text,
					'', '', payload.promo, '', payload.id //payload.imageSrc
				)*/
				
				if(image != null) {
					const imageExt = image.name.slice(image.name.lastIndexOf('.'))
					var fd = null
					
					await fb.storage().ref().child(`news/${payload.id}${imageExt}`).delete()
					.then(() => {
						console.log('DELETED IMAGE ' + `news/${payload.id}${imageExt}`)
					})
					
					/*const fileData = */await fb.storage().ref(`news/${payload.id}${imageExt}`).put(image)
					.then((e) => {
						console.log('RELOAD IMAGE ' + `news/${payload.id}${imageExt}`, e)
						fd = e
					})
					
					imageSrc = await fb.storage().ref().child(fd.ref.fullPath).getDownloadURL()
					
					//imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
				}
					console.log(imageSrc)
				
				await fb.database().ref('news').child(payload.id).update({
					en: payload.en,
					es: payload.es,
					ru: payload.ru,
					promo: payload.promo,
					imageSrc: imageSrc
				}).then(() => {
					console.log('Remote data updated')
				})
				
				commit('editNews', { // to mutations
					en: payload.en,
					es: payload.es,
					ru: payload.ru,
					promo: payload.promo,
					imageSrc: imageSrc,
					id: payload.id
				})
				
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async fetchNews ({commit}) {
			commit('clearError')
			commit('setLoading', true)
			const resultNews = []
			
			try {
				const fbVal = await fb.database().ref('news').once('value')
				const newsb = fbVal.val()
				
				Object.keys(newsb).forEach(key => {
					const neb = newsb[key]
					resultNews.push(
						new Newa(
							neb.en.title,
							neb.es.title,
							neb.ru.title,
							neb.en.description,
							neb.es.description,
							neb.ru.description,
							neb.en.text,
							neb.es.text,
							neb.ru.text,
							neb.url,
							neb.date,
							neb.promo,
							neb.imageSrc,
							key
						)
					)
					
				//console.log(resultNews)
				
				})
				commit('loadNews', resultNews)
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
	},
	getters: {
		news (state) {
			// get all
			return state.news
		},
		promoNews (state) {
			return state.news.filter(ne => {
				return ne.promo === true
			})
		},
		news4 (state) {
			// 4 elements
			return state.news.slice(0, 4)
		},
		newsById (state) {
			return newsId => {
				return state.news.find(ne => ne.id === newsId) // Потом переделать по название
			}
		},
		newsByUrl (state) {
			return newsUrl => {
				//console.log(state.news.find(ne => ne.url == newsUrl))
				return state.news.find(ne => ne.url == newsUrl)
			}
		}
	}
}
