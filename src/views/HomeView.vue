<template>
  <div class="about">
    <ATable :columns="columns" :data="data" :max-height="500" :scroll-x="1800" virtual-scroll />
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
      this.data = this.TableClass.getData();
      this.columns = this.TableClass.getColumns();
    },
  },
};
</script>

<style lang="less"></style>
