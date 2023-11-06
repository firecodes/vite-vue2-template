/* eslint-disable prettier/prettier */
// https://github.com/ApoorvSaxena/lozad.js
import lozad from 'lozad';

export const LOZAD_CLASS_NAME = 'lozad';
export const LOADED_CLASS_NAME = 'loaded';

export const lozadObserve = (target) => {
  const observer = lozad(target, { loaded: (element) => element.classList.add(LOADED_CLASS_NAME) });
  observer.observe();
  return observer;
};

// import Vue from 'vue';
// import LozadView from './LozadView.vue';
// export const useLozad = (options) => {
//   // options = { elementor?: () => HTMLElement; immediate?: boolean; className?: string }
//   const $constructor = Vue.extend(LozadView);
//   const $dom = new $constructor({
//     el: document.createElement('div'),
//     propsData: { ...options, lozadObserve },
//   });
//   // document.body.appendChild($dom.$el);
//   const { observer, observe, unobserve } = $dom;
//   return { $dom, element: $dom.el, observer, observe, unobserve }
// }


export default {
  name: 'lozad',
  bind(element, binding) {
    element.__lozad_observer = lozadObserve(element);
  },
  unbind(element) {
    element.__lozad_observer?.observer.disconnect();
    element.__lozad_observer = null;
  },
};
