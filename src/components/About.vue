<template>
  <div class="about">
    <h2 class=" mt-2 primary h2title" v-if="isUserLoggedIn || (ab.id != null && ab.text[langs].length > 14)">
      {{ $t("about") }}
    </h2>
    <v-container fluid v-if="isUserLoggedIn || (ab.id != null && ab.text[langs].length > 14)">
      <v-row>
        <v-col>
          <v-card>
            <v-card-text v-html="ab.text[langs]"> </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <EditAboutModal v-if="isUserLoggedIn"></EditAboutModal>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Team -->
    <h2 class="mt-2 h2title primary">{{ $t("ourTeam") }}</h2>

    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="te in team"
          :key="te.url"
          xs="12"
          sm="12"
          md="12"
          lg="12"
          class="mt-6"
        >
          <v-card :elevation="3" class="mt-2 d-flex flex-column">
            <v-row dense class="ma-1">
              <v-col xs="12" sm="5" md="4" lg="2" class="mt-6">
                <v-avatar
                  class="profile mt-n14"
                  color="white"
                  size="100%"
                  height="auto"
                  aspect-ratio="1"
                >
                  <v-img :src="te.imageSrc"></v-img>
                </v-avatar>
              </v-col>

              <v-col xs="12" sm="7" md="8" lg="10">
                <v-card-title class="headline pt-0 mt-5 word">
                  {{ te[langs].name }}
                </v-card-title>

                <v-card-subtitle class="mt-2 word">{{
                  te[langs].position
                }}</v-card-subtitle>
                <v-spacer></v-spacer>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-card-text>
                  <div
                    v-html="te[langs].text"
                    class="text--primary tiptap-vuetify-editor__content word"
                  ></div>
                </v-card-text>
                <v-divider class="mx-3 mb-1"></v-divider>

                <v-card-actions class="d-flex">
                  <div class="d-flex flex-wrap">
                    <v-tooltip top
                      v-for="li in getLinks(te.links)"
                      v-show="li.va != ''"
                      :key="li.ic"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="$router.absUrl(li.va)"
                          v-show="li.va != ''"
                          class="my-2 mx-1 py-1"
                          :color="li.cl"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark>
                            {{ li.ic }}
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>{{ li.ti }}</span>
                    </v-tooltip>
                  </div>

                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="isUserLoggedIn"
                    text
                    class="primary rounded-0 textreal"
                    :to="'/editTeam/' + te.id"
                    >{{ $t("edit") }}</v-btn
                  >
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EditAboutModal from "@/components/admin/EditAboutModal";
export default {
  name: "About",
  metaInfo() {
    return {
      title: `${this.$t('aboutT')} | Atlantic games`,
    };
  },
  computed: {
    team() {
      return this.$store.getters.team;
    },
    ab() {
      return this.$store.getters.getAbout;
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
  methods: {
    getLinks(PL) {
      //console.log(PL)
      //fb: '', vk: '', yt: '', pt: '', ok: '', li: '', ig: '', gh: '', bh: '', as: '', st: '', gp: '', em: '', tg: ''
      return [
        {ic: 'mdi-facebook', va: PL.fb, cl: '#475993', ti: 'Facabook'},
        {ic: 'mdi-vk', va: PL.vk, cl: '#4D76A1', ti: 'VK'},
        {ic: 'mdi-youtube', va: PL.yt, cl: '#FF0000', ti: 'Youtube'},
        {ic: 'mdi-pinterest', va: PL.pt, cl: '#CB2027', ti: 'Pinterest'},
        {ic: 'mdi-odnoklassniki', va: PL.ok, cl: '#FF9800', ti: 'OK'},
        {ic: 'mdi-linkedin', va: PL.li, cl: '#0077B7', ti: 'Linkedin'},
        {ic: 'mdi-instagram', va: PL.ig, cl: '#F64F4C', ti: 'Instagram'},
        {ic: 'mdi-github', va: PL.gh, cl: '#111111', ti: 'Github'},
        {ic: 'mdi-bootstrap', va: PL.bh, cl: '#4176FA', ti: 'Behance'},
        {ic: 'mdi-artstation', va: PL.as, cl: '#26BDF1', ti: 'Artstation'},
        {ic: 'mdi-web', va: PL.st, cl: '#22F1C8', ti: 'Website'},
        {ic: 'mdi-google-play', va: PL.gp, cl: '#4CAF50', ti: 'Google play'},
        {ic: 'mdi-at', va: 'mailto:' + PL.em, cl: '#F3B422', ti: 'Email'},
        {ic: 'mdi-telegram', va: PL.tg, cl: '#039BE5', ti: 'Telegram'}
      ]
    }
  },
  /*data () {
			return {
				lang: localStorage.getItem('lang') || 'en',
			}
		},*/
  components: {
    EditAboutModal: EditAboutModal,
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
  /*background: #8bc34a;*/
  display: inline-block;
  padding: 0 8px;
  margin-left: -6px;
  color: ivory;
}

.word {
  word-break: keep-all;
}
</style>