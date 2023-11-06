export const LOZAD_CLASS_NAME = 'lozad';
export const LOADED_CLASS_NAME = 'loaded';
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
    lozadObserve: {
      type: Function,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      container: null,
      observer: null,
    };
  },
  computed: {},
  created() { },
  mounted() {
    if (this.options?.immediate ?? true) {
      this.observe();
    }
  },
  beforeDestroy() {
    this.unobserve();
  },
  methods: {
    observe() {
      const { options, lozadObserve } = this;
      const tagretClass = options?.className || LOZAD_CLASS_NAME;
      const targetElement = options?.elementor?.() || document.body;
      if (targetElement?.querySelectorAll) {
        const lozadElements = targetElement.querySelectorAll(`.${tagretClass}`);
        if (lozadElements?.length) {
          this.observer = lozadObserve(lozadElements);
        }
      }
    },
    unobserve() {
      if (this.observer) {
        this.observer.observer.disconnect();
        this.observer = null;
      }
    },
  },
};
