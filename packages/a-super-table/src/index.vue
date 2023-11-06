<template>
  <div ref="supergrid" class="a-supergrid" style="width: 100%">
    <div class="a-supergrid-border">
      <div ref="supergridHeader" class="a-supergrid-header" :style="getHeaderRowStyle()">
        <template v-if="TableFixedColumns.length > 0">
          <template v-for="(col, index) in TableFixedColumns">
            <div
              :key="`frozencell_${index}`"
              class="a-supergrid-headercell a-supergrid-frozencell"
              :style="getHeaderCellStyleLeft(col, index)"
            >
              <div class="a-supergrid-headercell-inner">{{ col.label }}</div>
            </div>
            <div
              :key="`splitter_left_${index}`"
              class="a-supergrid-splitter"
              :style="getHeaderSplitterStyle(col, index)"
              @mousedown="
                (e) => {
                  onHeaderSplitterMousedown(e, col, index);
                }
              "
            ></div>
          </template>
        </template>
        <template v-for="(col, index) in TableColumns.slice(visableColStart, visableColEnd)">
          <div :key="index" class="a-supergrid-headercell" :style="getHeaderCellStyle(col, index)">
            <div class="a-supergrid-headercell-inner">{{ col.label }}</div>
          </div>
          <div
            :key="`splitter_${index}`"
            class="a-supergrid-splitter"
            :style="getHeaderSplitterStyle(col, index)"
            @mousedown="
              (e) => {
                onHeaderSplitterMousedown(e, col, index);
              }
            "
          ></div>
        </template>
        <template v-if="TableFixedRightColumns.length > 0">
          <div class="a-supergrid-header-frozencell-right" :style="getHeaderRowCellStyleRight()">
            <template v-for="(col, index) in TableFixedRightColumns">
              <div
                :key="index"
                class="a-supergrid-headercell"
                :style="getHeaderCellStyleRight(col, index)"
              >
                <div class="a-supergrid-headercell-inner">{{ col.label }}</div>
              </div>
              <div
                :key="`splitter_right_${index}`"
                class="a-supergrid-splitter"
                :style="getHeaderSplitterStyle(col, index)"
                @mousedown="
                  (e) => {
                    onHeaderSplitterMousedown(e, col, index);
                  }
                "
              ></div>
            </template>
          </div>
        </template>
      </div>
      <div ref="supergridViewport" class="a-supergrid-viewport">
        <div ref="supergridCells" class="a-supergrid-cells">
          <template v-for="(row, index) in TableData.slice(visableRowStart, visableRowEnd)">
            <div :key="index" class="a-supergrid-row" :style="getRowStyle(row, index)">
              <template v-for="(col, y) in TableColumns.slice(visableColStart, visableColEnd)">
                <div :key="y" class="a-supergrid-cell" :style="getCellStyle(col, y)">
                  <div class="a-supergrid-cell-inner">{{ row[col.name] || col.name }}</div>
                </div>
              </template>
            </div>
          </template>
        </div>
        <div ref="supergridFixed" class="a-supergrid-fixed">
          <template v-if="TableFixedColumns.length > 0">
            <template v-for="(row, index) in TableData.slice(visableRowStart, visableRowEnd)">
              <div :key="index" class="a-supergrid-row" :style="getRowStyle(row, index)">
                <template v-for="(col, y) in TableFixedColumns">
                  <div :key="y" class="a-supergrid-cell" :style="getCellStyle(col, y)">
                    <div class="a-supergrid-cell-inner">{{ row[col.name] || col.name }}</div>
                  </div>
                </template>
              </div>
            </template>
          </template>
        </div>
        <div ref="supergridFixedRight" class="a-supergrid-fixed-right">
          <template v-if="TableFixedRightColumns.length > 0">
            <template v-for="(row, index) in TableData.slice(visableRowStart, visableRowEnd)">
              <div :key="index" class="a-supergrid-row" :style="getRowStyle(row, index)">
                <template v-for="(col, y) in TableFixedRightColumns">
                  <div :key="y" class="a-supergrid-cell" :index="y" :style="getCellStyle(col, y)">
                    <div class="a-supergrid-cell-inner">{{ row[col.name] || col.name }}</div>
                  </div>
                </template>
              </div>
            </template>
          </template>
        </div>
        <div ref="supergridTooltip" class="a-supergrid-tooltip"></div>
      </div>

      <div ref="scrollerX" class="a-supergrid-hscroller">
        <div ref="scrollerXcontent" class="a-supergrid-hscrollercontent"></div>
      </div>
      <div ref="scrollerY" class="a-supergrid-vscroller">
        <div ref="scrollerYcontent" class="a-supergrid-vscrollercontent"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from './table.js';
import * as utils from './utils.js';

export default {
  name: 'ASuperTable',
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      TableColumns: [],
      TableFixedColumns: [],
      TableFixedRightColumns: [],
      TableData: [],
      headerRowHeight: 36,
      headerFixedRight: 16,
      rowHeight: 36,
      visableRowStart: 0,
      visableRowEnd: 0,
      visableRowOffsetTop: 0,
      visableColStart: 0,
      visableColEnd: 0,
      visableColOffsetLet: 0,
    };
  },
  watch: {
    data() {
      this.TableData = this.data;
      this.Table.initOptions();
    },
  },
  mounted() {
    this.Table = Table;
    this.Table.init(this);
  },
  destroyed() {
    this.Table.destroyedEvent();
  },
  methods: {
    getRowStyle(row, index) {
      return {
        top: `${index * this.rowHeight - this.visableRowOffsetTop}px`,
        height: `${this.rowHeight}px`,
      };
    },
    getCellStyle(col, index) {
      const offsetLet = col.fixed ? 0 : this.visableColOffsetLet;
      const left = utils.getSumCellWidth(this.TableColumns, index) + offsetLet;
      const style = {
        left: `${left}px`,
        width: `${col.width}px`,
        height: `${this.rowHeight}px`,
        'line-height': `${this.rowHeight}px`,
      };
      return style;
    },
    getHeaderRowStyle() {
      return {
        height: `${this.headerRowHeight}px`,
      };
    },
    getHeaderCellStyle(col, index) {
      const offsetLet = col.fixed ? 0 : this.visableColOffsetLet;
      const fixedLeft = utils.getSumCellWidth(this.TableFixedColumns, this.TableFixedColumns.length);
      const left = utils.getSumCellWidth(this.TableColumns, index) + offsetLet;
      const style = {
        left: `${left + fixedLeft}px`,
        width: `${col.width}px`,
        height: `${this.rowHeight}px`,
        'line-height': `${this.rowHeight}px`,
      };
      return style;
    },
    getHeaderCellStyleLeft(col, index) {
      const offsetLet = col.fixed ? 0 : this.visableColOffsetLet;
      const left = utils.getSumCellWidth(this.TableFixedColumns, index) + offsetLet;
      const style = {
        left: `${left}px`,
        width: `${col.width}px`,
        height: `${this.rowHeight}px`,
        'line-height': `${this.rowHeight}px`,
      };
      return style;
    },
    getHeaderCellStyleRight(col, index) {
      const offsetLet = col.fixed ? 0 : this.visableColOffsetLet;
      const left = utils.getSumCellWidth(this.TableFixedRightColumns, index) + offsetLet;
      const style = {
        left: `${left}px`,
        width: `${col.width}px`,
        height: `${this.rowHeight}px`,
        'line-height': `${this.rowHeight}px`,
      };
      return style;
    },
    getHeaderRowCellStyleRight() {
      const width = utils.getSumCellWidth(this.TableFixedRightColumns, this.TableFixedRightColumns.length);
      const style = {
        right: `0px`,
        width: `${width + this.headerFixedRight}px`,
        height: `${this.rowHeight}px`,
        'line-height': `${this.rowHeight}px`,
      };
      return style;
    },
    getHeaderSplitterStyle(col, index) {
      let offsetLet = 0;
      let width = 0;
      if (!col.fixed) {
        offsetLet = this.visableColOffsetLet;
        width = utils.getSumCellWidth(this.TableFixedColumns, this.TableFixedColumns.length);
        width += utils.getSumCellWidth(this.TableColumns, index);
      } else if (col.fixed === 'right') {
        width = utils.getSumCellWidth(this.TableFixedRightColumns, index);
      } else {
        width = utils.getSumCellWidth(this.TableFixedColumns, index);
      }
      const left = width + offsetLet;
      const style = {
        left: `${col.width + left - 5}px`,
        height: `${this.rowHeight}px`,
        'line-height': `${this.rowHeight}px`,
      };
      return style;
    },
    onHeaderSplitterMousedown(e, col, index) {
      console.log(`onHeaderSplitterMousedown`, e, col, index);
      this.Table.handleMousedown(e, col, index);
    },
  },
};
</script>
<style lang="less" scoped>
@import './table.less';
</style>
