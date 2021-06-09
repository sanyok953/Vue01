<template>
  <div class="about">
	<h2 class="text--ivory mt-2 h2title" v-if="isUserLoggedIn || ab.id != null">{{ $t('about') }}</h2>
    <v-container fluid v-if="isUserLoggedIn || ab.id != null">
		<v-row>
			<v-col>
				<v-card>
					<v-card-text v-html="ab.text[langs]">
					
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						<EditAboutModal v-if="isUserLoggedIn"></EditAboutModal>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
		
	<!-- Team -->
	<h2 class=" mt-2 h2title">{{ $t('ourTeam') }}</h2>
	
	<v-container fluid>
		<v-row dense>
			<v-col
				v-for="te in team"
				:key="te.url"
				xs="12"
				sm="12"
				md="12"
				lg="12"
				class="mt-6"
			>
				<v-card
					:elevation="3"
					class="mt-2 d-flex flex-column"
				>
					<v-row dense
						class="ma-1"
					>
						<v-col xs="12" sm="5" md="4" lg="2" class="mt-6">
							<v-avatar
								class="profile mt-n14"
								color="white"
								size="100%"
								height="auto"
								aspect-ratio="1"
							>
								<v-img :src="te.imageSrc"></v-img>
							</v-avatar>
						</v-col>
						
						<v-col xs="12" sm="7" md="8" lg="10">
							<v-card-title
								class="headline pt-0 mt-5 word"
							>
								{{ te[langs].name }}
							</v-card-title>

							<v-card-subtitle class="mt-2 word">{{ te[langs].position }}</v-card-subtitle>
							<v-spacer></v-spacer>
						</v-col>
					</v-row>
					<v-row dense>
					<v-col>
							<v-card-text>
								<div v-html="te[langs].text" class="text--primary tiptap-vuetify-editor__content word">
								</div>
							</v-card-text>
						<v-divider class="mx-3 mb-1"></v-divider>

						<v-card-actions class="d-flex" >
							<v-spacer></v-spacer>
							<v-btn v-if="isUserLoggedIn" text class="primary rounded-0 textreal" :to="'/editTeam/' + te.id">{{ $t('edit') }}</v-btn>
							<v-btn text class="primary rounded-0 textreal" :to="'/about#' + te.url">{{ $t('open') }}</v-btn>
						</v-card-actions>
					</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
  </div>
</template>

<script>
	import EditAboutModal from './EditAboutModal'
	export default {
		computed: {
			team () {
				return this.$store.getters.team
			},
			ab () {
				return this.$store.getters.getAbout
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
		},
		/*data () {
			return {
				lang: localStorage.getItem('lang') || 'en',
			}
		},*/
		components: {
			EditAboutModal: EditAboutModal
		},
		watch: {
			langs: function() {
				console.log("GG ", this.langs)
			}
		}
	}
</script>

<style scoped>
	.h2title {
		background: #8bc34a;
		display:inline-block;
		padding:0 8px;
		margin-left:-6px;
		color: ivory;
	}
	
	.word {
		word-break: keep-all;
	}
</style>