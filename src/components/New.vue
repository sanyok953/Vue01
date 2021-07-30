<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card class="mt-2" v-if="!loading">
          <v-img :src="ne.imageSrc" height="300px"></v-img>
          <v-divider></v-divider>
          <v-card-title>
            {{ ne[langs].title }}
          </v-card-title>
          <v-card-subtitle>
            {{ ne.date }}
          </v-card-subtitle>
          <v-card-text>
            <div
              class="tiptap-vuetify-editor__content text--primary"
              v-html="/*ne[langs].description + '<br />' + */ne[langs].text"
            ></div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions v-if="isUserLoggedIn">
            <v-spacer></v-spacer>
            <v-btn
              text
              class="primary rounded-0 textreal"
              :to="'/editNews/' + ne.id"
              >{{ $t("edit") }}</v-btn
            >
            <!--<EditAdModal :ad="ad" v-if="isOwner"></EditAdModal>-->
            <!--<buy-modal :ad="ad"></buy-modal>-->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//import EditAboutModal from './EditAboutModal'
export default {
  props: ["url"],
  name: 'New',
  metaInfo() {
    return {
      title: `${this.$t('newsT')} | ${this.ne[this.langs].title} | Atlantic games`,
    };
  },
  computed: {
    ne() {
      const url = this.url;
      //return this.$store.getters.newsById(url)
      return this.$store.getters.newsByUrl(url);
    },
    loading() {
      return this.$store.getters.loading;
    },
    langs() {
      return this.$i18n.locale;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    }
  },
  /*data () {
			return {
				lang: localStorage.getItem('lang') || 'en',
			}
		},*/
  components: {
    //EditAdModal: EditAdModal
  },
  watch: {
    langs: function () {
      console.log("GG ", this.langs);
    },
  },
};
</script>

<style scope>
.top-radius {
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
}
</style>