<template>
  <div ref="element" class="loadmore">
    <div v-if="loading" class="loading-wrapper">
      <slot name="loading"></slot>
    </div>
    <div v-else-if="!finished" class="normal-wrapper">
      <slot name="normal"></slot>
    </div>
    <div v-else class="finished-wrapper">
      <slot name="finished"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loadmore',
  props: {
    finished: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      observer: null,
      element: null,
      entriesList: [],
    };
  },
  mounted() {
    this.element = this.$el;
    this.onObserver();
  },
  beforeDestroy() {
    if (this.element && this.observer) {
      this.observer.unobserve(this.element);
      this.observer.disconnect();
      this.element = null;
      this.entriesList = [];
    }
  },
  destroyed() {},
  methods: {
    onObserver() {
      if (this.element) {
        this.observer = new IntersectionObserver(
          (entries) => {
            this.entriesList = entries;
            this.isViabledElementLoadData();
          },
          { threshold: 0.1 },
        );
        this.observer.observe(this.element);
      }
    },
    isViabledElementLoadData(isLoad = false) {
      console.log('methods: loadmore', this.entriesList[0], isLoad);
      const emitLoadEvent = () => {
        if ((!this.loading && !this.finished) || isLoad) {
          if (isLoad) {
            window.requestAnimationFrame(() => {
              this.$emit('loadmore');
            });
          } else {
            this.$emit('loadmore');
          }
        }
      };
      if (this.entriesList[0]?.isIntersecting) {
        emitLoadEvent();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.loadmore {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
</style>
