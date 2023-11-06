<template>
  <div class="about">
    <markdown :html="defaultContent" />
    <!-- <markdown :markdown="gptResponse" :compact="true" :render-options="{ sanitize: true }" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {},
    };
  },
  computed: {
    defaultContent() {
      // if (!this.article) {
      //   return null;
      // }
      // const markdown = this.article.content;
      // const { html, headings } = renderArticleMarkdown(markdown, optimizeImageSource);
      // return { markdown, html, headings };
      return '';
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="less"></style>
