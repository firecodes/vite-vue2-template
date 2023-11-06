const pureNumberRegex = /^(\d|\.)+$/;
const numberRegex = /(\d|\.)+/;

export function formatLength(length, options = {}) {
  const { c = 1, offset = 0, attachPx = true } = options;
  const type = typeof length;
  if (type === 'number') {
    const result = (length + offset) * c;
    if (result === 0) return '0';
    return `${result}px`;
  }
  if (type === 'string') {
    if (pureNumberRegex.test(length)) {
      const result = (Number(length) + offset) * c;
      if (attachPx) {
        if (result === 0) return '0';
        return `${result}px`;
      }
      return result;
    }
    const result = numberRegex.exec(length);
    if (!result) return length;
    return length.replace(numberRegex, `${(Number(result[0]) + offset) * c}`);
  }
  return null;
}

export function createCustomWidthStyle(column) {
  if (column.width) {
    const { width } = column;
    return { width: formatLength(width) };
  }
  return null;
}

export function setCheckStatusOfRow(checkedRowKeys, row, checked, rowKey) {
  const key = createRowKey(row, rowKey);
  const rowIndex = checkedRowKeys.findIndex((checkedRowKey) => checkedRowKey === key);
  if (rowIndex !== -1) checkedRowKeys.splice(rowIndex, 1);
  if (checked) checkedRowKeys.push(key);
}

export function createRowKey(row, rowKey) {
  if (rowKey) return rowKey(row);
  return row.key;
}

export function shouldUseArrayInSingleMode(column) {
  return (
    column.filterOptionValues !== undefined ||
    (column.filterOptionValue === undefined && column.defaultFilterOptionValues !== undefined)
  );
}
