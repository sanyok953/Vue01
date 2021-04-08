<template>
	<v-container>
		<v-layout row>
			<v-flex xs12>
				<v-card class="mt-2" v-if="!loading">
					<v-img
						:src="ne.imageSrc"
						height="300px"
					></v-img>
					<v-divider></v-divider>
					<v-card-text>
						<h2 class="text--primary">{{ ne[lang].title }}</h2>
						<p>{{ ne[lang].description }}</p>
						<div>{{ ne[lang].text }}</div>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<div>{{ ne.date }}</div>
						<v-spacer></v-spacer>
						
						<!--<EditAdModal :ad="ad" v-if="isOwner"></EditAdModal>-->
						<!--<buy-modal :ad="ad"></buy-modal>-->
					</v-card-actions>
				</v-card>
				<div v-else class="text-xs-center">
					<v-container>
						<v-row justify="center" align="center">
							<div class="text-xs-center mt-5">
								<v-progress-circular
									indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
							</div>
						</v-row>
					</v-container>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	//import EditAdModal from './EditAdModal'
	export default {
		props: ['id'],
		computed: {
			ne () {
				const id = this.id
				return this.$store.getters.newsById(id)
			},
			loading () {
				return this.$store.getters.loading
			},
			/*isOwner () {
				return this.ad.ownerId === this.$store.getters.user.id
			}*/
		},
		data () {
			return {
				lang: localStorage.getItem('lang') || 'en',
			}
		},
		components: {
			//EditAdModal: EditAdModal
		}
	}
</script>

<style scope>
	.top-radius {
		border-top-left-radius:1px;
		border-top-right-radius:1px;
	}
</style>