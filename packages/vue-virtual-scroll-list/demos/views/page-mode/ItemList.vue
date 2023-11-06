<template>
  <div class="item-inner">
    <div class="head">
      <span># {{ source.index }}</span>
      <span>{{ source.name }}</span>
    </div>
    <div class="desc">{{ source.desc }}</div>

    <template v-for="(row, index) in listCard">
      <el-card :key="`img${index}`" class="box-card">
        <div slot="header" class="clearfix">
          <span>图片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">{{ '列表内容 ' + o }}</div>
      </el-card>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PageModeItemList',
  props: {
    source: {
      type: Object,
      default() {
        return {};
      },
    },
    listCard: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      imgList: [],
    };
  },
  created() {
    console.log('created---111', this.source.index);
    this.getData();
  },
  mounted() {
    console.log('mounted---2222', this.source.index);
  },
  methods: {
    getData() {
      const data = Array.from({ length: 1 }).map((_, index) => ({
        key: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`,
      }));
      setTimeout(() => {
        this.imgList = data;
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
.item-inner {
  .head {
    font-weight: 500;
  }
  span:first-child {
    margin-right: 1em;
  }
  .desc {
    padding-top: 0.5em;
    text-align: justify;
  }
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
