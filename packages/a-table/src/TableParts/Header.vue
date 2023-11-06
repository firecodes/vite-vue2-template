<template>
  <div class="n-data-table-base-table-header" :style="headerStyle">
    <table ref="body" class="n-data-table-table" :style="{ minWidth: scrollX }">
      <colgroup>
        <col
          v-for="(column, index) in columns"
          :key="column.key"
          :style="createCustomWidthStyle(column, index, placement)"
        />
      </colgroup>
      <thead class="n-data-table-thead">
        <tr class="n-data-table-tr">
          <th
            v-for="(column, index) in columns"
            :key="index"
            :ref="column.key"
            :style="{
              textAlign: column.align || null,
              left: ATable.currentFixedColumnLeft(column),
              right: ATable.currentFixedColumnRight(column),
            }"
            class="n-data-table-th"
            :class="{
              'n-data-table-th--filterable': isColumnFilterable(column),
              'n-data-table-th--sortable': isColumnSortable(column),
              [`n-data-table-th--fixed-${column.fixed}`]: column.fixed && column.width,
              'n-data-table-th--shadow-after': ABaseTable.leftActiveFixedColumn[column.key],
              'n-data-table-th--shadow-before': ABaseTable.rightActiveFixedColumn[column.key],
              'n-data-table-th--selection': column.type === 'selection',
            }"
            @click="handleHeaderClick($event, column)"
          >{{ column.title }}</th>
        </tr>
      </thead>
    </table>
  </div>
</template>
<script>
import { createCustomWidthStyle } from '../utils';

export default {
  name: 'AHeader',
  provide() {
    return {
      ATableHeader: this,
    };
  },
  inject: {
    ATable: {
      default: null,
    },
    ABaseTable: {
      default: null,
    },
  },
  props: {
    placement: {
      type: String,
      default: null,
    },
    scrollX: {
      type: [Number, String],
      default: null,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    headerStyle() {
      return {
        overflow: 'scroll',
      };
    },
  },
  methods: {
    isColumnSortable(column) {
      return !!column.sorter;
    },
    isColumnFilterable(column) {
      return !!column.filter;
    },
    createCustomWidthStyle,
    handleCheckboxInput(column) {},
    handleHeaderClick(e, column) {},
  },
};
</script>

<style scoped></style>
