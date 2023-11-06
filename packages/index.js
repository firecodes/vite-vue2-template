import ATable from './a-table';
import ASuperTable from './a-super-table';
import AScrollbar from './a-scrollbar';
import AImage from './a-image';
import VueResizeObserver from './resize-observer';
import VueVirtuaScrolllList from './vue-virtual-scroll-list';

const components = [ATable, ASuperTable, AScrollbar, AImage, VueResizeObserver, VueVirtuaScrolllList];

const install = (Vue) => {
  components.forEach((Component) => {
    Vue.use(Component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { install };

export default { install };
