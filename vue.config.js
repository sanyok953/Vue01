module.exports = {
	transpileDependencies: [
		'vuetify'
	],
	pluginOptions: {
		i18n: {
		locale: undefined,
		fallbackLocale: undefined,
		localeDir: undefined,
		enableInSFC: undefined
		}
	},
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import "~@/plugins/variables.scss"`
			}
		}
	}
}
