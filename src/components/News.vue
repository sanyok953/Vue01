<template>
  <div>
    <!-- News -->
    <v-container fluid>
      <v-layout row wrap class="mt-1">
        <v-flex xs12 sm12 md6 lg6 v-for="ne in news" :key="ne.url">
          <v-card :elevation="3" class="ma-2 d-flex flex-column" height="95%">
            <v-img :src="ne.imageSrc" aspect-ratio="1.78" max-height="200px">
            </v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ ne[langs].title }}</h3>
              </div>
            </v-card-title>
            <v-card-subtitle>{{ ne.date }}</v-card-subtitle>
            <v-card-text class="pb-0 mb-1">
              <div class="text--primary" v-html="ne[langs].text">
                
              </div>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-divider class="mx-3"></v-divider>
            <v-card-actions class="mb-1 mt-1">
              <v-spacer></v-spacer>
              <v-btn
                v-if="isUserLoggedIn"
                text
                class="warning rounded-0 textreal"
                :to="'/editNews/' + ne.id"
                >{{ $t("edit") }}</v-btn
              >
              <v-btn
                text
                class="accent rounded-0 textreal"
                :to="'/newsFull/' + ne.url"
                >{{ $t("open") }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'News',
  metaInfo() {
    return {
      title: `${this.$t('allNewsT')} | Atlantic games`,
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    news() {
      //console.log(this.$store.getters.news)
      return this.$store.getters.news;
    },
    langs() {
      return this.$i18n.locale;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
  watch: {
    langs: function () {
      console.log("GG ", this.langs);
    },
  },
};
</script>

<style scope>

.butt {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 5px 10px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
.left-radius {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
</style>
