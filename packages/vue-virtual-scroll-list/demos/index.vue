<template>
  <div class="PageList">
    <pageMain />
  </div>
</template>

<script>
import Main from './views/page-mode/Main.vue';

export default {
  name: 'PageList',
  components: { pageMain: Main },
  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="less"></style>
