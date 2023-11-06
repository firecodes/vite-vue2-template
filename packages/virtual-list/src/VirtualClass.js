import { FinweckTree } from '../../_utils/seemly';

class VirtualClass {
  keyToHeightOffset = new Map();

  constructor(param, callUpdate) {
    this.init(param, callUpdate);
  }

  init(param, callUpdate) {
    // param data
    this.param = param;
    this.callUpdate = callUpdate;
  }

  finweckTreeRef(scope) {
    const { items, itemSize, keyField } = scope;
    const ft = new FinweckTree(items.length, itemSize);
    items.forEach((item, index) => {
      const key = item[keyField];
      const heightOffset = this.keyToHeightOffset.get(key);
      if (heightOffset !== undefined) {
        ft.add(index, heightOffset);
      }
    });
    return ft;
  }

  isHideByVShow(el) {
    let cursor = el;
    while (cursor !== null) {
      if (cursor.style.display === 'none') return true;
      cursor = cursor.parentElement;
    }
    return false;
  }
}

export default VirtualClass;
