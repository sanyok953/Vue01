<template>
	<div id="app" >
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
						v-if="isUserLoggedIn"
						text
					>
						<v-icon left>mdi-account-arrow-right</v-icon>
							<div>{{ $t('logout') }}</div>
					</v-btn>
				</v-toolbar-items>
				
				<template>
					<div class="langBut" v-ripple="{ class: `gray--text` }" v-click-outside="hideLang">
						<img class="show" :src="require(`@/assets/img/${langs}.png`)" @click="lgmenu = !lgmenu" v-show="!lgmenu">
						<ul class="lang_menu" v-show="lgmenu">
							<li v-for="flag in flags" :key="flag.name" v-show="flag.name != langs" @click="setLocale(flag.name)"><img :src="require(`@/assets/img/${flag.image}`)"/></li>
						</ul>
					</div>
				</template>

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
							v-if="isUserLoggedIn"
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

				<v-main>
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
					color="primary"
				>
					<span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
				</v-footer>
			</v-app>
		</v-app>
	</div>
</template>

<script>
//import './assets/app.css'

export default {
	name: 'App',

	components: {
	},
	computed: {
		links () {
			if (this.isUserLoggedIn) {
				return [
					{title: this.$t('main'), icon: 'mdi-home', url: '/'},
					{title: this.$t('news'), icon: 'mdi-newspaper-variant', url: '/news'},
					{title: this.$t('games'), icon: 'mdi-google-controller', url: '/games'},
					{title: this.$t('about'), icon: 'mdi-account-multiple', url: '/about'},
					{title: this.$t('newNews'), icon: 'mdi-note-plus', url: '/newNews'},
					{title: this.$t('newGame'), icon: 'mdi-note-plus', url: '/newGame'},
				]
			}
			return [
				{title: this.$t('main'), icon: 'mdi-home', url: '/'},
				{title: this.$t('news'), icon: 'mdi-newspaper-variant', url: '/news'},
				{title: this.$t('games'), icon: 'mdi-google-controller', url: '/games'},
				{title: this.$t('about'), icon: 'mdi-account-multiple', url: '/about'},
				{title: this.$t('login'), icon: 'mdi-account-arrow-left', url: '/login'}
			]
		},
		error () {
			return this.$store.getters.error
		},
		langs () {
			return this.$i18n.locale
		},
		isUserLoggedIn () {
			return this.$store.getters.isUserLoggedIn
		}
	},
	data: () => ({
		lgmenu: false,
		drawer: false,
		back: {background: require('./assets/img/mc.png')},
		//lang: localStorage.getItem('lang') || 'en',
		flags: [
			{ name: 'en', image: 'en.png'},
			{ name: 'es', image: 'es.png'},
			{ name: 'ru', image: 'ru.png'}
		]
	}),
	methods: {
		closeError () {
			this.$store.dispatch('clearError')
		},
		setLocale(locale) {
			this.$i18n.locale = locale
			this.lgmenu = false
			console.log("FF ", this.$router)
			localStorage.setItem('lang', locale)
			this.$forceUpdate()
		},
		hideLang () {
			this.lgmenu = false
		},
		onLogout () {
			this.$store.dispatch('logoutUser')
			this.$router.push('/')
		}
	},
	watch: {
		flags: function() {
			console.log("GG ", this.langs)
		}
	}
}
</script>

<style scoped>
	/*.appBack {
		background: url("./assets/img/mc.png") repeat;
	}*/

	.bg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: url( 'https://cdn.pixabay.com/photo/2016/03/26/13/09/organic-1280537_1280.jpg') no-repeat center center;
		background-size: cover;
		background-color: red;
		transform: scale(1.1);
	}

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
