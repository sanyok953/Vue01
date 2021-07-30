import fb from 'firebase'
import 'firebase/database'
import 'firebase/storage'

class Game {
	constructor (ten, tes, tru, den, des, dru, teen, tees, teru, url, date, promo = false, imageSrc = '', link = '', id = null) {
		this.en = {title: ten, description: den, text: teen}
		this.es = {title: tes, description: des, text: tees}
		this.ru = {title: tru, description: dru, text: teru}
		this.url = url
		this.date = date
		this.promo = promo
		this.imageSrc = imageSrc
		this.link = link
		this.id = id
	}
}

export default {
	state: {
		games: []
	},
	mutations: {
		createGame (state, payload) {
			//console.log(payload)
			state.games.push(payload)
		},
		editGame (state, payload) {
			const ega = state.games.find(ga => {
				return ga.id === payload.id
			})
			
			ega.en = payload.en,
			ega.es = payload.es,
			ega.ru = payload.ru,
			ega.promo = payload.promo,
			ega.link = payload.link,
			ega.imageSrc = payload.imageSrc
			console.log('Local data updated')
		},
		loadGames (state, payload) {
			state.games = payload
		}
	},
	actions: {
		async createGame ({commit}, payload) {
			//payload.id = 'r334r4'
			commit('clearError')
			commit('setLoading', true)
			
			const image = payload.image
			try {
				const newGame = new Game(
					payload.en.title, payload.es.title, payload.ru.title,
					payload.en.description, payload.es.description, payload.ru.description,
					payload.en.text, payload.es.text, payload.ru.text,
					payload.url, payload.date, payload.promo, '', payload.link //payload.imageSrc
				)
				
				const game = await fb.database().ref('games').push(newGame)
				
				const imageExt = image.name.slice(image.name.lastIndexOf('.'))
				//console.log(ad.key, imageExt)
				const fileData = await fb.storage().ref(`games/${game.key}${imageExt}`).put(image)
				//console.log(fileData)
				const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
				//console.log(game)
				await fb.database().ref('games').child(game.key).update({
					imageSrc
				})
				commit('setLoading', false)
				commit('createGame', {
					id: game.key,
					imageSrc
				})
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async editGame ({commit}, payload) {
			commit('clearError')
			commit('setLoading', true)
			//console.log("EDIT ", payload)
			var imageSrc = payload.imageSrc
			const image = payload.image
			try {
				if(image != null) {
					const imageExt = image.name.slice(image.name.lastIndexOf('.'))
					var fd = null
					
					await fb.storage().ref().child(`games/${payload.id}${imageExt}`).delete()
					.then(() => {
						console.log('DELETED IMAGE ' + `games/${payload.id}${imageExt}`)
					})
					
					/*const fileData = */await fb.storage().ref(`games/${payload.id}${imageExt}`).put(image)
					.then((e) => {
						console.log('RELOAD IMAGE ' + `games/${payload.id}${imageExt}`, e, imageExt)
						fd = e
					})
					
					imageSrc = await fb.storage().ref().child(fd.ref.fullPath).getDownloadURL()
					
					
					//imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
				}
					console.log(imageSrc, payload)
				
				await fb.database().ref('games').child(payload.id).update({
					en: payload.en,
					es: payload.es,
					ru: payload.ru,
					promo: payload.promo,
					imageSrc: imageSrc,
					link: payload.link
				}).then(() => {
					console.log('Remote data updated')
				})
				
				commit('editGame', { // to mutations
					en: payload.en,
					es: payload.es,
					ru: payload.ru,
					promo: payload.promo,
					imageSrc: imageSrc,
					link: payload.link,
					id: payload.id
				})
				
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async fetchGames ({commit}) {
			commit('clearError')
			commit('setLoading', true)
			const resultGames = []
			
			try {
				const fbVal = await fb.database().ref('games').once('value')
				const gamesb = fbVal.val()
				
				Object.keys(gamesb).forEach(key => {
					const gab = gamesb[key]
					resultGames.push(
						new Game(
							gab.en.title,
							gab.es.title,
							gab.ru.title,
							gab.en.description,
							gab.es.description,
							gab.ru.description,
							gab.en.text,
							gab.es.text,
							gab.ru.text,
							gab.url,
							gab.date,
							gab.promo,
							gab.imageSrc,
							gab.link,
							key
						)
					)
					
				//console.log(resultNews)
				
				})
				commit('loadGames', resultGames)
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
	},
	getters: {
		games (state) {
			// get all
			return state.games
		},
		games2 (state) {
			// 2 elements
			return state.games.slice(0, 2)
		},
		promoGames (state) {
			return state.games.filter(ga => {
				return ga.promo === true
			})
		},
		gameById (state) {
			return gameId => {
				return state.games.find(ga => ga.id === gameId) // Потом переделать по название
			}
		},
		gameByUrl (state) {
			return gameUrl => {
				return state.games.find(ga => ga.url == gameUrl)
			}
		}
	}
}