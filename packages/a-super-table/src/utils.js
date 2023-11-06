export const getSumCellWidth = function (columns = [], index) {
  let sum = 0;
  const isNum = typeof index === 'number';
  const allColumn = isNum ? columns.slice(0, index) : columns;
  allColumn.forEach((col) => {
    sum += col.width;
  });
  return sum;
};

export const getVisableColEnd = function (columns = [], start = 0, visableWidth = 0, offsetLeft = 0) {
  const list = columns.slice(start, columns.length);
  let end = 0;
  let endSum = 0;
  for (let i = 0; i < list.length; i++) {
    const col = list[i];
    endSum += col.width;
    if (endSum - Math.abs(offsetLeft) >= visableWidth) {
      end = i + 1;
      break;
    }
  }
  return end;
};

export const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

export function parseWidth(width) {
  if (width !== undefined) {
    width = parseInt(width, 10);
    if (isNaN(width)) {
      width = null;
    }
  }
  return width;
}

export function parseMinWidth(minWidth) {
  if (typeof minWidth !== 'undefined') {
    minWidth = parseWidth(minWidth);
    if (isNaN(minWidth)) {
      minWidth = 80;
    }
  }
  return minWidth;
}

export function parseHeight(height) {
  if (typeof height === 'number') {
    return height;
  }
  if (typeof height === 'string') {
    if (/^\d+(?:px)?$/.test(height)) {
      return parseInt(height, 10);
    }
    return height;
  }
  return null;
}

export const isObject = function (obj) {
  return obj !== null && typeof obj === 'object';
};
