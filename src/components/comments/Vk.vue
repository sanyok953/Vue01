<template>
    <div class="comments rounded-b-sm">
        <div id="vk_comments"></div>
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
      if (window.VK) {
        window.VK.Widgets.Comments("vk_comments", {limit: 15, attach: "*"});
      }
    },
  }
     
}

    
</script>