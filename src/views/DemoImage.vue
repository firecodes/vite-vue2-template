<template>
  <div class="image-page">
    <div class="page-content">
      <placeholder :data="grid?.data" :loading="grid.fetching">
        <template slot="placeholder">
          <h2>empty</h2>
        </template>
        <template slot="loading">
          <h2>loading</h2>
        </template>
        <template slot="default">
          <gridCardSrcollList :medias="grid?.data" />
          <!-- <h2>------美丽的分割线------</h2> -->
          <loadmore
            v-if="!grid.fetching && !grid.finished"
            ref="loadmoreGrid"
            class="loadmore"
            :loading="grid.loading"
            @loadmore="grid.fetch('load')"
          >
            <template #normal>
              <button class="normal" @click="grid.fetch('load')">
                <i class="iconfont icon-loadmore"></i>
                <span>加载更多</span>
              </button>
            </template>
            <template #loading>
              <h2 class="loading" width="2.4rem" height="1.4rem" gap="1rem">loading</h2>
              <!-- <loading-indicator class="loading" width="2.4rem" height="1.4rem" gap="1rem" /> -->
            </template>
          </loadmore>
        </template>
      </placeholder>
    </div>
  </div>
</template>

<script>
import gridCardSrcollList from './grid-card/srcollList.vue';
import TableClass from './TableClass.js';

export default {
  components: {
    gridCardSrcollList,
  },
  data() {
    return {
      grid: {
        data: [],
        fetching: false,
        loading: false,
        finished: false,
        fetch: this.fetch,
      },
    };
  },
  computed: {},
  created() {
    this.TableClass = TableClass;
    this.grid.fetch();
  },
  methods: {
    fetch(type) {
      console.log('methods:', type);
      if (!type) {
        this.grid.fetching = true;
      } else {
        this.grid.loading = true;
      }
      this.TableClass.getQueryData(20).then((data) => {
        if (!type) {
          this.grid.fetching = false;
        } else {
          this.grid.loading = false;
          // this.$refs.loadmoreGrid?.isViabledElementLoadData(true);
        }
        this.grid.data = this.grid.data.concat(data);
        if (this.grid.data.length >= 10 * 100) {
          this.grid.finished = true;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import '../src/styles/variables.less';

.image-page {
  margin: 0px auto;
  width: 1200px;
  .page-content {
    margin: 0rem 0;

    .loadmore {
      margin-top: 4rem;
      color: @text-disabled;
      .normal {
        font-size: @font-size-h1;
      }
      .loading {
        margin: @sm-gap 0;
      }
    }
  }
  .module-empty {
    font-weight: bold;
    font-size: @font-size-h3;
  }
}
</style>
