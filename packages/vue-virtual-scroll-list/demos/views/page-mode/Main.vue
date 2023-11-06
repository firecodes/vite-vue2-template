<template>
  <div class="example">
    <h2>This is page footer</h2>
    <div class="example-content">
      <virtual-list ref="vsl" class="list-page scroll-touch" :data-key="'id'" :data-sources="items"
        :data-component="itemComponent" :data-page-visable="true" :estimate-size="300" :keeps="20"
        :item-class="'list-item-page'" :page-mode="true" :col-split="3" @totop="totop" @tobottom="tobottom">
        <template slot="item" slot-scope="slotProps">
          <ItemList :list-card="listCard" :source="slotProps.item"></ItemList>
        </template>
      </virtual-list>
      <div class="bottom">
        <h2>This is page footer</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './Item.vue';
import ItemList from './ItemList.vue';

import getSentences from '../../common/sentences';
import genUniqueId from '../../common/gen-unique-id';

const TOTAL_COUNT = 1000;

const DataItems = [];
let count = TOTAL_COUNT;
while (count--) {
  const index = TOTAL_COUNT - count;
  DataItems.push({
    index,
    name: genUniqueId(index) + index,
    id: genUniqueId(index),
    desc: getSentences(),
  });
}

export default {
  name: 'PageMode',

  components: {
    ItemList,
  },

  data() {
    return {
      listCard: [],
      items: DataItems,
      itemComponent: Item,
    };
  },

  created() {
    this.getDataSS();
  },
  methods: {
    totop() {
      console.log('reach totop');
    },
    tobottom() {
      console.log('reach tobottom');
    },
    getDataSS() {
      // const data = Array.from({ length: 1 }).map((_, index) => ({
      //   key: index,
      //   name: `Edward King ${index}`,
      //   age: 32,
      //   address: `London, Park Lane no. ${index}`,
      // }));
      // setTimeout(() => {
      //   this.listCard = data;
      // }, 500);
    },
  },
};
</script>

<style lang="less">
.list-page {
  width: 100%;
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
  border-color: dimgray;

  .list-item-page {
    display: flex;
    align-items: center;
    padding: 1em;
    border-bottom: 1px solid;
    border-color: lightgray;
  }
}

.bottom {
  padding: 2em 0;
}
</style>
