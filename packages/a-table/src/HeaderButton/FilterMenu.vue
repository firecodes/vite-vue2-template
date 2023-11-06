<template>
  <div class="n-data-table">FilterMenu</div>
</template>
<script>
export default {
  name: 'FilterMenu',
  provide() {
    return {
      FilterMenu: this,
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
