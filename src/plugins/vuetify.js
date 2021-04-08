import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'
import en from '@/assets/en'
import ru from '@/assets/ru'
import es from '@/assets/es'

Vue.use(Vuetify)
//console.log(Vuetify)

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: colors.lightGreen.base,
				secondary: colors.lime.base,
				accent: colors.deepOrange.base,
				error: colors.pink.base,
				warning: colors.red.base,
				info: colors.cyan.base,
				success: colors.teal.base
			},
			dark: {
				primary: colors.lightGreen.base,
				secondary: colors.lime.base,
				accent: colors.deepOrange.base,
				error: colors.pink.base,
				warning: colors.red.base,
				info: colors.cyan.base,
				success: colors.teal.base
			}
		}
	},
	/*lang: {
		locales: { ru, es, en },
		current: 'ru',
	}*/
})
