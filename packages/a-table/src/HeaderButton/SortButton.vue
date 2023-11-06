<template>
  <div class="n-data-table">SortButton</div>
</template>
<script>
export default {
  name: 'SortButton',
  provide() {
    return {
      SortButton: this,
    };
  },
  data() {
    return {
      data: [],
      columns: [],
    };
  },
};
</script>

<style scoped></style>
