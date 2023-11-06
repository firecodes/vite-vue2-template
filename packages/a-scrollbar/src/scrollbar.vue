<template>
  <vue-resize-observer @resize="handleContentResize">
    <div
      v-bind="$attrs"
      class="n-scrollbar"
      @mouseenter="handleMouseEnterWrapper"
      @mouseleave="handleMouseLeaveWrapper"
    >
      <div
        v-if="!container"
        ref="containerRef"
        class="n-scrollbar-container"
        :style="containerStyle"
        @scroll="handleScroll"
      >
        <vue-resize-observer @resize="handleContentResize">
          <div
            ref="contentRef"
            :style="[contentStyle, { width: xScrollable ? 'fit-content' : null }]"
            :class="['n-scrollbar-content', contentClass]"
          >
            <slot />
          </div>
        </vue-resize-observer>
      </div>
      <template v-else>
        <slot />
      </template>
      <scrollY
        ref="yRailRef"
        :size="size"
        :needy-bar="needyBar"
        :is-show-y-bar="isShowYBar"
        :horizontal-rail-style="horizontalRailStyle"
      />
      <scrollX
        ref="xRailRef"
        :size="size"
        :needx-bar="needxBar"
        :is-show-x-bar="isShowXBar"
        :vertical-rail-style="verticalRailStyle"
      />
    </div>
  </vue-resize-observer>
</template>
<script>
import ScrollbarClass from './scrollbarClass.js';
import scrollY from './scrollY.vue';
import scrollX from './scrollX.vue';

export default {
  name: 'AScrollbar',
  components: { scrollY, scrollX },
  provide() {
    return {
      AScrollbar: this,
    };
  },
  props: {
    size: {
      type: Number,
      default: 10,
    },
    duration: {
      type: Number,
      default: 0,
    },
    scrollable: {
      type: Boolean,
      default: true,
    },
    xScrollable: {
      type: Boolean,
      default: false,
    },
    container: {
      type: Function,
      default: undefined,
    },
    content: {
      type: Function,
      default: undefined,
    },
    containerStyle: {
      type: Object,
      default: undefined,
    },
    contentClass: {
      type: String,
      default: undefined,
    },
    contentStyle: {
      type: Object,
      default: undefined,
    },
    horizontalRailStyle: {
      type: Object,
      default: undefined,
    },
    verticalRailStyle: {
      type: Object,
      default: undefined,
    },
    onScroll: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      contentHeight: null,
      contentWidth: null,
      containerHeight: null,
      containerWidth: null,
      yRailSize: null,
      xRailWidth: null,
      containerScrollTop: null,
      containerScrollLeft: null,
      isShowXBar: false,
      isShowYBar: false,
    };
  },
  computed: {
    sizePx() {
      return `${this.size}px`;
    },
    needyBar() {
      return this.containerHeight !== null && this.contentHeight !== null && this.contentHeight > this.containerHeight;
    },
    needxBar() {
      return this.containerWidth !== null && this.contentWidth !== null && this.contentWidth > this.containerWidth;
    },
  },
  created() {
    this.ScrollbarClass = ScrollbarClass;
    this.ScrollbarClass.init(this.$props);
  },
  mounted() {
    if (this.container) return;
    this.sync();
  },
  methods: {
    mergedContainerRef() {
      const { container } = this;
      if (container) return container();
      return this.$refs.containerRef;
    },
    mergedContentRef() {
      const { content } = this;
      if (content) return content();
      return this.$refs.contentRef;
    },
    handleContentResize() {
      this.sync();
    },
    handleScroll(e) {
      console.log('scrollbar vue', e);
      this.$emit('scroll', e);
      this.syncScrollState();
    },
    handleMouseEnterWrapper() {
      this.ScrollbarClass.showXBar(this);
      this.ScrollbarClass.showYBar(this);
      this.sync();
    },
    handleMouseLeaveWrapper() {
      this.hideBar();
    },
    hideBar() {
      this.ScrollbarClass.hideYBar(this);
      this.ScrollbarClass.hideXBar(this);
    },
    sync() {
      if (!this.scrollable) return;
      this.syncPositionState();
      this.syncScrollState();
    },
    syncPositionState() {
      const container = this.mergedContainerRef();
      if (container) {
        this.containerHeight = container.offsetHeight;
        this.containerWidth = container.offsetWidth;
      }
      const content = this.mergedContentRef();
      if (content) {
        this.contentHeight = content.offsetHeight;
        this.contentWidth = content.offsetWidth;
      }
      const { xRailRef, yRailRef } = this.$refs;
      if (xRailRef) {
        this.xRailSize = xRailRef.$el.offsetWidth;
      }
      if (yRailRef) {
        this.yRailSize = yRailRef.$el.offsetHeight;
      }
      // console.log('syncPositionState1', this.containerHeight, this.containerWidth);
      // console.log('syncPositionState2', this.contentHeight, this.contentWidth);
      // console.log('syncPositionState3', this.xRailSize, this.yRailSize);
      // console.log('syncPositionState5', xRailRef, yRailRef);
    },
    syncScrollState() {
      const container = this.mergedContainerRef();
      if (container) {
        this.containerScrollTop = container.scrollTop;
        this.containerScrollLeft = container.scrollLeft;
      }
      // console.log('syncScrollState', this.containerScrollTop, this.containerScrollLeft);
    },
  },
};
</script>

<style lang="less">
@import './styles/index.less';
</style>
