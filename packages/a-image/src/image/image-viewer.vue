<template>
  <transition v-if="showViewer" name="viewer-fade">
    <div
      ref="el-image-viewer__wrapper"
      tabindex="-1"
      class="el-image-viewer__wrapper"
      :style="{ 'z-index': zIndex }"
    >
      <div class="el-image-viewer__mask"></div>
      <!-- CLOSE -->
      <span class="el-image-viewer__btn el-image-viewer__close" @click="hide">
        <i class="el-icon-circle-close"></i>
      </span>
      <!-- ARROW -->
      <template v-if="!isSingle">
        <span
          class="el-image-viewer__btn el-image-viewer__prev"
          :class="{ 'is-disabled': !infinite && isFirst }"
          @click="prev"
        >
          <i class="el-icon-arrow-left" />
        </span>
        <span
          class="el-image-viewer__btn el-image-viewer__next"
          :class="{ 'is-disabled': !infinite && isLast }"
          @click="next"
        >
          <i class="el-icon-arrow-right" />
        </span>
      </template>
      <!-- ACTIONS -->
      <div :class="{ 'el-image-viewer__carousel': true }" class="el-image-viewer__btn">
        <div class="el-image-viewer__actions">
          <div class="el-image-viewer__actions__inner">
            <i class="el-icon-zoom-out" @click="handleActions('zoomOut')"></i>
            <i class="el-icon-zoom-in" @click="handleActions('zoomIn')"></i>
            <i class="el-image-viewer__actions__divider"></i>
            <i :class="mode.icon" @click="toggleMode"></i>
            <i class="el-image-viewer__actions__divider"></i>
            <i class="el-icon-refresh-left" @click="handleActions('anticlocelise')"></i>
            <i class="el-icon-refresh-right" @click="handleActions('clocelise')"></i>
          </div>
        </div>
        <VueResizeObserver @resize="handleMainCarousel">
          <MainCarousel
            ref="imageCarousel"
            class="el-image-viewer__carousel_main"
            :autoplay="false"
            indicator-position="none"
            :loop="false"
            arrow="always"
            :height="`${carouseImage.height}px`"
            @change="changeCarousel"
          >
            <MainCarouselItem
              v-for="(item, index) in carouseList"
              :key="index"
              class="el-image-viewer__carousel_main_item"
              :name="`${carouseItemName}${index}`"
            >
              <!-- <keep-alive> -->
              <template v-if="carouseItemActive === `${carouseItemName}${index}`">
                <div class="el-image-viewer__alive" :name="`alive${index}`">
                  <template v-for="(url, i) in getCarouseImageList(item, index)">
                    <ImageView
                      :key="`imgCarousel${index}${i}`"
                      class="el-image-viewer__carousel_main_item_image"
                      :class="{
                        main_item_image_selected: getCarouseImageSelected(url, i, item, index),
                      }"
                      :style="{
                        width: `${carouseImage.width - 10}px`,
                        height: `${carouseImage.height}px`,
                      }"
                      lazy
                      :src="url.src"
                      @click="onClickImage(url, i, item, index)"
                    />
                  </template>
                </div>
              </template>
              <!-- </keep-alive> -->
            </MainCarouselItem>
          </MainCarousel>
        </VueResizeObserver>
      </div>
      <!-- CANVAS -->
      <div class="el-image-viewer__canvas">
        <template v-for="(url, i) in urlList">
          <img
            v-if="i === index"
            ref="img"
            :key="`img${i}`"
            class="el-image-viewer__img"
            :src="currentImg"
            :style="imgStyle"
            @load="handleImgLoad"
            @error="handleImgError"
            @mousedown="handleMouseDown"
          />
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
import { on, off } from 'element-ui/src/utils/dom';
import { rafThrottle, isFirefox } from 'element-ui/src/utils/util';

import ImageView from './ImageView.vue';
import MainCarousel from '../carousel/main.vue';
import MainCarouselItem from '../carousel/item.vue';

const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'el-icon-full-screen',
  },
  ORIGINAL: {
    name: 'original',
    icon: 'el-icon-c-scale-to-original',
  },
};

const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';

export default {
  name: 'ElImageViewer',
  components: { ImageView, MainCarousel, MainCarouselItem },
  props: {
    urlList: {
      type: Array,
      default: () => [],
    },
    zIndex: {
      type: Number,
      default: 2000,
    },
    onSwitch: {
      type: Function,
      default: () => {},
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showViewer: false,
      index: this.initialIndex,
      isShow: false,
      infinite: true,
      loading: false,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false,
      },
      carouseList: 0,
      carouseItemActive: '',
      carouseItemName: 'imageCard',
      carouseImage: {
        list: 0,
        width: 130,
        height: 80,
        btnWidth: 100,
      },
    };
  },
  computed: {
    isSingle() {
      return this.urlList.length <= 1;
    },
    isFirst() {
      return this.index === 0;
    },
    isLast() {
      return this.index === this.urlList.length - 1;
    },
    currentImg() {
      return this.urlList[this.index].maxSrc;
    },
    imgStyle() {
      const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? 'transform .3s' : '',
        'margin-left': `${offsetX}px`,
        'margin-top': `${offsetY}px`,
      };
      if (this.mode === Mode.CONTAIN) {
        style.maxWidth = style.maxHeight = '100%';
      }
      return style;
    },
  },
  watch: {
    index: {
      handler(val) {
        this.reset();
        this.onSwitch(val);
      },
    },
    currentImg() {
      this.$nextTick(() => {
        const $img = this.$refs.img[0];
        if (!$img.complete) {
          this.loading = true;
        }
      });
    },
  },
  destroyed() {
    if (this.$el) {
      this.$el.parentElement.removeChild(this.$el);
    }
  },
  mounted() {
    this.reset();
    this.deviceSupportInstall();
    // add tabindex then wrapper can be focusable via Javascript
    // focus wrapper so arrow key can't cause inner scroll behavior underneath
    // this.$refs['el-image-viewer__wrapper'].focus();
  },
  methods: {
    handleMainCarousel(entry) {
      const { btnWidth } = this.carouseImage;
      this.carouseImage.list = parseInt((entry.contentRect.width - btnWidth) / this.carouseImage.width, 10);
      this.carouseList = Math.ceil(this.urlList.length / this.carouseImage.list, 10);
      // console.log('this.handleMainCarousel', entry);
      this.$nextTick(() => {
        this.reset();
      });
    },
    getCarouseImageList(item, index) {
      const start = index * this.carouseImage.list;
      const end = (index + 1) * this.carouseImage.list;
      const imgList = this.urlList.slice(start, end);
      // console.log('getCarouseImageList', index, start, end, imgList);
      return imgList;
    },
    getCarouseImageSelected(url, imgIndex, item, index) {
      const start = index * this.carouseImage.list;
      const curIndex = start + imgIndex;
      return this.index === curIndex;
    },
    onClickImage(url, imgIndex, item, index) {
      const start = index * this.carouseImage.list;
      this.index = start + imgIndex;
      console.log('onClickImage', this.index);
    },
    hide() {
      this.deviceSupportUninstall();
      this.onClose();
    },
    deviceSupportInstall() {
      this._keyDownHandler = rafThrottle((e) => {
        const { keyCode } = e;
        switch (keyCode) {
          // ESC
          case 27:
            this.hide();
            break;
          // SPACE
          case 32:
            this.toggleMode();
            break;
          // LEFT_ARROW
          case 37:
            this.prev();
            break;
          // UP_ARROW
          case 38:
            this.handleActions('zoomIn');
            break;
          // RIGHT_ARROW
          case 39:
            this.next();
            break;
          // DOWN_ARROW
          case 40:
            this.handleActions('zoomOut');
            break;
          default:
            break;
        }
      });
      this._mouseWheelHandler = rafThrottle((e) => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
        if (delta > 0) {
          this.handleActions('zoomIn', {
            zoomRate: 0.015,
            enableTransition: false,
          });
        } else {
          this.handleActions('zoomOut', {
            zoomRate: 0.015,
            enableTransition: false,
          });
        }
      });
      on(document, 'keydown', this._keyDownHandler);
      on(document, mousewheelEventName, this._mouseWheelHandler);
    },
    deviceSupportUninstall() {
      off(document, 'keydown', this._keyDownHandler);
      off(document, mousewheelEventName, this._mouseWheelHandler);
      off(window, 'resize', this._resizeHandler);
      this._keyDownHandler = null;
      this._mouseWheelHandler = null;
      this._resizeHandler = null;
    },
    handleImgLoad() {
      this.loading = false;
    },
    handleImgError(e) {
      this.loading = false;
      e.target.alt = '加载失败';
    },
    handleMouseDown(e) {
      if (this.loading || e.button !== 0) return;

      const { offsetX, offsetY } = this.transform;
      const startX = e.pageX;
      const startY = e.pageY;
      this._dragHandler = rafThrottle((ev) => {
        this.transform.offsetX = offsetX + ev.pageX - startX;
        this.transform.offsetY = offsetY + ev.pageY - startY;
      });
      on(document, 'mousemove', this._dragHandler);
      on(document, 'mouseup', () => {
        off(document, 'mousemove', this._dragHandler);
      });

      e.preventDefault();
    },
    reset() {
      this.transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false,
      };
      const curImg = this.urlList[this.index];
      const carouseIndex = Array.from({ length: this.carouseList }).findIndex((item, index) => {
        const start = index * this.carouseImage.list;
        const end = (index + 1) * this.carouseImage.list;
        const imgList = this.urlList.slice(start, end) || [];
        return imgList.find((img) => {
          return img.src === curImg.src;
        });
      });
      const name = `${this.carouseItemName}${carouseIndex !== -1 ? carouseIndex : 0}`;
      this.carouseItemActive = name;
      if (this.$refs.imageCarousel) {
        this.$refs.imageCarousel.setActiveItem(name);
      }
    },
    changeCarousel(val) {
      this.carouseItemActive = `${this.carouseItemName}${val}`;
    },
    toggleMode() {
      if (this.loading) return;

      const modeNames = Object.keys(Mode);
      const modeValues = Object.values(Mode);
      const index = modeValues.indexOf(this.mode);
      const nextIndex = (index + 1) % modeNames.length;
      this.mode = Mode[modeNames[nextIndex]];
      this.reset();
    },
    prev() {
      if (this.isFirst && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index - 1 + len) % len;
    },
    next() {
      if (this.isLast && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index + 1) % len;
    },
    handleActions(action, options = {}) {
      if (this.loading) return;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options,
      };
      const { transform } = this;
      switch (action) {
        case 'zoomOut':
          if (transform.scale > 0.2) {
            transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
          }
          break;
        case 'zoomIn':
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
          break;
        case 'clocelise':
          transform.deg += rotateDeg;
          break;
        case 'anticlocelise':
          transform.deg -= rotateDeg;
          break;
        default:
          break;
      }
      transform.enableTransition = enableTransition;
    },
  },
};
</script>
<style lang="less">
.el-image-viewer {
  &__btn {
    z-index: 2;
  }
  &__carousel {
    left: 0%;
    bottom: 5px;
    height: 150px;
    width: 100%;
    padding: 0 10px;
    flex-direction: column;
    overflow: hidden;
    border-radius: 0%;
    z-index: 1;
  }
  &__actions {
    left: 0%;
    bottom: 0px;
    transform: translateX(0%);
    margin-bottom: 10px;
  }
  &__carousel_main {
    width: 100%;
    height: 100px;
    padding: 0px;
    border-color: #fff;
    border-radius: 0px;
    overflow: hidden !important;
  }
  &__carousel_main_item {
    text-align: center;
    transition: none !important;
    display: inline-block !important;
  }

  &__carousel_main_item_image {
    position: relative;
    margin-right: 6px;
    &:before {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      content: '';
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      position: absolute;
      visibility: hidden;
      border: 2px solid #fa4242;
    }
    & + & {
      margin-right: 6px;
    }
    &.main_item_image_selected {
      &:before {
        opacity: 1;
        visibility: visible;
      }
    }
  }
}
</style>
