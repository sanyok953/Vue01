<template>
	<v-container>
		
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<h1 class="text--secondary mb-3">Create New Employee</h1>
				<v-form v-model="valid" ref="form" validation class="mb-3">
					<!-- name -->
					<v-text-field
						label="Employee name EN"
						name="name1"
						type="text"
						v-model="name1"
						required
						:rules="[v => !!v || 'NameEn is required']"
					></v-text-field>
					<v-text-field
						label="Employee name ES"
						name="name2"
						type="text"
						v-model="name2"
						required
						:rules="[v => !!v || 'NameEs is required']"
					></v-text-field>
					<v-text-field
						label="Employee name RU"
						name="name3"
						type="text"
						v-model="name3"
						required
						:rules="[v => !!v || 'NameRu is required']"
					></v-text-field>
					<!-- position -->
					<v-textarea
						label="Employee position EN"
						name="position1"
						type="text"
						v-model="position1"
						multi-line
						:rules="[v => !!v || 'PositionEn is required']"
					></v-textarea>
					<v-textarea
						label="Employee position ES"
						name="position2"
						type="text"
						v-model="position2"
						multi-line
						:rules="[v => !!v || 'PositionEs is required']"
					></v-textarea>
					<v-textarea
						label="Employee position RU"
						name="position3"
						type="text"
						v-model="position3"
						multi-line
						:rules="[v => !!v || 'PositionRu is required']"
					></v-textarea>
					<!-- text -->
					<v-textarea
						label="Employee text EN"
						name="text1"
						type="text"
						v-model="text1"
						multi-line
						:rules="[v => !!v || 'TextEn is required']"
					></v-textarea>
					<v-textarea
						label="Employee text ES"
						name="text2"
						type="text"
						v-model="text2"
						multi-line
						:rules="[v => !!v || 'TextEs is required']"
					></v-textarea>
					<v-textarea
						label="Employee text RU"
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
						<img :src="imageSrc" style="max-height: 100px;" v-if="imageSrc" />
					</v-flex>
				</v-layout>
				
				<v-layout row>
					<v-flex xs12>
						<v-spacer></v-spacer>
						<v-btn
							:loading="loading"
							:disabled="!valid || !image || loading"
							class="success mb-4"
							@click="createEmployee"
						>Create Employee</v-btn>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		name: "newTeam",
		metaInfo() {
			return {
				title: `New team | Atlantic games`,
			};
		},
		data: () => ({
			edit: false,
			name1: 'ten',
			name2: 'tes',
			name3: 'tru',
			position1: 'den',
			position2: 'des',
			position3: 'dru',
			text1: 'fen',
			text2: 'fes',
			text3: 'fru',
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
			createEmployee () {
				if(this.$refs.form.validate() && this.image) {
					const employee = {
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
						url: this.transliterate(this.name1),
						image: this.image
					}
					
					this.$store.dispatch('createTeam', employee)
					.then(() => {
						this.$router.push('/team')
					})
					.catch(() => {})
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
			},
			getNow () {
				const today = new Date()
				console.log(today)
				return today.getDate() + '-' + (today.getMonth() + 1 ) + '-' + today.getFullYear()
			},
			transliterate (word) {
				console.log(word)
				const keys = {
					'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
					'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
					'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
					'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
					'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
					'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya',
					' ': '-', ':': '', '!': '', '?': '', '(': '', ')': ''
				}
				return word.split("").map((char) => keys[char] || char.toLowerCase()).join("") || '-';
			}
		}
	}
			/*function transliterate(word) {
				console.log(word)
				const keys = {
					'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
					'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
					'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
					'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
					'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
					'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya',
					' ': '-', ':': '', '!': '', '?': '', '(': '', ')': ''
				}
				return word.split("").map((char) => keys[char] || char.toLowerCase()).join("") || '-';
			}*/
</script>

