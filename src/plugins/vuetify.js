import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'

//import vt from 'vuetify/src/styles/theme'

Vue.use(Vuetify)
//console.log(vt);

//require('./overrides.sass')

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
				success: colors.teal.base,
				background: colors.purple.lighten3
			},
			dark: {
				primary: colors.lightGreen.base,
				secondary: colors.lime.base,
				accent: colors.deepOrange.base,
				error: colors.pink.base,
				warning: colors.red.base,
				info: colors.cyan.base,
				success: colors.teal.base,
				background: colors.purple.lighten3
			}
		}
	}

	/*lang: {
		locales: { ru, es, en },
		current: 'ru',
	}*/
})
