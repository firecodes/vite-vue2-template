import ASuperTable from './src/index.vue';

ASuperTable.install = function (Vue) {
  Vue.component(ASuperTable.name, ASuperTable);
};

export default ASuperTable;
