<template>
  <div class="content comments rounded-b-sm">
    <div
      class="fb-comments"
      :data-href="this.$route.query.page"
      data-width="100%"
      data-numposts="15"
      data-colorscheme="dark"
    ></div>
  </div>
</template>

<script>
export default {
  name: "comment",
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (window.FB) {
        window.FB.init({
          appId: "593508858002236",
          status: true,
          xfbml: true,
          version: "v3.3",
        });
      }
    },
  },
};
</script>

<style scoped>
  .content {
    color: white;
  }
</style>