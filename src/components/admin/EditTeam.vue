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
					
					<!-- Links -->
					<v-text-field
						label="Facabook"
						name="fb"
						type="text"
						v-model="links.fb"
					></v-text-field>
					<v-text-field
						label="VK"
						name="vk"
						type="text"
						v-model="links.vk"
					></v-text-field>
					<v-text-field
						label="Youtube"
						name="yt"
						type="text"
						v-model="links.yt"
					></v-text-field>
					<v-text-field
						label="Pinterest"
						name="pt"
						type="text"
						v-model="links.pt"
					></v-text-field>
					<v-text-field
						label="OK"
						name="ok"
						type="text"
						v-model="links.ok"
					></v-text-field>
					<v-text-field
						label="LinkedIn"
						name="li"
						type="text"
						v-model="links.li"
					></v-text-field>
					<v-text-field
						label="Instagram"
						name="ig"
						type="text"
						v-model="links.ig"
					></v-text-field>
					<v-text-field
						label="Github"
						name="gh"
						type="text"
						v-model="links.gh"
					></v-text-field>
					<v-text-field
						label="Bahance"
						name="bh"
						type="text"
						v-model="links.bh"
					></v-text-field>
					<v-text-field
						label="Artstation"
						name="as"
						type="text"
						v-model="links.as"
					></v-text-field>
					<v-text-field
						label="Site"
						name="st"
						type="text"
						v-model="links.st"
					></v-text-field>
					<v-text-field
						label="Google play"
						name="gp"
						type="text"
						v-model="links.gp"
					></v-text-field>
					<v-text-field
						label="Email"
						name="em"
						type="text"
						v-model="links.em"
					></v-text-field>
					<v-text-field
						label="Telegram"
						name="tg"
						type="text"
						v-model="links.tg"
					></v-text-field>

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
		name: "editAbout",
		metaInfo() {
			return {
				title: `Edit about, team | Atlantic games`,
			};
		},
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
			imageSrc: '',
			links: {fb: '', vk: '', yt: '', pt: '', ok: '', li: '', ig: '', gh: '', bh: '', as: '', st: '', gp: '', em: '', tg: ''}
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
					this.links.fb = teams.links.fb || ''
					this.links.vk = teams.links.vk || ''
					this.links.yt = teams.links.yt || ''
					this.links.pt = teams.links.pt || ''
					this.links.ok = teams.links.ok || ''
					this.links.li = teams.links.li || ''
					this.links.ig = teams.links.ig || ''
					this.links.gh = teams.links.gh || ''
					this.links.bh = teams.links.bh || ''
					this.links.as = teams.links.as || ''
					this.links.st = teams.links.st || ''
					this.links.gp = teams.links.gp || ''
					this.links.em = teams.links.em || ''
					this.links.tg = teams.links.tg || ''
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
						links: {fb: this.links.fb, vk: this.links.vk, yt: this.links.yt, pt: this.links.pt, ok: this.links.ok, li: this.links.li, ig: this.links.ig, gh: this.links.gh, bh: this.links.bh, as: this.links.as, st: this.links.st, gp: this.links.gp, em: this.links.em, tg: this.links.tg},
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
