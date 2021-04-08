<template>
	<div id="app">
		<v-app id="inspire">
		
			<v-toolbar dark class="primary">
				<v-app-bar-nav-icon
					@click.stop="drawer = !drawer"
					class="hidden-md-and-up"
				></v-app-bar-nav-icon>
				<v-toolbar-title>
					<router-link to="/" tag="span" class="pointer">{{ $t('title') }}</router-link>
				</v-toolbar-title>

				<v-spacer></v-spacer>
				<v-toolbar-items class="hidden-sm-and-down">
					<v-btn
						v-for="(link, index) in links"
						:key="link.title"
						:to="link.url"
						text
					>
						<v-icon :left="index !== 0">{{ link.icon }}</v-icon>
							<div v-if="index !== 0">{{ link.title }}</div>
					</v-btn>
					<v-btn
						@click="onLogout"
						text
					>
						<v-icon left>mdi-account-arrow-right</v-icon>
							<div>{{ $t('logout') }}</div>
					</v-btn>
				</v-toolbar-items>
				
				<template>
					<div class="langBut" v-ripple="{ class: `gray--text` }" v-click-outside="hideLang">
						<img class="show" :src="'./' + langs + '.png'" @click="lgmenu = !lgmenu" v-show="!lgmenu">
						<ul class="lang_menu" v-show="lgmenu">
							<li v-for="flag in flags" :key="flag.name" v-show="flag.name != langs" @click="langChange($event, flag.name)"><img :src="flag.image"/></li>
						</ul>
					</div>
				</template>
				
<!--<select v-model="lang" dark @change="handleChange($event)">
	<option v-for="flag in flags" :key="flag.name">{{ flag.name }}</option>
</select>-->

			</v-toolbar>
		
			<v-app id="inspire">
			
				<v-navigation-drawer
					v-model="drawer"
					app
					temporary
				>
					<v-list dense>
						<v-list-item link
							v-for="link of links"
							:key="link.title"
							:to="link.url"
						>
							<v-list-item-action>
								<v-icon>{{ link.icon }}</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title v-text="link.title"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						
						<v-list-item link
							@click="onLogout"
						>
							<v-list-item-action>
								<v-icon>mdi-account-arrow-right</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title v-text="$t('logout')"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-navigation-drawer>

				
				

				

				<v-main>{{ langs }}
					<router-view />
				</v-main>
				
				<v-snackbar
					:multi-line="true"
					:timeout="5000"
					color="error"
					@input="closeError"
					:value="true"
					v-if="error"
				>
					{{ error }}

					<template v-slot:action="{ attrs }">
						<v-btn
							dark
							text
							v-bind="attrs"
							@click.native="closeError"
						>
							Close
						</v-btn>
					</template>
				</v-snackbar>
				
				<v-footer
					color="indigo"
					app
				>
					<span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
				</v-footer>
			</v-app>
		</v-app>
	</div>
</template>

<script>

export default {
	name: 'App',

	components: {
	},
	computed: {
		links () {
			return [
				{title: this.$t('main'), icon: 'mdi-home', url: '/'},
				{title: this.$t('news'), icon: 'mdi-newspaper-variant', url: '/news'},
				{title: this.$t('games'), icon: 'mdi-google-controller', url: '/games'},
				{title: this.$t('about'), icon: 'mdi-account-multiple', url: '/about'},
				{title: this.$t('newNews'), icon: 'mdi-account-multiple', url: '/newNews'},
				{title: this.$t('login'), icon: 'mdi-account-multiple', url: '/login'}
			]
		},
		error () {
			return this.$store.getters.error
		},
		langs () {
			return this.$i18n.locale
		}
	},
	data: () => ({
		lgmenu: false,
		drawer: false,
		//lang: localStorage.getItem('lang') || 'en',
		flags: [
			{ name: 'en', image: './en.png'},
			{ name: 'es', image: './es.png'},
			{ name: 'ru', image: './ru.png'}
		]
	}),
	methods: {
		closeError () {
			this.$store.dispatch('clearError')
		},
		/*handleChange(event) {
			localStorage.setItem('lang', event.target.value)
			window.location.reload()
		},*/
		langChange(event, lg) {
			localStorage.setItem('lang', lg)
			this.langs = lg
			console.log(lg)
			this.$store.actions.setLangs(lg)
			this.$forceUpdate()
			//window.location.reload()
		},
		hideLang () {
			this.lgmenu = false
		},
		onLogout () {
		
		}
	},
	/*watch: {
		locale(val) {
			this.$i18n.locale = val
			localStorage.setItem('lang', val)
			this.$forceUpdate()
		} 
	},
	mounted () {
		this.langs = this.$i18n.locale;
	}*/
}
</script>

<style scoped>
	.pointer {
		cursor:pointer;
	}

	.langBut {
		height:46px;
		cursor:pointer;
		margin:0 0 0 4px;
		/*outline:1px solid #cc5;*/
	}

	.langBut .show {
		width:62px;
		height:100%;
		cursor:pointer;
	}

	.lang_menu {
		list-style: none;
		/*display: none;*/
		display:inline-block;
		height:46px;
		padding: 0;
		margin: 0 0 0 0;
		/*background: url("./mc.png") repeat;*/
	}

	.lang_menu li {
		display: block;
		float: left;
		width:62px;
		height:46px;
		margin-top:0px;
		cursor:pointer;
	}

</style>
