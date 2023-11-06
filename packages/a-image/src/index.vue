<template>
  <ImageView v-bind="$props" @click="clickHandler" />
</template>

<script>
import ImageView from './image/ImageView.vue';
import { ImageProps, ImageClass } from './props';

let prevOverflow = '';
export default {
  name: 'AImage',
  components: { ImageView },
  provide() {
    return {
      AImage: this,
    };
  },
  props: { ...ImageProps },
  data() {
    return {
      ImageClass,
    };
  },
  computed: {
    preview() {
      const { previewSrcList } = this;
      return Array.isArray(previewSrcList) && previewSrcList.length > 0;
    },
    imageIndex() {
      let previewIndex = 0;
      const srcIndex = this.previewSrcList.findIndex((item) => {
        return this.src === item.src;
      });
      if (srcIndex >= 0) {
        previewIndex = srcIndex;
      }
      return previewIndex;
    },
  },
  watch: {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    clickHandler() {
      // don't show viewer when preview is false
      if (!this.preview) {
        return;
      }
      // prevent body scroll
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const propsData = {
        zIndex: this.zIndex,
        initialIndex: this.imageIndex,
        onClose: this.closeViewer,
        urlList: this.previewSrcList,
      };
      this.$elView = this.ImageClass.showViewDialog(propsData);
      this.$elView.showViewer = true;
    },
    closeViewer() {
      document.body.style.overflow = prevOverflow;
      this.$elView.showViewer = false;
      this.$elView.$destroy();
    },
  },
};
</script>
