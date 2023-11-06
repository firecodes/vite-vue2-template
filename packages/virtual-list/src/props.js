/**
 * props declaration for default, item and slot component
 */

export const VirtualProps = {
  showScrollbar: {
    type: Boolean,
    default: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  // it is suppose to be the min height
  itemSize: {
    type: Number,
    required: true,
  },
  itemResizable: Boolean,
  itemsStyle: [String, Object],
  visibleItemsTag: {
    type: [String, Object],
    default: 'div',
  },
  visibleItemsProps: Object,
  ignoreItemResize: Boolean,
  onScroll: Function,
  onWheel: Function,
  onResize: Function,
  defaultScrollKey: [Number, String],
  defaultScrollIndex: Number,
  keyField: {
    type: String,
    default: 'key',
  },
  // Whether it is a good API?
  // ResizeObserver + footer & header is not enough.
  // Too complex for simple case
  paddingTop: {
    type: [Number, String],
    default: 0,
  },
  paddingBottom: {
    type: [Number, String],
    default: 0,
  },
};

// export const ItemProps = {
//   index: {
//     type: Number,
//   },
//   event: {
//     type: String,
//   },
//   tag: {
//     type: String,
//   },
//   horizontal: {
//     type: Boolean,
//   },
//   source: {
//     type: Object,
//   },
//   component: {
//     type: [Object, Function],
//   },
//   slotComponent: {
//     type: Function,
//   },
//   uniqueKey: {
//     type: [String, Number],
//   },
//   extraProps: {
//     type: Object,
//   },
//   scopedSlots: {
//     type: Object,
//   },
// };

// export const SlotProps = {
//   event: {
//     type: String,
//   },
//   uniqueKey: {
//     type: String,
//   },
//   tag: {
//     type: String,
//   },
//   horizontal: {
//     type: Boolean,
//   },
// };
