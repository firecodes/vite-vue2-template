<template>
  <div class="n-data-table">FilterButton</div>
</template>
<script>
export default {
  name: 'FilterButton',
  provide() {
    return {
      FilterButton: this,
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
