import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './assets/en'
import ru from './assets/ru'
import es from './assets/es'

Vue.use(VueI18n)

export default new VueI18n({
	locale: localStorage.getItem('lang') || 'en',
	messages: {
		en: en,
		ru: ru,
		es: es
	}
})
