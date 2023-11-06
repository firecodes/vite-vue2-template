<script>
import { beforeNextFrameOnce, depx, pxfy } from '../../_utils/seemly';
import VueResizeObserver from '../../resize-observer/src/ResizeObserver.vue';
import VirtualClass from './VirtualClass.js';
import { VirtualProps } from './props';

export default {
  name: 'VueVirtualList',
  components: {
    VueResizeObserver,
  },
  props: VirtualProps,
  data() {
    return {
      scrollTopRef: 0,
      listHeightRef: 0,
    };
  },
  computed: {
    getItemsStyle() {
      const { itemResizable } = this;
      const height = pxfy(this.finweckTreeRef.sum());
      return [
        this.itemsStyle,
        {
          boxSizing: 'content-box',
          height: itemResizable ? '' : height,
          minHeight: itemResizable ? height : '',
          paddingTop: pxfy(this.paddingTop),
          paddingBottom: pxfy(this.paddingBottom),
        },
      ];
    },
    visibleItemsStyle() {
      return { transform: `translateY(${pxfy(this.finweckTreeRef.sum(this.startIndexRef))})` };
    },
    finweckTreeRef() {
      return VirtualClass.finweckTreeRef(this);
    },
    startIndexRef() {
      return Math.max(this.finweckTreeRef.getBound(this.scrollTopRef - depx(this.paddingTop)) - 1, 0);
    },
    viewportItems() {
      if (this.listHeightRef === undefined) return [];
      const { items, itemSize } = this;
      const startIndex = this.startIndexRef;
      const endIndex = Math.min(startIndex + Math.ceil(this.listHeightRef / itemSize + 1), items.length - 1);
      const viewportItems = [];
      for (let i = startIndex; i <= endIndex; ++i) {
        viewportItems.push(items[i]);
      }
      return viewportItems;
    },
    keyIndexMapRef() {
      const map = new Map();
      const { keyField } = this;
      this.items.forEach((item, index) => {
        map.set(item[keyField], index);
      });
      return map;
    },
  },
  created() {
    this.VirtualClass = new VirtualClass({}, this.onRangeChanged);
    this.isDeactivated = false;
    this.activateStateInitialized = false;
  },
  mounted() {
    const { defaultScrollIndex, defaultScrollKey } = this.$props;
    if (defaultScrollIndex !== undefined && defaultScrollIndex !== null) {
      this.scrollTo({ index: defaultScrollIndex });
    } else if (defaultScrollKey !== undefined && defaultScrollKey !== null) {
      this.scrollTo({ key: defaultScrollKey });
    }
  },
  activated() {
    this.isDeactivated = false;
    if (!this.activateStateInitialized) {
      this.activateStateInitialized = true;
      return;
    }
    // remount
    this.scrollTo({ top: this.scrollTopRef.value, left: this.scrollLeft });
  },
  deactivated() {
    this.isDeactivated = true;
    if (!this.activateStateInitialized) {
      this.activateStateInitialized = true;
    }
  },
  destroyed() {},
  methods: {
    handleListResize(entry) {
      if (this.isDeactivated) return;
      // List is HTMLElement
      if (this.VirtualClass.isHideByVShow(entry.targett)) return;
      // If height is same, return
      if (entry.contentRect.height === this.listHeightRef) return;
      this.listHeightRef = entry.contentRect.height;
      this.$emit('resize', entry);
    },
    handleListScroll() {},
    handleListWheel() {},
    handleItemResize() {},
  },
  render(h) {
    const { itemResizable, keyField, visibleItemsTag } = this.$props;

    const visibleItemsEl = () => {
      return h(
        visibleItemsTag,
        {
          class: 'v-vl-visible-items',
          style: this.visibleItemsStyle,
          ...this.visibleItemsProps,
        },
        [
          this.viewportItems.map((item) => {
            const key = item[keyField];
            const index = this.keyIndexMapRef.get(key);
            const itemVNode = this.$slots.default({ item, index })[0];
            if (itemResizable) {
              return h(
                VueResizeObserver,
                { key, onResize: (entry) => this.handleItemResize(key, entry) },
                { default: () => itemVNode },
              );
            }
            itemVNode.key = key;
            return itemVNode;
          }),
        ],
      );
    };
    const scrollbarEl = () => {
      return h(
        'div',
        {
          ref: 'itemsElRef',
          class: 'v-vl-items',
          style: this.getItemsStyle,
          ...this.$attrs,
        },
        [visibleItemsEl()],
      );
    };
    return h(
      VueResizeObserver,
      {
        onResize: this.handleListResize,
      },
      [
        h(
          'div',
          {
            class: ['v-vl', this.showScrollbar && 'v-vl--show-scrollbar'],
            onScroll: this.handleListScroll,
            onWheel: this.handleListWheel,
            ref: 'listElRef',
          },
          [this.items.length !== 0 ? scrollbarEl() : this.$slots.empty?.()],
        ),
      ],
    );
  },
};
</script>
