<template>
	<v-container>
		
		<v-layout row v-if="!loading && news.length !== 0">
			<v-flex xs12 sm6 offset-sm3>
				<h1 class="text--secondary mb-3">{{ $t('news') }}</h1>
				<v-card
					class="elevation-10 mb-6 pl-1 pr-2"
					v-for="ne in news"
					:key="ne.id"
				>
					<v-layout row>
						<v-flex xs4>
							<v-img class="ml-2 rounded-tl"
								:src="ne.imageSrc"
								height="144px"
							></v-img>
							<div class="ml-4">{{ ne.date }}</div>
						</v-flex>
						<v-flex xs8>
							<v-card-text primary-title>
								<h2 class="text--primary">{{ ne[langs].title }}</h2>
								<div class="mb-9">{{ ne[langs].description}}</div>
								<!--<div class="tiptap-vuetify-editor__content" v-html="ne[langs].text"></div>-->
							</v-card-text>
							<div class="butt">
								<v-card-actions class="d-flex align-end">
									<v-spacer></v-spacer>
									<v-btn v-if="isUserLoggedIn" text class="primary textreal" :to="'/editNews/' + ne.id">{{ $t('edit') }}</v-btn>
									<v-btn class="info" :to="'/newsFull/' + ne.url">{{ $t('read') }}</v-btn>
								</v-card-actions>
							</div>
						</v-flex>
					</v-layout>
				</v-card>
			</v-flex>
		</v-layout>
		<v-layout v-else-if="!loading && news.length === 0">
			<v-flex xs12 class="text-xs-center">
				<h1 class="text--primary">You have no ads</h1>
			</v-flex>
		</v-layout>
		<v-layout v-else>
			<v-flex xs12 class="text-xs-center">
				<v-container>
					<v-row justify="center" align="center">
						<div class="text-xs-center mt-5">
							<v-progress-circular
								indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
						</div>
					</v-row>
				</v-container>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data () {
			return {
				//lang: localStorage.getItem('lang') || 'en',
			}
		},
		computed: {
			loading () {
				return this.$store.getters.loading
			},
			news () {
				//console.log(this.$store.getters.news)
				return this.$store.getters.news
			},
			langs () {
				return this.$i18n.locale
			},
			isUserLoggedIn () {
				return this.$store.getters.isUserLoggedIn
			}
		},
		watch: {
			langs: function() {
				console.log("GG ", this.langs)
			}
		}
	}
</script>

<style scope>
	.dateList {
		
	}
	.butt {
		position:absolute;
		bottom:0;
		right:0;
		padding:5px 10px;
		border-top-right-radius:5px;
		border-top-left-radius:5px;
	}
	.left-radius {
		border-top-left-radius:3px;
		border-bottom-left-radius:3px;
	}
</style>
