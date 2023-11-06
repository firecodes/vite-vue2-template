<template>
  <div
    class="n-scrollbar-rail n-scrollbar-rail--horizontal"
    :class="{
      'n-scrollbar-rail--disabled': !needxBar,
    }"
    :style="{ ...verticalRailStyle, height: sizePx }"
  >
    <transition name="n-fade-in-transition">
      <div
        class="n-scrollbar-rail__scrollbar"
        :style="{
          height: sizePx,
          width: xBarSizePx,
          left: xBarLeftPx,
          borderRadius: scrollbarBorderRadius,
        }"
        @mousedown="handleXScrollMouseDown"
        @mouseup="handleXScrollMouseUp"
        @mousemove="handleXScrollMouseMove"
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
    verticalRailStyle: {
      type: Object,
      default: undefined,
    },
    isShowXBar: {
      type: Boolean,
      default: false,
    },
    needxBar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      xBarPressed: false,
      memoXLeft: null,
      memoMouseX: null,
    };
  },
  computed: {
    sizePx() {
      return `${this.size}px`;
    },
    xBarSize() {
      return this.AScrollbar.ScrollbarClass.xBarSize(this.AScrollbar);
    },
    xBarLeft() {
      return this.AScrollbar.ScrollbarClass.xBarLeft(this.AScrollbar);
    },
    xBarSizePx() {
      return `${this.xBarSize}px`;
    },
    xBarLeftPx() {
      return `${this.xBarLeft}px`;
    },
    scrollbarBorderRadius() {
      return `${this.size / 2}px`;
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleXScrollMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();
      this.xBarPressed = true;
      on(window, 'mousemove', this.handleXScrollMouseMove, true);
      on(window, 'mouseup', this.handleXScrollMouseUp, true);
      this.memoXLeft = this.AScrollbar.containerScrollLeft;
      this.memoMouseX = e.clientX;
    },
    handleXScrollMouseMove(e) {
      if (!this.xBarPressed) return;
      window.clearTimeout(this.xBarVanishTimerId);
      window.clearTimeout(this.yBarVanishTimerId);
      const dX = e.clientX - this.memoMouseX;
      const toScrollLeftUpperBound = this.AScrollbar.contentWidth - this.AScrollbar.containerWidth;
      const dScrollLeft = (dX * toScrollLeftUpperBound) / (this.AScrollbar.containerWidth - this.xBarSize);
      let toScrollLeft = this.memoXLeft + dScrollLeft;
      toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft);
      toScrollLeft = Math.max(toScrollLeft, 0);
      const mergedContainerRef = this.AScrollbar.mergedContainerRef();
      mergedContainerRef.scrollLeft = toScrollLeft;
    },
    handleXScrollMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();
      off(window, 'mousemove', this.handleXScrollMouseMove, true);
      off(window, 'mouseup', this.handleXScrollMouseUp, true);
      this.xBarPressed = false;
      this.AScrollbar.sync();
      const mergedContainerRef = this.AScrollbar.mergedContainerRef();
      if (!mergedContainerRef.contains(e.target)) {
        this.AScrollbar.hideBar();
      }
    },
  },
};
</script>
