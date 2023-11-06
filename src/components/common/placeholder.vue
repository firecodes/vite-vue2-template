<script>
export default {
  name: 'Placeholder',
  props: {
    data: {
      type: [Array, Object, Boolean, Number],
      default: undefined,
    },
    transition: {
      type: Boolean,
      default: true,
    },
    transitionName: {
      type: String,
      default: 'module',
    },
    placeholder: String,
    loading: Boolean,
  },
  data() {
    return {};
  },
  mounted() {},
  destroyed() {},
  methods: {},
  render(h) {
    const { data, placeholder, loading, transition, transitionName } = this.$props;
    const isEmptyData = data && ((Array.isArray(data) && !data.length) || !data);

    const getPlaceholderView = () => {
      return this.$slots.placeholder;
    };

    const getDataView = () => {
      if (isEmptyData) {
        return getPlaceholderView();
      }
      if (this.$slots.default && this.$slots.default.length === 1) {
        return this.$slots.default || null;
      }
      return h('div', this.$slots.default);
    };

    const getLoadingView = () => {
      return this.$slots.loading;
    };

    const getView = () => {
      return loading ? getLoadingView() : getDataView();
    };
    // if (transition) {
    //   return h(
    //     Transition,
    //     {
    //       name: transitionName,
    //       mode: 'out-in',
    //       onAfterEnter(...args) {
    //         context.emit(Events.AfterEnter, ...args);
    //       },
    //     },
    //     () => getView(),
    //   );
    // }
    return getView();

    // const $default = this.$slots.default;
    // // Error: Multiple root nodes returned from render function
    // return $default && $default.length === 1 ? this.$slots.default || null : h('div', $default);
  },
};
</script>
