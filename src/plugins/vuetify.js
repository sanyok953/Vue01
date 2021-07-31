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
				error: colors.red.darken1,
				warning: colors.orange.darken1,
				info: colors.lightGreen.lighten4,
				success: colors.green.lighten1,
				background: colors.grey.lighten5,
				comments: colors.grey.lighten4
			},
			dark: {
				primary: colors.indigo.darken4,
				secondary: colors.indigo.darken1,
				accent: colors.pink.accent3,
				error: colors.red.darken4,
				warning: colors.orange.darken4,
				info: colors.cyan.darken4,
				success: colors.green.darken4,
				background: colors.grey.darken3,
				comments: colors.grey.lighten2
			}
		}
	},
	watch: {
		theme: function () {
			console.log("TH ", this.theme.dark);
		}
	}

	/*lang: {
		locales: { ru, es, en },
		current: 'ru',
	}*/
})
