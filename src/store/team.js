import fb from 'firebase'
import 'firebase/database'
import 'firebase/storage'

class Team {
	constructor (nen, nes, nru, pen, pes, pru, ten, tes, tru, url, imageSrc = '', id = null) {
		this.en = {name: nen, position: pen, text: ten}
		this.es = {name: nes, position: pes, text: tes}
		this.ru = {name: nru, position: pru, text: tru}
		this.url = url
		this.imageSrc = imageSrc
		this.id = id
	}
}

class About {
	constructor (ten, tes, tru, id = null) {
		this.text = {en: ten, es: tes, ru: tru}
		this.id = id
	}
}

export default {
	state: {
		team: [],
		about: [{
			id: null,
			text: { en: "", es: "", ru: ""}
		}]
	},
	mutations: {
		setAbout (state, payload) {
			state.about = payload
		},
		createTeam (state, payload) {
			//console.log(payload)
			state.team.push(payload)
		},
		editTeam (state, payload) {
			const ete = state.team.find(te => {
				return te.id === payload.id
			})
			
			ete.en = payload.en,
			ete.es = payload.es,
			ete.ru = payload.ru,
			ete.imageSrc = payload.imageSrc
			console.log('Local data updated')
		},
		loadTeam (state, payload) {
			state.team = payload
		},
		loadAbout (state, payload) {
			state.about = payload
		},
		updateAbout (state, payload) {
			state.about.push(payload)
		}
	},
	actions: {
		async setAbout ({commit}, payload) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const newAb = new About(
					payload.text.en, payload.text.es, payload.text.ru, payload.id
				)
				
				if(newAb.id != null) {
					await fb.database().ref('about').child(newAb.id).update({
						text: newAb.text,
					}).then(() => {
						console.log('Remote about data updated')
					})
				} else {
					const ab = await fb.database().ref('about').push(newAb)
					commit('setLoading', false)
					commit('setAbout', {
						id: ab.key,
						text: newAb.text
					}).then(() => {
						console.log('Remote about data created')
					})
				}
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async updateAbout ({commit}, payload) {
			commit('clearError')
			commit('setLoading', true)
			try {
				if(payload.id != null) {
					var txt = { en: payload.ten, es: payload.tes, ru: payload.tru }
					//console.log("EDIT ", txt)
					await fb.database().ref('about').child(payload.id).update({
						text: txt
					}).then(() => {
						//console.log('Remote data updated', new About(txt.en, txt.es, txt.ru, payload.id))
						commit('setLoading', false)
						commit('updateAbout', new About(txt.en, txt.es, txt.ru, payload.id))
					})
				} else {
					const newAbout = new About(payload.ten, payload.tes, payload.tru)
					const abt = await fb.database().ref('about').push(newAbout)
					commit('setLoading', false)
					commit('updateAbout', abt)
				}
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async createTeam ({commit}, payload) {
			//payload.id = 'r334r4'
			commit('clearError')
			commit('setLoading', true)
			
			const image = payload.image
			try {
				const newTeam = new Team(
					payload.en.name, payload.es.name, payload.ru.name,
					payload.en.position, payload.es.position, payload.ru.position,
					payload.en.text, payload.es.text, payload.ru.text,
					payload.url, payload.imageSrc
				)
				
				const te = await fb.database().ref('team').push(newTeam)
				
				const imageExt = image.name.slice(image.name.lastIndexOf('.'))
				//console.log(ad.key, imageExt)
				const fileData = await fb.storage().ref(`team/${te.key}${imageExt}`).put(image)
				//console.log(fileData)
				const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
				//console.log(te)
				await fb.database().ref('team').child(te.key).update({
					imageSrc
				})
				commit('setLoading', false)
				commit('createTeam', {
					id: te.key,
					imageSrc
				})
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async editTeam ({commit}, payload) {
			commit('clearError')
			commit('setLoading', true)
			//console.log("EDIT ", payload)
			var imageSrc = payload.imageSrc
			const image = payload.image
			try {
				if(image != null) {
					const imageExt = image.name.slice(image.name.lastIndexOf('.'))
					var fd = null
					
					await fb.storage().ref().child(`team/${payload.id}${imageExt}`).delete()
					.then(() => {
						console.log('DELETED IMAGE ' + `team/${payload.id}${imageExt}`)
					})
					
					/*const fileData = */await fb.storage().ref(`team/${payload.id}${imageExt}`).put(image)
					.then((e) => {
						console.log('RELOAD IMAGE ' + `team/${payload.id}${imageExt}`, e)
						fd = e
					})
					
					imageSrc = await fb.storage().ref().child(fd.ref.fullPath).getDownloadURL()
					
					//imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
				}
					console.log(imageSrc)
				
				await fb.database().ref('team').child(payload.id).update({
					en: payload.en,
					es: payload.es,
					ru: payload.ru,
					imageSrc: imageSrc
				}).then(() => {
					console.log('Remote data updated')
				})
				
				commit('editTeam', { // to mutations
					en: payload.en,
					es: payload.es,
					ru: payload.ru,
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
		async fetchTeam ({commit}) {
			commit('clearError')
			commit('setLoading', true)
			const resultTeam = []
			
			try {
				const fbVal = await fb.database().ref('team').once('value')
				const teamb = fbVal.val()
				
				Object.keys(teamb).forEach(key => {
					const teb = teamb[key]
					resultTeam.push(
						new Team(
							teb.en.name,
							teb.es.name,
							teb.ru.name,
							teb.en.position,
							teb.es.position,
							teb.ru.position,
							teb.en.text,
							teb.es.text,
							teb.ru.text,
							teb.url,
							teb.imageSrc,
							key
						)
					)
					
				//console.log(resultNews)
				
				})
				commit('loadTeam', resultTeam)
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async fetchAbout ({commit}) {
			commit('clearError')
			commit('setLoading', true)
			const resultAbout = []
			
			try {
				const fbAbt = await fb.database().ref('about').once('value')
				const aboutb = fbAbt.val()
				
				if (aboutb != null) {
					Object.keys(aboutb).forEach(key => {
						const abb = aboutb[key]
						resultAbout.push(
							new About(
								abb.text.en,
								abb.text.es,
								abb.text.ru,
								key
							)
						)
						
					})
				commit('loadAbout', resultAbout)
				}
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		}
	},
	getters: {
		team (state) {
			return state.team
		},
		teamShort (state) {
			const coun = 200
			
			for(var i = 0; i < state.team.length && i < 4; i ++) {
				state.team[i].en.text = state.team[i].en.text.replace(/<\/?[^>]+>/g,' ')
				state.team[i].es.text = state.team[i].es.text.replace(/<\/?[^>]+>/g,' ')
				state.team[i].ru.text = state.team[i].ru.text.replace(/<\/?[^>]+>/g,' ')
					
				if(state.team[i].en.text.length > coun)
					state.team[i].en.text = state.team[i].en.text.slice(0, coun) + "..."
				if(state.team[i].es.text.length > coun)
					state.team[i].es.text = state.team[i].es.text.slice(0, coun) + "..."
				if(state.team[i].ru.text.length > coun)
					state.team[i].ru.text = state.team[i].ru.text.slice(0, coun) + "..."
			}
			return state.team
		},
		getAbout (state) {
			return state.about[0]
		},
		promoTeam (state) {
			return state.team.filter(te => {
				return te.promo === true
			})
		},
		teamById (state) {
			return teamId => {
				return state.team.find(te => te.id === teamId) // Потом переделать по название
			}
		},
		teamByUrl (state) {
			return teamUrl => {
				//console.log(state.team.find(ne => ne.url == newsUrl))
				return state.team.find(te => te.url == teamUrl)
			}
		}
	}
}
