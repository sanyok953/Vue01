<template>
	<v-container>
		
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<h1 class="text--secondary mb-3">Create New News</h1>
				<v-form v-model="valid" ref="form" validation class="mb-3">
					<!-- title -->
					<v-text-field
						label="News title EN"
						name="title1"
						type="text"
						v-model="title1"
						required
						:rules="[v => !!v || 'TitleEn is required']"
					></v-text-field>
					<v-text-field
						label="News title ES"
						name="title2"
						type="text"
						v-model="title2"
						required
						:rules="[v => !!v || 'TitleEs is required']"
					></v-text-field>
					<v-text-field
						label="News title RU"
						name="title3"
						type="text"
						v-model="title3"
						required
						:rules="[v => !!v || 'TitleRu is required']"
					></v-text-field>
					<!-- description -->
					<v-textarea
						label="News description EN"
						name="description1"
						type="text"
						v-model="description1"
						multi-line
						:rules="[v => !!v || 'DescriptionEn is required']"
					></v-textarea>
					<v-textarea
						label="News description RU"
						name="description2"
						type="text"
						v-model="description2"
						multi-line
						:rules="[v => !!v || 'DescriptionEs is required']"
					></v-textarea>
					<v-textarea
						label="News description ES"
						name="description3"
						type="text"
						v-model="description3"
						multi-line
						:rules="[v => !!v || 'DescriptionRu is required']"
					></v-textarea>
					<!-- text -->
					<v-textarea
						label="News text EN"
						name="text1"
						type="text"
						v-model="text1"
						multi-line
						:rules="[v => !!v || 'TextEn is required']"
					></v-textarea>
					<v-textarea
						label="News text ES"
						name="text2"
						type="text"
						v-model="text2"
						multi-line
						:rules="[v => !!v || 'TextEs is required']"
					></v-textarea>
					<v-textarea
						label="News text RU"
						name="text3"
						type="text"
						v-model="text3"
						multi-line
						:rules="[v => !!v || 'TextRu is required']"
					></v-textarea>
				</v-form>
				
				<v-layout row class="mb-3 mt-2">
					<v-flex xs12>
						<v-btn
							class="warning"
							@click="triggerUpload"
							@change="onFileChange"
						>
							Upload
							<v-icon right dark>mdi-cloud-upload</v-icon>
							<input ref="fileInput" type="file" style="display: none;" accept="image/*" />
						</v-btn>
					</v-flex>
				</v-layout>
				
				<v-layout row>
					<v-flex xs12>
						<img :src="imageSrc" style="max-height: 100px" v-if="imageSrc" />
					</v-flex>
				</v-layout>
				
				<v-layout row>
					<v-flex xs12>
						<v-switch
							color="primary"
							label="Add to promo"
							v-model="promo"
						></v-switch>
					</v-flex>
				</v-layout>
				
				<v-layout row>
					<v-flex xs12>
						<v-spacer></v-spacer>
						<v-btn
							:loading="loading"
							:disabled="!valid /*|| !image*/ || loading"
							class="success"
							@click="createNews"
						>Create ad</v-btn>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data: () => ({
			title1: '',
			title2: '',
			title3: '',
			description1: '',
			description2: '',
			description3: '',
			text1: '',
			text2: '',
			text3: '',
			promo: false,
			valid: false,
			image: null,
			imageSrc: ''
		}),
		computed: {
			loading () {
				return this.$store.getters.loading
			}
		},
		methods: {
			createNews () {
				if(this.$refs.form.validate()/* && this.image*/) {
					const ne = {
						en: {
							title: this.title1,
							description: this.description1,
							text: this.text1
						},
						es: {
							title: this.title2,
							description: this.description2,
							text: this.text2
						},
						ru: {
							title: this.title3,
							description: this.description3,
							text: this.text3
						},
						url: transliterate(this.title1),
						date: '12-12-2022',
						promo: this.promo,
						imageSrc: 'https://c1.wallpaperflare.com/preview/424/569/238/sky-dark-night-stars.jpg' //this.image
					}
					console.log(ne)
					this.$store.dispatch('createNews', ne)
					/*.then(() => {
						this.$router.push('/list')
					})
					.catch(() => {})*/
				}
			},
			triggerUpload () {
				this.$refs.fileInput.click()
			},
			onFileChange (event) {
				const file = event.target.files[0]
				
				const reader = new FileReader()
				reader.onload = () => {
					this.imageSrc = reader.result
					this.image = file
					//console.log(e, this.imageSrc, this.image)
				}
				
				reader.readAsDataURL(file)
			}
		}
	}
			function transliterate(word) {
				const keys = {
					'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
					'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
					'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
					'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
					'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
					'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya',
					' ': '-', ':': '', '!': '', '?': '', '(': '', ')': ''
				}
				return word.split("").map((char) => keys[char] || char).join("");
			}
</script>
