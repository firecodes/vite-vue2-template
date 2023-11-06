<script>
import delegate from './delegate.js';

export default {
  name: 'VueResizeObserver',
  data() {
    return { registered: false };
  },
  mounted() {
    this.registeredEl();
  },
  destroyed() {
    if (this.registered) {
      delegate.unregisterHandler(this.$el);
      // delegate.unregisterHandler(this.$el.nextElementSibling);
    }
  },
  methods: {
    registeredEl() {
      const scope = this;
      function handleResize(entry) {
        scope.$emit('resize', entry);
      }
      const el = this.$el;
      if (el === undefined) {
        return;
      }
      // if (el.nextElementSibling !== el.nextSibling) {
      //   if (el.nodeType === 3 && el.nodeValue !== '') {
      //     return;
      //   }
      // }
      // if (el.nextElementSibling !== null) {
      //   this.registered = true;
      //   delegate.registerHandler(el.nextElementSibling, handleResize);
      // }
      this.registered = true;
      delegate.registerHandler(el, handleResize);
    },
  },
  render(h) {
    const $default = this.$slots.default;
    // Error: Multiple root nodes returned from render function
    return $default && $default.length === 1 ? this.$slots.default || null : h('div', $default);
  },
};
</script>
