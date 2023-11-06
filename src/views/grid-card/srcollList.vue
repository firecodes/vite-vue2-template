<!-- eslint-disable prettier/prettier -->
<template>
  <div class="instagram-grid">
    <ul class="medias">
      <li
        v-for="(media, index) in medias"
        :key="index"
        class="item"
        @click="openMediaGallery(index)"
      >
        <div class="content">
          <!-- <a-image
            :ref="`image_${index}`"
            class="background"
            :src="media.maxSrc"
            :preview-src-list="medias"
            lazy
          ></a-image>-->
          <div v-lozad class="background" :data-background-image="media.maxSrc" />
          <div v-if="index % 2=== 0" class="mask">
            <span class="icon">{{ index }}</span>
          </div>
          <div class="type-icon">
            <span class="icon">{{ index }}</span>
          </div>
          <span class="date">
            <span class="icon">{{ index }}</span>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    medias: {
      type: [Array],
      default: undefined,
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    openMediaGallery(index) {
      if (index % 2 !== 0) {
        return false;
      }
      const $ref = this.$refs[`image_${index}`];
      $ref[0].$el.click();
    },
  },
};
</script>

<style lang="less" scoped>
@import 'src/styles/variables.less';
@size: 280px;

.medias {
  margin: 0;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: @gap * 5;
  list-style: none;

  .item {
    display: block;
    padding: 1rem;
    background-color: @module-bg;
    @include radius-box(@xs-radius);

    .content {
      position: relative;
      height: @size;
      cursor: pointer;

      &:hover {
        .mask {
          @include visible();
        }
      }

      .background {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-color: @module-bg-darker-1;
      }

      .type-icon {
        opacity: 0.8;
        position: absolute;
        right: @sm-gap;
        font-size: @font-size-h4;
        color: @white;
      }

      .date {
        opacity: 0.8;
        position: absolute;
        bottom: @sm-gap;
        left: @gap;
        color: @white;
        font-size: @font-size-root;
        font-weight: bold;
        letter-spacing: 1px;
      }

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: @z-index-normal + 1;
        background-color: rgba(#000, 0.3);
        color: rgba(@white, 0.8);
        @include hidden();
        @include visibility-transition();

        .icon {
          font-size: 2em;
        }
      }
    }
  }
}
</style>
