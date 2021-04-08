<template>
	<div v-if="!loading">
		<v-container
			fluid
		>
			<v-carousel>
				<v-carousel-item
					v-for="sl in slider"
					:key="sl.id"
					:src="sl.imageSrc"
				>
					<div class="carousel-link">
						<v-btn class="error" :to="'/newsFull/' + sl.id">{{ sl[langs].title }}</v-btn>
					</div>
				</v-carousel-item>
			</v-carousel>
		</v-container>
		
		<v-container grid-list-lg>
			<h2 class="text--primary mt-3">{{ $t('news') }}</h2>
			<v-layout row wrap>
				<v-flex
					xs12
					sm6
					md4
					lg3
					v-for="ne in news"
					:key="ne.id"
				>
					<v-card :elevation="3">
						<v-img
							:src="ne.imageSrc"
							height="200px"
						>
						</v-img>
						<v-card-title primary-title>
							<div>
								
								<h3 class="headline mb-0">{{ ne[langs].title }}</h3>
								<div>{{ ne[langs].description }}</div>
							</div>
						</v-card-title>
						
						<v-card-actions>
							<div class="text--primary datediv">{{ ne.date }}</div>
							<v-spacer></v-spacer>
							<v-btn text class="primary rounded-0 textreal" :to="'/newsFull/' + ne.id">{{ $t('open') }}</v-btn>
							<!--<buy-modal :game="game"></buy-modal>-->
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
			
			<h2 class="text--primary mt-3">{{ $t('games') }}</h2>
			<v-layout row wrap>
				<v-flex
					xs12
					sm6
					md4
					lg3
					v-for="game in games"
					:key="game.id"
				>
					<v-card>
						<v-img
							:src="game.imageSrc"
							height="200px"
						>
						</v-img>
						<v-card-title primary-title>
							<div>
								<h3 class="headline mb-0">{{ game[langs].title }}</h3>
								<div>{{ game[langs].description }}</div>
							</div>
						</v-card-title>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn text :to="'/game/' + game.id">{{ $t('open') }}</v-btn>
							<!--<buy-modal :game="game"></buy-modal>-->
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>

			<!--<v-row justify="center" xs12 cols="6">
				<v-col
					v-for="ad in ads"
					:key="ad.id"
					cols="2"
				>

					<v-card
						class="mx-auto"
						max-width="344"
					>
						<v-img
							:src="ad.imageSrc"
							height="200px"
						></v-img>

						<v-card-title primary-title>
							{{ ad.title }}
						</v-card-title>

						<v-card-subtitle>
							{{ ad.description }}
						</v-card-subtitle>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn text>Open</v-btn>

							<v-btn raised class="primary">Buy</v-btn>
						</v-card-actions>
					</v-card>

				</v-col>
			</v-row>-->
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
			/*games () {
				return this.$store.getters.games
			},*/
			loading () {
				return this.$store.getters.loading
			},
			/*langs () {
				return this.$store.getters.langs
			}*/
			/*slider () {
				return this.news.concat(this.games)
			}*/
		},
		data () {
			return {
				langs: 'en',
				//lang: this.$root.lang,
				games: [
					{
						en: {
							title: 'First',
							description: 'First de',
							text: 'First txt'
						},
						es: {
							title: 'Primer',
							description: 'Primer de',
							text: 'Primer txt'
						},
						ru: {
							title: 'Первый',
							description: 'Первый de',
							text: 'Первый txt'
						},
						promo: false,
						imageSrc: 'https://pbs.twimg.com/media/CbxjMb7WIAEjY8a.jpg',
						id: '1'
					},
					{
						en: {
							title: 'Second',
							description: 'Second de',
							text: 'Second txt'
						},
						es: {
							title: 'Segundo',
							description: 'Segundo de',
							text: 'Segundo txt'
						},
						ru: {
							title: 'Второй',
							description: 'Второй de',
							text: 'Второй txt'
						},
						promo: true,
						imageSrc: 'https://www.ejin.ru/wp-content/uploads/2018/11/zjv6swd8fsa.jpg',
						id: '2'
					}
				]
			}
		},
		mounted () {
			/*axios.get('http://localhost:8331')
				.then(response => {
					console.log(response)
				}
			)*/
			this.langs = this.$i18n.locale;
		}
	}
</script>

<style scoped>
	.datediv {
		display:inline-block;
		transform: translate(0, 40%);
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
