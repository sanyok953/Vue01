<template>
	<v-container>
		
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<h1 class="text--secondary mb-3">Edit News</h1>
				<v-form v-model="valid" ref="form" validation class="mb-3">
					<!-- title -->
					<v-text-field
						label="News title EN"
						name="title1"
						type="text"
						v-model="title1"
						value="nez.en.title"
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
						label="News description ES"
						name="description2"
						type="text"
						v-model="description2"
						multi-line
						:rules="[v => !!v || 'DescriptionEs is required']"
					></v-textarea>
					<v-textarea
						label="News description RU"
						name="description3"
						type="text"
						v-model="description3"
						multi-line
						:rules="[v => !!v || 'DescriptionRu is required']"
					></v-textarea>
					<!-- text -->
					<h4 class="text--secondary mt-3">News text EN</h4>
					<tiptap-vuetify
						v-model="text1"
						:extensions="extensions"
						:toolbar-attributes="{ color: 'primary' }"
						:rules="[v => !!v || 'TextEn is required']" />
					<h4 class="text--secondary mt-3">News text ES</h4>
					<tiptap-vuetify
						v-model="text2"
						:extensions="extensions"
						:toolbar-attributes="{ color: 'primary' }"
						:rules="[v => !!v || 'TextEs is required']"
					/>
					<h4 class="text--secondary mt-3">News text RU</h4>
					<tiptap-vuetify
						v-model="text3"
						:extensions="extensions"
						:toolbar-attributes="{ color: 'primary' }"
						:rules="[v => !!v || 'TextRu is required']"
					/>
				</v-form>
				<h4 class="text--secondary mt-3">Load Image</h4>
				<v-layout row class="mb-3 mt-2 ml-1">
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
				
				<v-layout row class='ml-1'>
					<v-flex xs12>
						<img :src="imageSrc" style="max-height: 100px" v-if="imageSrc" />
					</v-flex>
				</v-layout>
				
				<v-layout row class='ml-1'>
					<v-flex xs12>
						<v-switch
							color="primary"
							label="Add to promo"
							v-model="promo"
						></v-switch>
					</v-flex>
				</v-layout>
				<v-layout row class='ml-1'>
					<v-flex xs12>
						<v-spacer></v-spacer>
						<v-btn
							:loading="loading"
							:disabled="!valid || !(this.imageSrc.length > 1) || loading"
							class="success mb-12 mt-3"
							@click="editNews"
						>Edit news</v-btn>
					</v-flex>
				</v-layout>
				{{ ini(nez) }}
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History, Image } from 'tiptap-vuetify'
	export default {
		props: ['ide'],
		components: { TiptapVuetify },
		data: () => ({
			extensions: [
				History,
				Blockquote,
				Link,
				Underline,
				Strike,
				Italic,
				ListItem, // if you need to use a list (BulletList, OrderedList)
				BulletList,
				OrderedList,
				Image,
				[
					Heading,
					{
						// Options that fall into the tiptap's extension
						options: {
							levels: [1, 2, 3]
						}
					}
				],
				Bold,
				Link,
				Code,
				HorizontalRule,
				Paragraph,
				HardBreak // line break on Shift + Ctrl + Enter
			],
			load: false,
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
			nez () {
				const ide = this.ide
				return this.$store.getters.newsById(ide)
			},
			loading () {
				return this.$store.getters.loading
			},
			/*isOwner () {
				return this.ad.ownerId === this.$store.getters.user.id
			}*/
		},
		methods: {
			ini (nz) {
				if(!this.load) { // Сработает один раз, какого то черта работало несколько при загрузке картинки
					this.title1 = nz.en.title
					this.title2 = nz.es.title
					this.title3 = nz.ru.title
					this.description1 = nz.en.description
					this.description2 = nz.es.description
					this.description3 = nz.ru.description
					this.text1 = nz.en.text
					this.text2 = nz.es.text
					this.text3 = nz.ru.text
					this.promo = nz.promo
					this.imageSrc = nz.imageSrc
					this.load = true
				}
			},
			editNews () {
				if(this.$refs.form.validate() && this.imageSrc.length > 1) {
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
						promo: this.promo,
						imageSrc: this.imageSrc,
						image: this.image,
						id: this.ide
					}
					
					this.$store.dispatch('editNews', ne)
					.then(() => {
						this.$router.push('/news')
					})
					.catch(() => {})
				}
			},
			triggerUpload () {
				this.$refs.fileInput.click()
			},
			onFileChange (event) {
				this.imageSrc = ''
				const file = event.target.files[0]
				//console.log(event)
				const reader = new FileReader()
				reader.onload = () => {
					this.image = file
					this.imageSrc = reader.result
					//console.log("CH ", this.imageSrc, this.image, reader)
				}
				reader.readAsDataURL(file)
			}
		},
		watch: {
			imageSrc: function() {
				console.log("imageSrc changed ", this.imageSrc)
			}
		}
	}
</script>
