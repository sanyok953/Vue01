import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './assets/en'
import ru from './assets/ru'
import es from './assets/es'

Vue.use(VueI18n)

let locale = window.navigator.language.slice(0, 2)
if (locale != 'ru' && locale != 'en' && locale != 'es') 
	locale = 'en'
//console.log("Locale ", locale)

export default new VueI18n({
	locale: localStorage.getItem('lang') || locale,
	fallbackLocale: 'ru',
	messages: {
		en: en,
		ru: ru,
		es: es
	}
})
