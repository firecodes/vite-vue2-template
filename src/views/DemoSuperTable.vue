<template>
  <div class="about">
    <ASuperTable :columns="columns" :data="data" />
  </div>
</template>

<script>
import TableClass from './TableClass.js';

export default {
  data() {
    return {
      data: [],
      columns: [],
    };
  },
  computed: {},
  created() {
    this.TableClass = TableClass;
    this.TableClass.init();
    this.init();
  },
  methods: {
    async init() {
      this.columns = this.TableClass.getSuperTableColumns();
      this.TableClass.getQueryData(100 * 100).then((data) => {
        this.data = data;
      });
    },
  },
};
</script>

<style lang="less"></style>
