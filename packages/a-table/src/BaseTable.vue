<template>
  <div class="n-data-table-base-table">
    <vue-resize-observer @resize="handleHeaderResize">
      <table-header
        ref="headerRef"
        :placement="placement"
        :columns="columns"
        :data="data"
        :scroll-x="scrollX"
        @scroll="handleHeaderScroll"
      />
    </vue-resize-observer>
    <table-body
      ref="bodyRef"
      :style="bodyStyle"
      :main="main"
      :placement="placement"
      :scroll-x="scrollX"
      :data="data"
      :columns="columns"
      :row-class-name="rowClassName"
      :loading="loading"
    />
    <slot />
  </div>
</template>
<script>
import TableHeader from './TableParts/Header.vue';
import TableBody from './TableParts/Body.vue';
import { formatLength } from './utils.js';

export default {
  name: 'BaseTable',
  components: {
    TableHeader,
    TableBody,
  },
  provide() {
    return {
      ABaseTable: this,
    };
  },
  inject: {
    ATable: {
      default: null,
    },
  },
  props: {
    main: {
      type: Boolean,
      default: false,
    },
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
    height: {
      type: Number,
      default: 0,
    },
    maxHeight: {
      type: Number,
      default: null,
    },
    minHeight: {
      type: Number,
      default: null,
    },
    rowClassName: {
      type: [Function, String],
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tableWidth: null,
      bodyMaxHeight: null,
      bodyMinHeight: null,
      leftActiveFixedColumn: {},
      rightActiveFixedColumn: {},
    };
  },
  computed: {
    bodyStyle() {
      return {
        maxHeight: formatLength(this.bodyMaxHeight),
        minHeight: formatLength(this.bodyMinHeight),
      };
    },
    fixedColumnsLeft() {
      const columnsLeft = {};
      let left = 0;
      const { columns } = this;
      const { headerRef } = this.$refs;
      columns.map((column) => {
        if (this.ATable.leftFixedColumns.indexOf(column) > -1) {
          columnsLeft[column.key] = left;
        }
        left += headerRef.$refs[column.key][0].offsetWidth;
      });
      return columnsLeft;
    },
    fixedColumnsRight() {
      const columnsRight = {};
      let right = 0;
      const { columns } = this;
      const { headerRef } = this.$refs;
      columns.map((column) => {
        if (this.ATable.rightFixedColumns.indexOf(column) > -1) {
          columnsRight[column.key] = right;
        }
        right += headerRef.$refs[column.key][0].offsetWidth;
      });
      return columnsRight;
    },
  },
  methods: {
    getHeaderElement() {
      return this.$refs.headerRef.$el;
    },
    getBodyElement() {
      return this.$refs.bodyRef.getScrollContainer();
    },
    handleHeaderResize(entry) {
      console.log('handleHeaderResize', entry);
      this.setTableWidth(entry.contentRect.width);
      this.setBodyMinMaxHeight(entry.contentRect.height);
      this.setActiveLeftFixedColumn(entry.target);
      this.setActiveRightFixedColumn(entry.target);
      this.$nextTick(() => {
        console.log('handleHeaderResize nextTick', this.bodyStyle);
      });
    },
    handleHeaderScroll(e) {
      console.log('handleHeaderScroll', e);
      this.setActiveRightFixedColumn(e.target);
      this.setActiveLeftFixedColumn(e.target);
      this.ATable.handleTableHeaderScroll(e);
    },
    setTableWidth(width) {
      this.tableWidth = width;
    },
    setBodyMinMaxHeight(headerHeight) {
      const { bordered, maxHeight, minHeight } = this;
      if (maxHeight !== null) {
        this.bodyMaxHeight = maxHeight + (bordered ? -2 : 0) - headerHeight;
      }
      if (minHeight !== null) {
        this.bodyMinHeight = minHeight + (bordered ? -2 : 0) - headerHeight;
      }
    },
    setActiveRightFixedColumn(target) {
      const { rightFixedColumns } = this.ATable;
      const { scrollLeft, scrollWidth } = target;
      const { tableWidth, fixedColumnsRight } = this;
      let rightWidth = 0;
      const rightActiveFixedColumn = {};
      this.rightActiveFixedColumn = rightActiveFixedColumn;
      for (let i = rightFixedColumns.length - 1; i >= 0; --i) {
        const { key } = rightFixedColumns[i];
        if (scrollLeft + fixedColumnsRight[key] + tableWidth - rightWidth < scrollWidth) {
          this.rightActiveFixedColumn = { [key]: true };
          rightWidth += rightFixedColumns[i].width;
        } else {
          break;
        }
      }
    },
    setActiveLeftFixedColumn(target) {
      const { leftFixedColumns } = this.ATable;
      const { scrollLeft } = target;
      const { fixedColumnsLeft } = this;
      this.leftActiveFixedColumn = {};
      let leftWidth = 0;
      for (let i = 0; i < leftFixedColumns.length; ++i) {
        const { key } = leftFixedColumns[i];
        if (scrollLeft > fixedColumnsLeft[key] - leftWidth) {
          this.leftActiveFixedColumn = { [key]: true };
          leftWidth += leftFixedColumns[i].width;
        } else {
          break;
        }
      }
    },
  },
};
</script>

<style scoped></style>
