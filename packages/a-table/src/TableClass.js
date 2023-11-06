/* eslint-disable prettier/prettier */
const TableClass = (function () {
  const page = {};
  page.normalizeColumn = function (column) {
    const defaultColumn = {
      type: 'default',
      align: 'left',
      ellipsis: false,
      className: null,
      title: null,
      key: undefined,

      sorter: false,
      defaultSortOrder: false,
      sortOrder: null, // controlled

      filter: false,
      filterOptions: [],
      filterOptionValues: undefined, // controlled
      filterOptionValue: undefined, // controlled
      filterMode: 'or',

      /** it is undefined due to compatibility */
      defaultFilterOptionValues: undefined,
      defaultFilterOptionValue: null,
      filterMultiple: true,
      width: null,
    };
    Object.keys(column).forEach((key) => {
      if (column[key] !== undefined) {
        defaultColumn[key] = column[key];
      }
    });
    if (!column.key && column.type === 'selection') {
      defaultColumn.key = 'selection';
      defaultColumn.width = 40;
    }
    return defaultColumn;
  };
  page.getFlagOfOrder = function (order) {
    if (order === 'ascend') return 1;
    if (order === 'descend') return -1;
    return 0;
  }
  page.createShallowClonedObject = function (object) {
    if (!object) return object;
    if (typeof object === 'object') {
      return { ...object };
    }
    return object;
  }


  return page;
})();

export default TableClass;
