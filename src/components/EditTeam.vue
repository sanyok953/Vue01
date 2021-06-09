<template>
	<v-container>
		
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<h1 class="text--secondary mb-3">Edit Team</h1>
				<v-form v-model="valid" ref="form" validation class="mb-3">
					<!-- name -->
					<v-text-field
						label="Team name EN"
						name="name1"
						type="text"
						v-model="name1"
						required
						:rules="[v => !!v || 'NameEn is required']"
					></v-text-field>
					<v-text-field
						label="Team name ES"
						name="name2"
						type="text"
						v-model="name2"
						required
						:rules="[v => !!v || 'NameEs is required']"
					></v-text-field>
					<v-text-field
						label="Team name RU"
						name="name3"
						type="text"
						v-model="name3"
						required
						:rules="[v => !!v || 'NameRu is required']"
					></v-text-field>
					<!-- position -->
					<v-textarea
						label="Team position EN"
						name="position1"
						type="text"
						v-model="position1"
						multi-line
						:rules="[v => !!v || 'PositionEn is required']"
					></v-textarea>
					<v-textarea
						label="Team position ES"
						name="position2"
						type="text"
						v-model="position2"
						multi-line
						:rules="[v => !!v || 'PositionEs is required']"
					></v-textarea>
					<v-textarea
						label="Team position RU"
						name="position3"
						type="text"
						v-model="position3"
						multi-line
						:rules="[v => !!v || 'PositionRu is required']"
					></v-textarea>
					<!-- text -->
					<h4 class="text--secondary mt-3">Team text EN</h4>
					<tiptap-vuetify
						v-model="text1"
						:extensions="extensions"
						:toolbar-attributes="{ color: 'primary' }"
						:rules="[v => !!v || 'TextEn is required']" />
					<h4 class="text--secondary mt-3">Team text ES</h4>
					<tiptap-vuetify
						v-model="text2"
						:extensions="extensions"
						:toolbar-attributes="{ color: 'primary' }"
						:rules="[v => !!v || 'TextEs is required']"
					/>
					<h4 class="text--secondary mt-3">Team text RU</h4>
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
						<v-spacer></v-spacer>
						<v-btn
							:loading="loading"
							:disabled="!valid || !(this.imageSrc.length > 1) || loading"
							class="success mb-12 mt-3"
							@click="editTeam"
						>Edit Team</v-btn>
					</v-flex>
				</v-layout>
				{{ ini(teams) }}
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
			name1: '',
			name2: '',
			name3: '',
			position1: '',
			position2: '',
			position3: '',
			text1: '',
			text2: '',
			text3: '',
			valid: false,
			image: null,
			imageSrc: ''
		}),
		computed: {
			teams () {
				const ide = this.ide
				return this.$store.getters.teamById(ide)
			},
			loading () {
				return this.$store.getters.loading
			},
			/*isOwner () {
				return this.ad.ownerId === this.$store.getters.user.id
			}*/
		},
		methods: {
			ini (teams) {
				if(!this.load) { // Сработает один раз, какого то черта работало несколько при загрузке картинки
					this.name1 = teams.en.name
					this.name2 = teams.es.name
					this.name3 = teams.ru.name
					this.position1 = teams.en.position
					this.position2 = teams.es.position
					this.position3 = teams.ru.position
					this.text1 = teams.en.text
					this.text2 = teams.es.text
					this.text3 = teams.ru.text
					this.imageSrc = teams.imageSrc
					this.load = true
				}
			},
			editTeam () {
				if(this.$refs.form.validate() && this.imageSrc.length > 1) {
					const team = {
						en: {
							name: this.name1,
							position: this.position1,
							text: this.text1
						},
						es: {
							name: this.name2,
							position: this.position2,
							text: this.text2
						},
						ru: {
							name: this.name3,
							position: this.position3,
							text: this.text3
						},
						imageSrc: this.imageSrc,
						image: this.image,
						id: this.ide
					}
					
					this.$store.dispatch('editTeam', team)
					.then(() => {
						this.$router.push('/about')
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
