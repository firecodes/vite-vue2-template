<template>
  <div class="about">
    666666666
    <VueVirtualList
      ref="listElRef"
      :item-size="34"
      :items="randomData"
      :item-resizable="true"
      :style="{ height: '300px' }"
    >
      <template slot-scope="scope">
        <div
          :key="index"
          class="item"
          :style="{
            minHeight: `30px`,
            border: '1px solid blue',
            boxSizing: 'border-box',
          }"
        >{{ scope.item.value }}</div>
      </template>
    </VueVirtualList>
  </div>
</template>

<script>
import TableClass from './TableClass.js';

export default {
  data() {
    return {
      randomData: [],
    };
  },
  computed: {},
  created() {
    this.TableClass = TableClass;
    this.randomData = this.TableClass.getRandomData();
  },
  methods: {},
};
</script>

<style lang="less"></style>
