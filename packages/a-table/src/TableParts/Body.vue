<template>
  <a-scrollbar
    ref="scrollbarRef"
    class="n-data-table-base-table-body"
    :content-style="{ minWidth: formatedScrollX }"
    :horizontal-rail-style="{ zIndex: 3 }"
    :vertical-rail-style="{ zIndex: 3 }"
    x-scrollable
    @scroll="handleScroll"
  >
    <table ref="body" class="n-data-table-table">
      <colgroup>
        <col
          v-for="(column, index) in columns"
          :key="column.key"
          :style="createCustomWidthStyle(column, index, placement)"
        />
      </colgroup>
      <tbody ref="tbody" class="n-data-table-tbody">
        <tr
          v-for="(rowData, index) in data"
          :key="`tr${index}`"
          class="n-data-table-tr"
          :class="[typeof rowClassName === 'function' ? rowClassName(rowData, index) : rowClassName]"
        >
          <td
            v-for="(column, colIndex) in columns"
            :key="`td${colIndex}`"
            :style="{
              textAlign: column.align || null,
              left: ATable.currentFixedColumnLeft(column),
              right: ATable.currentFixedColumnRight(column),
            }"
            class="n-data-table-td"
            :class="[
              column.className,
              {
                'n-data-table-td--ellipsis': column.ellipsis,
                [`n-data-table-td--${column.align}-align`]: column.align,
                [`n-data-table-td--fixed-${column.fixed}`]: column.width && column.fixed,
                'n-data-table-td--shadow-after': ABaseTable.leftActiveFixedColumn[column.key],
                'n-data-table-td--shadow-before': ABaseTable.rightActiveFixedColumn[column.key],
                'n-data-table-td--selection': column.type === 'selection',
              },
            ]"
          >
            <template v-if="column.type === 'selection'"></template>
            <template v-else>
              <TableCell :index="index" :row="rowData" :column="column" />
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </a-scrollbar>
</template>
<script>
import { formatLength, createCustomWidthStyle, setCheckStatusOfRow, createRowKey } from '../utils';
// import TableCell from './Cell.jsx';
import TableCell from './Cell.vue';

export default {
  name: 'ABody',
  components: {
    TableCell,
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
    minHeight: {
      type: Number,
      default: null,
    },
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    rowClassName: {
      type: [Function, String],
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    formatedScrollX() {
      return formatLength(this.scrollX);
    },
  },
  methods: {
    createRowKey,
    createCustomWidthStyle,
    getScrollContainer() {
      return this.$refs.scrollbarRef.mergedContainerRef();
    },
    handleScroll(event) {
      console.log('handleScroll body', event);
      this.ATable.handleTableBodyScroll(event);
    },
  },
};
</script>

<style scoped></style>
