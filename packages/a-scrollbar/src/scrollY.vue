<template>
  <div
    class="n-scrollbar-rail n-scrollbar-rail--vertical"
    :class="{
      'n-scrollbar-rail--disabled': !needyBar,
    }"
    :style="[horizontalRailStyle, { width: sizePx }]"
  >
    <transition name="n-fade-in-transition">
      <div
        class="n-scrollbar-rail__scrollbar"
        :style="{
          height: yBarSizePx,
          top: yBarTopPx,
          width: sizePx,
          borderRadius: scrollbarBorderRadius,
        }"
        @mousedown="handleYScrollMouseDown"
        @mouseup="handleYScrollMouseUp"
        @mousemove="handleYScrollMouseMove"
      />
    </transition>
  </div>
</template>
<script>
import { on, off } from 'element-ui/src/utils/dom';

export default {
  name: 'ScrollY',
  components: {},
  inject: {
    AScrollbar: {
      default: null,
    },
  },
  props: {
    size: {
      type: Number,
      default: 5,
    },
    horizontalRailStyle: {
      type: Object,
      default: undefined,
    },
    isShowYBar: {
      type: Boolean,
      default: false,
    },
    needyBar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      yBarPressed: false,
      memoYTop: null,
      memoMouseY: null,
    };
  },
  computed: {
    sizePx() {
      return `${this.size}px`;
    },
    yBarSize() {
      return this.AScrollbar.ScrollbarClass.yBarSize(this.AScrollbar);
    },
    yBarTop() {
      return this.AScrollbar.ScrollbarClass.yBarTop(this.AScrollbar);
    },
    yBarSizePx() {
      return `${this.yBarSize}px`;
    },
    yBarTopPx() {
      return `${this.yBarTop}px`;
    },
    scrollbarBorderRadius() {
      return `${this.size / 2}px`;
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleYScrollMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();
      this.yBarPressed = true;
      on(window, 'mousemove', this.handleYScrollMouseMove, true);
      on(window, 'mouseup', this.handleYScrollMouseUp, true);
      this.memoYTop = this.AScrollbar.containerScrollTop;
      this.memoMouseY = e.clientY;
    },
    handleYScrollMouseMove(e) {
      if (!this.yBarPressed) return;
      window.clearTimeout(this.xBarVanishTimerId);
      window.clearTimeout(this.yBarVanishTimerId);
      const dY = e.clientY - this.memoMouseY;
      const toScrollTopUpperBound = this.AScrollbar.contentHeight - this.AScrollbar.containerHeight;
      const dScrollTop = (dY * toScrollTopUpperBound) / (this.AScrollbar.containerHeight - this.yBarSize);
      let toScrollTop = this.memoYTop + dScrollTop;
      toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop);
      toScrollTop = Math.max(toScrollTop, 0);
      const mergedContainerRef = this.AScrollbar.mergedContainerRef();
      mergedContainerRef.scrollTop = toScrollTop;
      // console.log('handleYScrollMouseMove1', mergedContainerRef, this.memoYTop, toScrollTopUpperBound, toScrollTop);
      // console.log('handleYScrollMouseMove2', this.yBarSizePx, this.yBarTopPx);
    },
    handleYScrollMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$emit('scrollEnd', e);
      off(window, 'mousemove', this.handleYScrollMouseMove, true);
      off(window, 'mouseup', this.handleYScrollMouseUp, true);
      this.yBarPressed = false;
      this.AScrollbar.sync();
      const mergedContainerRef = this.AScrollbar.mergedContainerRef();
      // console.log('handleYScrollMouseUp', mergedContainerRef);
      if (!mergedContainerRef.contains(e.target)) {
        this.AScrollbar.hideBar();
      }
    },
  },
};
</script>
