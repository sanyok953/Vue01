<template>
  <div>
    <!-- Games -->
    <h2 class="mt-2 h2title primary">{{ $t("games") }}</h2>
    <v-container fluid class="pt-1">
      <v-layout row wrap class="mt-1">
        <v-flex xs12 sm12 md6 lg6 v-for="game in games" :key="game.url" v-show="isUserLoggedIn || game.promo">
          <v-card :elevation="3" class="ma-2 d-flex flex-column" height="95%">
            <v-img :src="game.imageSrc" aspect-ratio="1.78" max-height="200px">
            </v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ game[langs].title }}</h3>
              </div>
            </v-card-title>
            <v-card-subtitle>{{ game.date }}</v-card-subtitle>
            <v-card-text class="pb-0 mb-1">
              <div class="text--primary">
                {{ game[langs].description }}
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
                :to="'/editGame/' + game.id"
                >{{ $t("edit") }}</v-btn
              >
              <v-btn
                text
                v-show="game.link != ''"
                class="accent rounded-0 textreal"
                @click="$router.absUrl(game.link)"
                >{{ $t("download") }}</v-btn>
              <v-btn
                text
                class="accent rounded-0 textreal"
                :to="'/game/' + game.url"
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
  name: "Games",
  metaInfo() {
    return {
      title: `${this.$t('allGamesT')} | Atlantic games`,
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    games() {
      return this.$store.getters.games;
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
      //console.log("GG ", this.langs);
    },
  },
};
</script>

<style scoped>
.h2title {
  display: inline-block;
  padding: 0 8px;
  margin-left: -6px;
  color: ivory;
}
</style>