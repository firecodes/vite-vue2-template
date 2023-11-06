import VirtualList from './src/VirtualList.vue';

VirtualList.install = function (Vue) {
  Vue.component(VirtualList.name, VirtualList);
};

export default VirtualList;
