<template>
  <section
    ref="element"
    :class="[plain ? 'global-markdown-plain' : 'global-markdown-html', { compact }]"
    v-html="markdownHTML"
  ></section>
</template>
<script>
// import mixins from '@/composables/directive/lozad/mixins.js';
import { lozadObserve, LOZAD_CLASS_NAME } from '@/composables/directive/lozad/lozad.js';
// import { markdownToHTML } from '/@/transforms/markdown';
export default {
  name: 'Markdown',
  props: {
    markdown: String,
    html: String,
    plain: Boolean,
    compact: Boolean,
    renderOptions: {
      type: Object,
      default: () => {
        // sanitize: boolean
        // lazyLoadImage: boolean
        // text: (text: string) => string
        // headingId: (html: string, level: number, raw: string) => string
        // imageSource: (src: string) => string | { src: string; sources: Array<{ srcset: string; type: string }> }
        return {};
      },
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      container: null,
      observer: null,
    };
  },
  computed: {
    markdownHTML() {
      if (!this.markdown) {
        return this.html || '';
      }
      return this.html || '';
      // return markdownToHTML(this.markdown, {
      //   ...this.renderOptions,
      // });
    },
  },
  created() {
    this.container = this.$el;
  },
  mounted() {
    if (this.options?.immediate ?? true) {
      this.observe();
    }
  },
  beforeDestroy() {
    this.unobserve();
  },
  destroyed() {},
  methods: {
    observe() {
      const { options } = this;
      const tagretClass = options?.className || LOZAD_CLASS_NAME;
      const targetElement = options?.elementor?.() || this.$el;
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
</script>
