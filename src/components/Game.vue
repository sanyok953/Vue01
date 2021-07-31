<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card class="mt-2" v-if="!loading">
          <v-img :src="game.imageSrc" height="340px"></v-img>
          <v-divider></v-divider>
          <v-card-title>
            {{ game[langs].title }}
          </v-card-title>
          <v-card-subtitle>
            {{ game.date }}
          </v-card-subtitle>
          <v-card-text>
            <div
              class="tiptap-vuetify-editor__content text--primary"
              v-html="game[langs].text"
            ></div>
          </v-card-text>
          
          <!-- Admin -->
          <v-divider v-if="isUserLoggedIn || game.link != ''" class="mx-3"></v-divider>
          <v-card-actions v-if="isUserLoggedIn || game.link != ''">
            <v-spacer></v-spacer>
            <v-btn
              text
              v-show="game.link != ''"
              class="accent rounded-0 textreal"
              @click="$router.absUrl(game.link)"
              >{{ $t("download") }}</v-btn>
            <v-btn
              text
              v-if="isUserLoggedIn"
              class="primary rounded-0 textreal"
              :to="'/editGame/' + game.id"
              >{{ $t("edit") }}</v-btn>
          </v-card-actions>

          <v-divider class="mx-3 mt-1 mb-2"></v-divider>
          <h2 class="mt-2 mb-3 h2title primary">{{ $t("comments") }}</h2>

          <v-tabs
            v-model="tab"
            align-with-title
            background-color="secondary"
            icons-and-text
          >
            <v-tabs-slider color="accent"></v-tabs-slider>

            <v-tab v-for="t in tabs" :key="t.t">
              {{ t.t }}
              <v-icon>{{ t.i }}</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="t in tabs" :key="t.t">
              <v-card flat>
                <Facebook v-if="t.t == 'Facebook'" />
                <Vk v-if="t.t == 'VK'" />
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Facebook from './comments/Facebook.vue'
import Vk from './comments/Vk.vue'
export default {
  name: "Game",
  metaInfo() {
    return {
      title: `${this.$t('gameT')} | ${this.game[this.langs].title} | Atlantic games`,
    };
  },
  props: ["url"],
  computed: {
    game() {
      const url = this.url;
      return this.$store.getters.gameByUrl(url);
    },
    loading() {
      return this.$store.getters.loading;
    },
    langs() {
      return this.$i18n.locale;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
  data() {
    return {
      tab: null,
      tabs: [
        {t: "Facebook", i: "mdi-facebook"},
        {t: "VK", i: "mdi-vk"}
      ],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  components: {
    Facebook,
    Vk
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
    background: #8bc34a;
    display: inline-block;
    padding: 0 8px;
    margin-left: -6px;
    color: ivory;
  }
</style>