import Vue from 'vue';
import imageViewer from './image/image-viewer.vue';

export const ImageProps = {
  src: String,
  fit: String,
  lazy: Boolean,
  scrollContainer: {},
  previewSrcList: {
    type: Array,
    default: () => [],
  },
  zIndex: {
    type: Number,
    default: 2000,
  },
};

export const ImageClass = (function () {
  const page = {};
  page.showViewDialog = function (propsData) {
    const $constructor = Vue.extend(imageViewer);
    const $dom = new $constructor({
      el: document.createElement('div'),
      propsData,
    });
    document.body.appendChild($dom.$el);
    return $dom;
  };
  return page;
})();
