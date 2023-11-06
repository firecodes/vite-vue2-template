<template>
  <div
    class="n-data-table"
    :class="{
      [`n-data-table--${size}-size`]: true,
      'n-data-table--bordered': bordered,
      'n-data-table--single-line': singleLine,
      'n-data-table--single-column': singleColumn,
    }"
  >
    <div class="n-data-table-wrapper">
      <base-table
        ref="mainTableRef"
        main
        :scroll-x="styleScrollX"
        :max-height="maxHeight"
        :min-height="minHeight"
        :data="paginatedData"
        :columns="normalizedColumns"
        :row-class-name="rowClassName"
        :loading="loading"
        :bordered="bordered"
      >
        <div
          v-if="paginatedData.length === 0"
          class="n-data-table-empty"
          :class="{
            'n-data-table-empty--hide': loading,
          }"
        >data-table-empty</div>
      </base-table>
    </div>
  </div>
</template>
<script>
import TableClass from './TableClass.js';
import { formatLength } from './utils.js';

import BaseTable from './BaseTable.vue';

export default {
  name: 'ATable',
  components: {
    BaseTable,
  },
  provide() {
    return {
      ATable: this,
    };
  },
  props: {
    pagination: {
      type: [Object, Boolean],
      default: false,
    },
    minHeight: {
      type: [Number, String],
      default: null,
    },
    maxHeight: {
      type: [Number, String],
      default: null,
    },
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
    rowClassName: {
      type: [String, Function],
      default: '',
    },
    rowKey: {
      type: Function,
      default: null,
    },
    loading: {
      type: [Boolean],
      default: false,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    scrollX: {
      type: [Number, String],
      default: null,
    },
    defaultCheckedRowKeys: {
      type: Array,
      default: () => [],
    },
    checkedRowKeys: {
      type: Array,
      default: null,
    },
    paging: {
      type: Boolean,
      default: true,
    },
    singleLine: {
      type: Boolean,
      default: true,
    },
    singleColumn: {
      type: Boolean,
      default: false,
    },
    size: {
      validator(value) {
        return ['small', 'medium', 'large'].includes(value);
      },
      default: 'medium',
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:page': {
      type: [Function, Array],
      default: undefined,
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:pageSize': {
      type: [Function, Array],
      default: undefined,
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:sorter': {
      type: [Function, Array],
      default: undefined,
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:filters': {
      type: [Function, Array],
      default: undefined,
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:checkedRowKeys': {
      type: [Function, Array],
      default: undefined,
    },
    // deprecated
    onPageChange: {
      validator() {
        return true;
      },
      default: undefined,
    },
    onPageSizeChange: {
      validator() {
        return true;
      },
      default: undefined,
    },
    onSorterChange: {
      validator() {
        return true;
      },
      default: undefined,
    },
    onFiltersChange: {
      validator() {
        return true;
      },
      default: undefined,
    },
    onCheckedRowKeysChange: {
      validator() {
        return true;
      },
      default: undefined,
    },
  },
  data() {
    return {
      /* which part is being scrolling: main left right header */
      scrollingPart: null,
      scrollReceived: false,
      /** internal checked rows */
      internalCheckedRowKeys: [],
      /** internal filters state */
      internalActiveFilters: {},
      /** internal sorter state */
      internalActiveSorter: null,
      /** internal pagination state */
      internalCurrentPage: 1,
      internalPageSize: 10,
    };
  },
  computed: {
    styleScrollX() {
      return formatLength(this.scrollX);
    },
    normalizedColumns() {
      return this.columns.map((column) => TableClass.normalizeColumn(column));
    },
    filteredData() {
      const { data } = this;
      return data || [];
    },
    sortedData() {
      return this.filteredData;
    },
    paginatedData() {
      if (!this.pagination) return this.sortedData;
      if (!this.paging) return this.sortedData;
      const pageSize = this.syntheticPageSize;
      const startIndex = (this.internalCurrentPage - 1) * pageSize;
      return this.sortedData.slice(startIndex, startIndex + pageSize);
    },
    leftFixedColumns() {
      return this.normalizedColumns.filter((column) => column.fixed === 'left');
    },
    rightFixedColumns() {
      return this.normalizedColumns.filter((column) => column.fixed === 'right');
    },
    currentFixedColumnLeft() {
      return (column) => {
        const index = this.leftFixedColumns.indexOf(column);
        if (index < 0) {
          return;
        }
        let left = 0;
        for (let i = 0; i < index; i++) {
          left += this.leftFixedColumns[i].width;
        }
        return `${left}px`;
      };
    },
    currentFixedColumnRight() {
      return (column) => {
        const index = this.rightFixedColumns.indexOf(column);
        if (index < 0) {
          return;
        }
        let right = 0;
        for (let i = this.rightFixedColumns.length - 1; i > index; i--) {
          right += this.rightFixedColumns[i].width;
        }
        return `${right}px`;
      };
    },
  },
  created() {
    this.TableClass = TableClass;
  },
  methods: {
    scrollMainTableBodyToTop() {
      const { body } = this.getScrollElements();
      body.scrollTop = 0;
    },
    getScrollElements() {
      const { mainTableRef } = this.$refs;
      const header = mainTableRef ? mainTableRef.getHeaderElement() : null;
      const body = mainTableRef ? mainTableRef.getBodyElement() : null;
      return { header, body };
    },
    handleTableHeaderScroll() {
      const { scrollReceived, scrollingPart } = this;
      if (scrollReceived && scrollingPart === 'header') return;
      switch (scrollingPart) {
        case 'header':
        case null:
          this.scrollingPart = 'header';
          this.scrollReceived = true;
          // nextFrame(this.syncScrollState);
          break;
        case 'body':
          this.scrollingPart = null;
          this.scrollReceived = false;
          break;
        default:
          break;
      }
    },
    handleTableBodyScroll() {
      const { scrollReceived, scrollingPart } = this;
      // if (scrollReceived && scrollingPart === 'body') { return;}
      switch (scrollingPart) {
        case 'body':
        case null:
          this.scrollingPart = 'body';
          this.scrollReceived = true;
          // nextFrame(this.syncScrollState);
          this.syncScrollState();
          break;
        case 'header':
          this.scrollingPart = null;
          this.scrollReceived = false;
          break;
        default:
          break;
      }
      // console.log('syncScrollState 1', this.scrollingPart, this.scrollReceived);
    },
    syncScrollState() {
      const { scrollingPart } = this;
      const { header, body } = this.getScrollElements();
      // if (body.scrollLeft === header.scrollLeft) {
      //   this.scrollingPart = null;
      //   this.scrollReceived = false;
      //   return;
      // }
      // console.log('syncScrollState 2', this.scrollingPart, header, header.scrollLeft, body, body.scrollLeft);
      switch (scrollingPart) {
        case 'header':
          body.scrollLeft = header.scrollLeft;
          break;
        case 'body':
          header.scrollLeft = body.scrollLeft;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less">
@import './styles/index.less';
</style>
