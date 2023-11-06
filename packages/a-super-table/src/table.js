import { on, off } from 'element-ui/src/utils/dom';
import * as utils from './utils.js';
// import normalizeWheel from 'normalize-wheel';

// 表格事件，处理初始化属性、方法
const Table = (() => {
  const page = {};
  let scope = null;
  page.init = function (scopeVue) {
    scope = scopeVue;
    scope.TableData = scope.data;
    page.setTableColumns();
    page.initEvent();
    page.initOptions();
  };

  page.initEvent = function () {
    page.destroyedEvent();
    scope.$gridDom = scope.$refs.supergrid;
    scope.$scrollerX = scope.$refs.scrollerX;
    scope.$scrollerY = scope.$refs.scrollerY;
    scope.$gridDom.addEventListener(utils.isFirefox ? 'DOMMouseScroll' : 'mousewheel', page.onMousewheelGrid);
    scope.$scrollerX.addEventListener('scroll', page.onScrollX);
    scope.$scrollerY.addEventListener('scroll', page.onScrollY);
    on(window, 'resize', page.onWindowResize);
  };

  page.destroyedEvent = function () {
    scope.$gridDom = scope.$refs.supergrid;
    scope.$scrollerX = scope.$refs.scrollerX;
    scope.$scrollerY = scope.$refs.scrollerY;
    scope.$gridDom.removeEventListener(utils.isFirefox ? 'DOMMouseScroll' : 'mousewheel', page.onMousewheelGrid);
    scope.$scrollerX.removeEventListener('scroll', page.onScrollX);
    scope.$scrollerY.removeEventListener('scroll', page.onScrollY);
    off(window, 'resize', page.onWindowResize);
    off(window, 'mousemove', page.handleMousemove);
    off(window, 'mouseup', page.handleMouseup);
  };

  page.onWindowResize = function () {
    page.initOptions();
  };

  page.setTableColumns = function () {
    const columns = scope.columns || [];
    const TableColumns = [];
    const TableFixedColumns = [];
    const TableFixedRightColumns = [];
    columns.forEach((col) => {
      if (!col.hidden) {
        if (col.fixed) {
          const isRight = col.fixed === 'right';
          isRight ? TableFixedRightColumns.push(col) : TableFixedColumns.push(col);
        } else {
          TableColumns.push(col);
        }
      }
    });
    scope.TableColumns = TableColumns;
    scope.TableFixedColumns = TableFixedColumns;
    scope.TableFixedRightColumns = TableFixedRightColumns;
  };

  page.initOptions = function () {
    scope.$gridDom = scope.$refs.supergrid;
    scope.$supergridHeader = scope.$refs.supergridHeader;
    scope.$supergridViewport = scope.$refs.supergridViewport;
    scope.$supergridCells = scope.$refs.supergridCells;
    scope.$supergridFixed = scope.$refs.supergridFixed;
    scope.$supergridFixedRight = scope.$refs.supergridFixedRight;
    scope.$supergridTooltip = scope.$refs.supergridTooltip;

    scope.$scrollerX = scope.$refs.scrollerX;
    scope.$scrollerY = scope.$refs.scrollerY;
    scope.$scrollerXcontent = scope.$refs.scrollerXcontent;
    scope.$scrollerYcontent = scope.$refs.scrollerYcontent;
    const $scrollerX_Rect = scope.$scrollerX.getBoundingClientRect();
    const $scrollerY_Rect = scope.$scrollerY.getBoundingClientRect();
    // 表格
    scope.height = window.innerHeight - 60;
    scope.$gridDom.style.height = `${scope.height}px`;
    const $gridRect = scope.$gridDom.getBoundingClientRect();

    // 表格头部
    scope.headerStyle = {};
    scope.headerStyle.height = 36;
    scope.$supergridHeader.style.height = `${scope.headerStyle.height}px`;

    // 表格body
    scope.bodyStyle = {};
    scope.bodyStyle.height = scope.height - scope.headerStyle.height;
    scope.$supergridViewport.style.height = `${scope.bodyStyle.height}px`;
    scope.cellsStyle = {};
    scope.cellsStyle.height = scope.bodyStyle.height - $scrollerX_Rect.height;
    scope.$supergridCells.style.height = `${scope.cellsStyle.height}px`;

    scope.fixedStyle = {};
    scope.fixedStyle.width = utils.getSumCellWidth(scope.TableFixedColumns);
    scope.fixedStyle.height = scope.bodyStyle.height;
    if (scope.$supergridFixed) {
      // 右
      scope.$supergridFixed.style.width = `${scope.fixedStyle.width}px`;
      scope.$supergridFixed.style.height = `${scope.fixedStyle.height}px`;
    }
    scope.fixedRightStyle = {};
    scope.fixedRightStyle.width = utils.getSumCellWidth(scope.TableFixedRightColumns);
    scope.fixedRightStyle.height = scope.bodyStyle.height;
    scope.fixedRightStyle.right = $scrollerY_Rect?.width || 0;
    scope.headerFixedRight = scope.fixedRightStyle.right;
    if (scope.$supergridFixedRight) {
      // 左
      scope.$supergridFixedRight.style.width = `${scope.fixedRightStyle.width + 2}px`;
      scope.$supergridFixedRight.style.height = `${scope.fixedRightStyle.height}px`;
      scope.$supergridFixedRight.style.right = `${scope.fixedRightStyle.right - 2}px`;
    }
    scope.$supergridCells.style.left = `${scope.fixedStyle.width}px`;
    // X轴
    scope.hscrollerStyle = {};
    scope.hscrollerStyle.width = $gridRect.width - $scrollerY_Rect?.width || 0;
    scope.$scrollerX.style.width = `${scope.hscrollerStyle.width}px`;
    scope.hscrollercontentStyle = {};
    scope.hscrollercontentStyle.width = utils.getSumCellWidth(
      scope.TableColumns.concat(scope.TableFixedColumns).concat(scope.TableFixedRightColumns),
    );
    scope.$scrollerXcontent.style.width = `${scope.hscrollercontentStyle.width}px`;
    // 表格单元格宽度
    scope.cellsStyle.width = scope.hscrollerStyle.width;
    scope.$supergridCells.style.width = `${scope.cellsStyle.width}px`;
    // Y轴
    scope.vscrollerStyle = {};
    scope.vscrollerStyle.top = scope.headerStyle.height;
    scope.vscrollerStyle.height = scope.height - scope.vscrollerStyle.top - $scrollerX_Rect.height;
    scope.$scrollerY.style.top = `${scope.vscrollerStyle.top}px`;
    scope.$scrollerY.style.height = `${scope.vscrollerStyle.height}px`;
    scope.vscrollercontentStyle = {};
    scope.vscrollercontentStyle.height = scope.TableData.length * scope.rowHeight;
    scope.$scrollerYcontent.style.height = `${scope.vscrollercontentStyle.height}px`;

    // 要显示 行数 或 列数
    page.onScrollX();
    page.onScrollY();
  };

  page.onMousewheelGrid = function (e) {
    const wx = utils.isFirefox ? e.deltaX * -20 : e.wheelDeltaX * 2;
    const wy = utils.isFirefox ? e.deltaY * -40 : e.wheelDelta;
    if (wx && Math.abs(wx) > Math.abs(wy)) {
      scope.$scrollerX = scope.$refs.scrollerX;
      if (!scope.$scrollerX || !scope.$scrollerX.offsetWidth) return true;

      const dir = wx / -40;
      const oldLeft = scope.$scrollerX.scrollLeft;
      const left = oldLeft + dir * 30;

      scope.$scrollerX.scrollLeft = left;
      // not block scroll if position hasn't changed
      if (oldLeft == scope.$scrollerX.scrollLeft) {
        return true;
      }
    } else {
      scope.$scrollerY = scope.$refs.scrollerY;
      scope.$scrollerYcontent = scope.$refs.scrollerYcontent;
      if (!scope.$scrollerY || !scope.$scrollerY.offsetHeight) return true;

      let dir = wy / -40;
      if (typeof wy === 'undefined') {
        dir = e.detail;
      }
      const oldTop = scope.$scrollerY.scrollTop;
      const top = oldTop + dir * 30;
      const maxHeight = oldTop + scope.$scrollerY.offsetHeight;
      console.log('scope.$scrollerY :', maxHeight, oldTop, top, dir, scope.$scrollerYcontent.offsetHeight);
      if (!oldTop && oldTop > top) {
        return true;
      }
      scope.$scrollerY.scrollTop = top;
      if (oldTop == scope.$scrollerY.scrollTop) {
        return true;
      }
    }
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.cancelBubble = true;
    return false;
  };

  page.onScrollX = function () {
    const columns = scope.TableColumns.concat(scope.TableFixedColumns).concat(scope.TableFixedRightColumns);
    scope.$scrollerX = scope.$refs.scrollerX;
    const { scrollLeft = 0 } = scope.$scrollerX;
    let sum = 0;
    let start = 0;
    let offsetLeft = 0;
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      offsetLeft = sum - scrollLeft; // 偏移量
      sum += col.width;
      if (sum >= scrollLeft) {
        start = i;
        break;
      }
    }
    scope.visableColOffsetLet = offsetLeft;
    scope.visableColStart = start;
    const visableNum = utils.getVisableColEnd(
      columns,
      scope.visableColStart,
      scope.hscrollerStyle.width,
      scope.visableColOffsetLet,
    );
    scope.visableColEnd = scope.visableColStart + visableNum;
  };

  page.onScrollY = function () {
    scope.$scrollerY = scope.$refs.scrollerY;
    const { scrollTop = 0 } = scope.$scrollerY;
    const offsetTop = scrollTop % scope.rowHeight;
    scope.visableRowOffsetTop = offsetTop;
    scope.visableRowStart = parseInt(scrollTop / scope.rowHeight, 10);
    let visableNum = Math.ceil(scope.cellsStyle.height / scope.rowHeight);
    const isMax = visableNum * scope.rowHeight - offsetTop;
    if (isMax < scope.cellsStyle.height) {
      visableNum += 1;
    }
    scope.visableRowEnd = scope.visableRowStart + visableNum;
    // console.log("2:", isMax, scope.visableRowStart, scope.visableRowEnd);
    // console.log("21:", scrollTop, visableNum, offsetTop);
  };

  let activeRef = false;
  let startX = 0;
  let dragCol = {};
  function getMouseX(e) {
    return e.clientX;
  }
  page.handleMousedown = function (e, col, index) {
    e.preventDefault();
    console.log(`handleMousedown11`, e, activeRef, index);
    const alreadyStarted = activeRef;
    startX = getMouseX(e);
    activeRef = true;
    if (!alreadyStarted) {
      dragCol = { col, index };
      on(window, 'mousemove', page.handleMousemove);
      on(window, 'mouseup', page.handleMouseup);
      console.log(`handleMousedown22`, e, alreadyStarted);
    }
  };
  page.handleMousemove = function (e) {
    const offset = getMouseX(e) - startX;
    if (dragCol.col) {
      const { width } = dragCol.col;
      dragCol.col.width = width + offset;
    }
    console.log(`handleMousemove`, dragCol, e, offset);
  };
  page.handleMouseup = function (e) {
    activeRef = false;
    dragCol = {};
    off(window, 'mousemove', page.handleMousemove);
    off(window, 'mouseup', page.handleMouseup);
    console.log(`off handleMouseup`, e);
  };
  return page;
})();

export default Table;
