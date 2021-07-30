module.exports = {
	transpileDependencies: [
		'vuetify'
	],
	pluginOptions: {
		i18n: {
			locale: 'en',
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
