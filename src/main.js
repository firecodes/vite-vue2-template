import Vue from 'vue';

import Element from 'element-ui';
import App from './App.vue';
import router from './router';

import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.less';
import packages from '../packages';
import placeholder from '@/components/common/placeholder.vue';
import loadmore from '@/components/common/loadmore.vue';
import markdown from '@/components/common/markdown.vue';
// 自定义指令
import directive from '@/composables/directive/index';

Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.use(packages);
Vue.use(directive);

Vue.component(placeholder.name, placeholder);
Vue.component(loadmore.name, loadmore);
Vue.component(markdown.name, markdown);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
