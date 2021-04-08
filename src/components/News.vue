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
							<v-img class="ml-2 left-radius"
								:src="ne.imageSrc"
								height="144px"
							></v-img>
							<div class="ml-4">{{ ne.date }}</div>
						</v-flex>
						<v-flex xs8>
							<v-card-text>
								<h2 class="text--primary">{{ ne[lang].title }}</h2>
								<p>{{ ne[lang].description}}</p>
								<div>{{ ne[lang].text}}</div>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn class="info" :to="'/newsFull/' + ne.id">{{ $t('read') }}</v-btn>
							</v-card-actions>
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
				lang: localStorage.getItem('lang') || 'en',
			}
		},
		computed: {
			loading () {
				return this.$store.getters.loading
			},
			news () {
				//console.log(this.$store.getters.news)
				return this.$store.getters.news
			}
		}
	}
</script>

<style scope>
	.dateList {
		
	}
	.left-radius {
		border-top-left-radius:3px;
		border-bottom-left-radius:3px;
	}
</style>
