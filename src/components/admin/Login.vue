<template>
	<v-container
		class="fill-height"
		fluid
	>
		<v-row
			align="center"
			justify="center"
		>
			<v-col
				cols="12"
				sm="8"
				md="5"
			>
				<v-card class="elevation-12">
					<v-toolbar
						color="primary"
						dark
						flat
					>
						<v-toolbar-title>Login form</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form v-model="valid" ref="form" lazy-validation>
							<v-text-field
								label="Email"
								name="email"
								prepend-icon="mdi-email"
								type="email"
								v-model="email"
								:rules="emailRules"
							></v-text-field>

							<v-text-field
								id="password"
								label="Password"
								name="password"
								prepend-icon="mdi-lock"
								type="password"
								v-model="password"
								:counter="6"
								:rules="passwordRules"
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="primary"
							@click="onSubmit"
							:loading="loading"
							:disabled="!valid"
						>Login</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: "Login",
		metaInfo() {
			return {
				title: `Login | Atlantic games`,
			};
		},
		data () {
			return {
				email: '',
				password: '',
				valid: false,
				emailRules: [
					value => !!value || 'Required.',
					value => (value || '').length <= 20 || 'Max 20 characters',
					value => {
						const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						return pattern.test(value) || 'Invalid e-mail.'
					}
				],
				passwordRules: [
					value => !!value || 'Password is required',
					value => (value && value.length >= 6) || 'Name must be less than 6 characters'
				]
			}
		},
		computed: {
			loading () {
				return this.$store.getters.loading
			}
		},
		methods: {
			onSubmit () {
				if (this.$refs.form.validate()) {
					const user = {
						email: this.email,
						password: this.password
					}
					this.$store.dispatch('loginUser', user)
						.then(() => {
							this.$router.push('/')
						})
						.catch(() => {})
				}
			}
		},
		created () {
			if (this.$route.query['loginError']) {
				this.$store.dispatch('setError', 'Please log in to access this page.')
			}
		}
	}
</script>
