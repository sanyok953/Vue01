import fb from 'firebase'
import 'firebase/database'
import 'firebase/storage'

class Game {
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
		games: []
			/*{
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
		]*/
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
					payload.url, payload.date, payload.promo, '' //payload.imageSrc
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
						console.log('RELOAD IMAGE ' + `games/${payload.id}${imageExt}`, e)
						fd = e
					})
					
					imageSrc = await fb.storage().ref().child(fd.ref.fullPath).getDownloadURL()
					
					//imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
				}
					console.log(imageSrc)
				
				await fb.database().ref('games').child(payload.id).update({
					en: payload.en,
					es: payload.es,
					ru: payload.ru,
					promo: payload.promo,
					imageSrc: imageSrc
				}).then(() => {
					console.log('Remote data updated')
				})
				
				commit('editGame', { // to mutations
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
			//console.log(state.games);
			return state.games
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