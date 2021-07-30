<template>
  <div>
    <v-container fluid>
      <h1 class="ma-4">404 {{ $t("p404") }}</h1>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  metaInfo() {
    return {
      title: `${this.$t('p404')} | Atlantic games`,
    }
  },
}
</script>

<style scoped>

</style>