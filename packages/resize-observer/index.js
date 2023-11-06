import ResizeObserver from './src/ResizeObserver.vue';

ResizeObserver.install = function (Vue) {
  Vue.component(ResizeObserver.name, ResizeObserver);
};

export default ResizeObserver;
