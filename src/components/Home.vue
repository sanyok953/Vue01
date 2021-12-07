<template>
  <div>
    <!-- Carousel -->
    <v-container class="pa-2" fluid>
      <v-carousel cycle>
        <v-carousel-item v-for="sl in slider" :key="sl.id" :src="sl.imageSrc">
          <div class="carousel-link">
            <v-btn class="accent" :to="'/newsFull/' + sl.url">{{
              sl[langs].title
            }}</v-btn>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <v-divider class="mx-2 mt-1 mb-2"></v-divider>

    <!-- News -->
    <h2 class="mt-2 h2title primary">{{ $t("news") }}</h2>

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="ne in news" :key="ne.url">
          <v-card :elevation="3" class="ma-2 d-flex flex-column" height="95%">
            <v-img :src="ne.imageSrc" aspect-ratio="1.78" max-height="200px">
            </v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ ne[langs].title }}</h3>
              </div>
            </v-card-title>
            <v-card-subtitle>{{ ne.date }}</v-card-subtitle>
            <v-card-text>
              <div class="text--primary">
                {{ getShort(ne[langs].text) }}
              </div>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-divider class="mx-3 mb-1"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="isUserLoggedIn"
                text
                class="warning rounded-0 textreal mb-1"
                :to="'/editNews/' + ne.id"
                >{{ $t("edit") }}</v-btn
              >
              <v-btn
                text
                class="accent rounded-0 textreal mb-1"
                :to="'/newsFull/' + ne.url"
                >{{ $t("open") }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-col class="text-center" cols="12">
        <v-btn
          v-if="4 in this.$store.getters.news"
          text
          class="accent rounded-0 textreal mt-4"
          :to="'/news'"
          >{{ $t("moreNews") }}</v-btn
        >
        <v-btn
          v-if="isUserLoggedIn"
          text
          class="accent rounded-0 textreal mt-4"
          :to="'/newNews'"
          >{{ $t("newNews") }}</v-btn
        >
      </v-col>
    </v-container>

    <!-- Games -->
    <v-divider class="mx-3 mt-1 mb-2"></v-divider>
    <h2 class="mt-2 h2title primary">{{ $t("games") }}</h2>

    <v-container fluid>
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md6
          lg4
          v-for="game in games"
          :key="game.url"
          v-show="game.promo"
        >
          <v-card :elevation="3" class="ma-2 d-flex flex-column" height="95%">
            <v-img :src="game.imageSrc" aspect-ratio="1.78" height="200px">
            </v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ game[langs].title }}</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <div class="text--primary">
                {{ game[langs].description }}
              </div>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-divider class="mx-3 mb-1"></v-divider>
            <v-card-actions class="mb-1">
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
                class="accent rounded-0 textreal"
                v-if="game.link != ''"
                @click="$router.absUrl(game.link)"
                >{{ $t("download") }}</v-btn
              >
              <v-btn
                text
                class="accent rounded-0 textreal"
                :to="'/game/' + game.url"
                >{{ $t("open") }}</v-btn
              >

              <!--<buy-modal :game="game"></buy-modal>-->
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-col class="text-center" cols="12">
        <v-btn
          v-if="2 in this.$store.getters.games"
          text
          class="accent rounded-0 textreal mt-4"
          :to="'/games'"
          >{{ $t("moreGames") }}</v-btn
        >
        <v-btn
          v-if="isUserLoggedIn"
          text
          class="accent rounded-0 textreal mt-4"
          :to="'/newGame'"
          >{{ $t("newGame") }}</v-btn
        >
      </v-col>
    </v-container>

    <!-- About -->
    <v-divider class="mx-2 mt-1 mb-2"></v-divider>
    <h2 class="mt-2 h2title primary" v-if="isUserLoggedIn || (ab.id != null && ab.text[langs].length > 14)">{{ $t("about") }}</h2>

    <v-container class="pa-2" fluid v-if="isUserLoggedIn || (ab.id != null && ab.text[langs].length > 14)">
      <v-row dense>
        <v-col cols="12">
          <v-card :elevation="3" class="d-flex flex-column">
            <v-card-text>
              <div class="text--primary" v-html="ab.text[langs]"></div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <EditAboutModal v-if="isUserLoggedIn"></EditAboutModal>
              <v-btn text class="accent rounded-0 textreal" :to="'/about'">{{
                $t("open")
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Team -->
    <h2 class="mt-2 h2title primary">{{ $t("ourTeam") }}</h2>

    <v-container class="pa-2" fluid>
      <v-row dense>
        <v-col
          v-for="te in teams"
          :key="te.url"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          class="mt-6"
        >
          <v-card :elevation="3" class="mt-2 d-flex flex-column" height="100%">
            <v-row class="ma-0">
              <v-col xs="12" sm="4" md="4" lg="3">
                <v-avatar
                  class="profile mt-n10"
                  color="white"
                  size="100%"
                  height="auto"
                  aspect-ratio="1"
                >
                  <v-img :src="te.imageSrc"></v-img>
                </v-avatar>
              </v-col>

              <v-col xs="12" sm="8" md="8" lg="9">
                <v-card-title class="headline pt-0">
                  {{ te[langs].name }}
                </v-card-title>

                <v-card-subtitle>{{ te[langs].position }}</v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-text>
                  <div class="text--primary">
                    {{ getShort(te[langs].text) }}
                  </div>
                </v-card-text>
              </v-col>
            </v-row>
            <v-col class="pb-0">
              <v-divider class=""></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="isUserLoggedIn"
                  text
                  class="warning rounded-0 textreal"
                  :to="'/editTeam/' + te.id"
                  >{{ $t("edit") }}</v-btn
                >
                <v-btn
                  text
                  class="accent rounded-0 textreal"
                  :to="'/about#' + te.url"
                  >{{ $t("read") }}</v-btn
                >
              </v-card-actions>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
      <v-col class="text-center" cols="12">
        <!--<v-btn v-if="2 in this.$store.getters.games" text class="accent rounded-0 textreal mt-4" :to="'/games'">{{
          $t("moreGames")
        }}</v-btn>-->

        <v-btn text class="accent rounded-0 textreal mt-1" :to="'/about'">{{
          $t("more")
        }}</v-btn>
        
        <v-btn
          v-if="isUserLoggedIn"
          text
          class="accent rounded-0 textreal mt-1"
          :to="'/newTeam'"
        >
        {{ $t("newPerson") }}
        </v-btn>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import EditAboutModal from "@/components/admin/EditAboutModal";
export default {
  name: "Home",
  metaInfo() {
    return {
      title: `${this.$t("mainT")} | Atlantic games`,
    };
  },
  computed: {
    slider() {
      return this.$store.getters.promoNews;
    },
    ab() {
      return this.$store.getters.getAbout;
    },
    news() {
      return this.$store.getters.news4;
    },
    games() {
      return this.$store.getters.games2;
    },
    teams() {
      return this.$store.getters.team;
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
    /*slider () {
				return this.news.concat(this.games)
			}*/
  },
  components: {
    EditAboutModal: EditAboutModal,
  },
  methods: {
    getShort (txt) {
			const coun = 200
      let text = txt
      text = text.replace(/<\/?[^>]+>/g,' ')
      if(text.length > coun)
        text = text.slice(0, coun) + "..."
        return text
    }
  },
  watch: {
    langs: function () {
      //console.log("GG ", this.langs);
    },
  },
};
</script>

<style scoped>
.datediv {
  display: inline-block;
  transform: translate(0, 20%);
}

.h2title {
  background: #8bc34a;
  display: inline-block;
  padding: 0 8px;
  margin-left: -6px;
  color: ivory;
}

.textreal {
  color: ivory;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.35);
}

.carousel-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.3);
  transform: translate(-50%, 0);
  padding: 10px 20px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>
