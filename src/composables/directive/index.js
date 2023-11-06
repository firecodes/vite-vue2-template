import lozad from './lozad/lozad.js';

const components = [lozad];

const install = (Vue) => {
  components.forEach((Component) => {
    Vue.directive(lozad.name, Component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { install };
export default { install };
