<script lang="jsx">
export default {
  name: 'ATableCell',
  functional: true,
  components: {},
  props: {
    row: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
  },
  methods: {},
  render: (h, ctx) => {
    const { row, column } = ctx.props;
    return <span>{row[column.key]}</span>;
  },
};
</script>
