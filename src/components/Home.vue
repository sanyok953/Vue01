<template>
	<div v-if="!loading" class="main-color ml-4 mr-4 pb-4">
		<v-container
			fluid
		>
			<v-carousel cycle>
				<v-carousel-item
					v-for="sl in slider"
					:key="sl.id"
					:src="sl.imageSrc"
				>
					<div class="carousel-link">
						<v-btn class="error" :to="'/newsFull/' + sl.url">{{ sl[langs].title }}</v-btn>
					</div>
				</v-carousel-item>
			</v-carousel>
		</v-container>
		
		<v-divider class="mx-3 mt-1 mb-2"></v-divider>
		<h2 class="text--primary mt-2 h2title">{{ $t('news') }}</h2>
		
		<div class="ml-4 mr-4">
			<v-container fluid>
				<v-layout row wrap>
					<v-flex
						xs12
						sm6
						md4
						lg3
						v-for="ne in news"
						:key="ne.url"
					>
						<v-card :elevation="3" class="ma-3" height="98%">
							<v-img
								:src="ne.imageSrc"
								height="200px"
							>
							</v-img>
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">{{ ne[langs].title }}</h3>
								</div>
							</v-card-title>
						<v-card-text>
							<div class="text--primary">
								{{ ne[langs].description }}
							</div>
						</v-card-text>
							<v-card-actions>
								<div class="text--primary datediv">{{ ne.date }}</div>
								<v-spacer></v-spacer>
								<v-btn v-if="isUserLoggedIn" text class="primary rounded-0 textreal" :to="'/editNews/' + ne.id">{{ $t('edit') }}</v-btn>
								<v-btn text class="primary rounded-0 textreal" :to="'/newsFull/' + ne.url">{{ $t('open') }}</v-btn>
								<!--<buy-modal :game="game"></buy-modal>-->
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
		
		<v-divider class="mx-3 mt-1 mb-2"></v-divider>
		<h2 class="text--primary mt-2 h2title">{{ $t('games') }}</h2>
		
		<div class="ml-4 mr-4">
			<v-container fluid>
				<v-layout row wrap>
					<v-flex
						xs12
						sm6
						md4
						lg3
						v-for="game in games"
						:key="game.url"
					>
						<v-card :elevation="3" class="ma-3">
							<v-img
								:src="game.imageSrc"
								height="200px"
							>
							</v-img>
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">{{ game[langs].title }}</h3>
									<div class="tiptap-vuetify-editor__content">{{ game[langs].description }}</div>
								</div>
							</v-card-title>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn v-if="isUserLoggedIn" text class="primary rounded-0 textreal" :to="'/editGame/' + game.id">{{ $t('edit') }}</v-btn>
								<v-btn text class="primary rounded-0 textreal" :to="'/game/' + game.url">{{ $t('open') }}</v-btn>
								<!--<buy-modal :game="game"></buy-modal>-->
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
		
		<v-divider class="mx-3 mt-1 mb-2"></v-divider>
		<h2 class="text--primary mt-2 h2title">{{ $t('about') }}</h2>
		
		<v-container grid-list-lg>
			<v-row dense>

				<v-col cols="12">
					<v-card>
						<v-card-text>
							<div class="text--primary">
								well meaning and kindly.<br>
								"a benevolent smile"
							</div>
						</v-card-text>

						<v-card-actions>

							<v-spacer></v-spacer>
							<v-btn v-if="isUserLoggedIn" text class="primary rounded-0 textreal" :to="'/editGame/' + 'hh'">{{ $t('edit') }}</v-btn>
							<v-btn text class="primary rounded-0 textreal">{{ $t('open') }}</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
		
		<h2 class="text--primary mt-2 h2title">{{ $t('ourTeam') }}</h2>
		
		<v-container grid-list-lg>
			<v-row dense>

				<v-col
					cols="12"
					xs="12"
					sm="12"
					md="6"
					lg="6"
				>
					<v-card
					>
						<div class="d-flex flex-no-wrap">

							<v-avatar
								class="ma-3"
								size="125"
								tile
							>
								<v-img src="https://me.simpleji.com/assets/images/profile.jpg"></v-img>
							</v-avatar>
							<div>
								<v-card-title
									class="headline"
								>
									uyuiuyi
								</v-card-title>

								<v-card-subtitle >fsdf</v-card-subtitle>
						<v-card-text>
							<div class="text--primary">
								well meaning and kindly.<br>
								"a benevolent smile"
							</div>
						</v-card-text>

						<v-card-actions>

							<v-spacer></v-spacer>
							<v-btn v-if="isUserLoggedIn" text class="primary rounded-0 textreal" :to="'/editGame/' + 'hh'">{{ $t('edit') }}</v-btn>
							<v-btn text class="primary rounded-0 textreal">{{ $t('open') }}</v-btn>
						</v-card-actions>
							</div>
						</div>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
	<div v-else>
		<v-container>
			<v-row justify="center" align="center">
				<div class="text-xs-center mt-5">
					<v-progress-circular
						indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
				</div>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	//import axios from 'axios'
	export default {
		computed: {
			slider () {
				return this.$store.getters.promoNews
			},
			news () {
				return this.$store.getters.news
			},
			games () {
				return this.$store.getters.games
			},
			loading () {
				return this.$store.getters.loading
			},
			langs () {
				return this.$i18n.locale
			},
			isUserLoggedIn () {
				return this.$store.getters.isUserLoggedIn
			}
			/*slider () {
				return this.news.concat(this.games)
			}*/
		},
		watch: {
			langs: function() {
				console.log("GG ", this.langs)
			}
		}
	}
</script>

<style scoped>
	.datediv {
		display:inline-block;
		transform: translate(0, 40%);
	}


	.main-color {
		background:gainsboro;
	}

	.h2title {
		background: #8bc34a;
		display:inline-block;
		padding:0 8px;
		margin-left:-6px;
	}

	.textreal {
		color:ivory;
		text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.35);
	}
	
	.carousel-link {
		position:absolute;
		bottom:50px;
		left:50%;
		background:rgba(0, 0, 0, 0.3);
		transform:translate(-50%, 0);
		padding:10px 20px;
		border-top-right-radius:5px;
		border-top-left-radius:5px;
	}
</style>
