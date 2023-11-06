export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/Demo',
    name: 'Demo',
    component: () => import('@/views/Demo.vue'),
  },
  {
    path: '/DemoImage',
    name: 'DemoImage',
    component: () => import('@/views/DemoImage.vue'),
  },
  {
    path: '/DemoVideo',
    name: 'DemoVideo',
    component: () => import('@/views/DemoVideo.vue'),
  },
  {
    path: '/DemoSuperTable',
    name: 'DemoSuperTable',
    component: () => import('@/views/DemoSuperTable.vue'),
  },
  {
    path: '/DemoMarkdown',
    name: 'DemoMarkdown',
    component: () => import('@/views/DemoMarkdown.vue'),
  },
  {
    path: '/scroll',
    name: 'scroll',
    component: () => import('@packages/vue-virtual-scroll-list/demos/index.vue'),
  },
];
