<template>
  <div id="app">
    <template v-for="(route, index) in routersList">
      <el-link :key="index" class="link" :href="route.path">{{ route.name }}</el-link>
    </template>
    <router-view />
  </div>
</template>
<script>
import demoRouters from '@/router/modules/demo';

export default {
  data() {
    return {
      routersList: demoRouters,
    };
  },
  computed: {},
  created() {},
  methods: {},
};
</script>
<style scoped>
.link {
  margin: 5px 10px;
}
</style>
