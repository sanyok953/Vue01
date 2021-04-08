import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import fb from 'firebase'
import vuetify from './plugins/vuetify'
import i18n from './i18n'


const lang = localStorage.getItem('lang') || 'en'
axios.defaults.baseURL = 'http://localhost:8331/'
axios.defaults.headers['Accept-Language'] = lang
document.documentElement.lang = lang

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
    i18n,

    created () {
		fb.initializeApp ({
			apiKey: "AIzaSyCqgo-LodbvfMYCxx5YhoEhVRx4jXh8CLw",
			authDomain: "spa-ads-56e29.firebaseapp.com",
			projectId: "spa-ads-56e29",
			storageBucket: "spa-ads-56e29.appspot.com",
			messagingSenderId: "107144041676",
			appId: "1:107144041676:web:b5199e3b583b2610e55e69",
			databaseURL: "https://spa-ads-56e29-default-rtdb.europe-west1.firebasedatabase.app"
		})
		
		fb.auth().onAuthStateChanged(user => {
			if (user) {
				this.$store.dispatch('autoLoginUser', user)
			}
		})
		
		//this.$store.dispatch('fetchAds')
	}
}).$mount('#app')
