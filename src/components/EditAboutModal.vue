<template>
	<v-dialog width="400px" v-model="modal">
		
		<template v-slot:activator="{ on }">
			<v-btn class="warning rounded-0" text v-on="on">{{ $t('edit') }}</v-btn>
		</template>
		<v-card>
			<v-container>
				<v-layout row>
					<v-flex xs12>
						<v-card-title>
							<h2 class="text--primary">Edit about</h2>
						</v-card-title>
					</v-flex>
				</v-layout>
				<v-row>
					<v-col>
						<!-- text -->
						<h4 class="text--secondary mt-3">Team text EN</h4>
						<tiptap-vuetify
							v-model="ten"
							:extensions="extensions"
							:toolbar-attributes="{ color: 'primary' }"
							:rules="[v => !!v || 'TextEn is required']" />
						<h4 class="text--secondary mt-3">Team text ES</h4>
						<tiptap-vuetify
							v-model="tes"
							:extensions="extensions"
							:toolbar-attributes="{ color: 'primary' }"
							:rules="[v => !!v || 'TextEs is required']"
						/>
						<h4 class="text--secondary mt-3">Team text RU</h4>
						<tiptap-vuetify
							v-model="tru"
							:extensions="extensions"
							:toolbar-attributes="{ color: 'primary' }"
							:rules="[v => !!v || 'TextRu is required']"
						/>
					</v-col>
				</v-row>
					{{ ini(abe) }}
				<v-layout row>
					<v-flex xs12>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn text @click="onCancel">Cancel</v-btn>
							<v-btn
								class="accent"
								text
								@click="onSave"
								:loading="loading"
								:disabled="!valid || loading"
							>Save</v-btn>
						</v-card-actions>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-dialog>

</template>

<script>
	import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History, Image } from 'tiptap-vuetify'
	export default {
		components: { TiptapVuetify },
		data () {
			return {
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
				modal: false,
				ten: "",
				tes: "",
				tru: "",
				init: 0,
				id: null
			}
		},
		computed: {
			abe () {
				return this.$store.getters.getAbout
			},
			loading () {
				return this.$store.getters.loading
			}
		},
		methods: {
			ini (abe) {
				if(abe.id != null && this.init != 2) {
					//console.log("hhh", abe)
					this.ten = abe.text.en
					this.tes = abe.text.es
					this.tru = abe.text.ru
					this.id = abe.id
					this.init = 2
				} else if(this.init === 0) {
					//console.log("hhh", abe)
					this.ten = abe.text.en
					this.tes = abe.text.es
					this.tru = abe.text.ru
					this.id = abe.id
					this.init = 1
				} else
					return
			},
			onCancel () {
				this.modal = false
			},
			onSave () {
				if(this.ten != '' && this.tes != '' && this.tru != '') {
					this.$store.dispatch('updateAbout', {
						ten: this.ten,
						tes: this.tes,
						tru: this.tru,
						id: this.id
					}).then(() => {
						this.$store.dispatch('fetchAbout')
						this.$forceUpdate()
					})
					//this.modal = false
				} else console.log("NO NO", this)
			},
			valid () {
				if(this.ten != '' && this.tes != '' && this.tru != '')
					return true
				return false
			}
		}
	}
</script>

<style scope>

</style>