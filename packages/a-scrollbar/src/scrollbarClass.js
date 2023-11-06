/* eslint-disable prettier/prettier */
class ScrollbarClass {
  xBarVanishTimerId = null;

  yBarVanishTimerId = null;

  constructor(options) {
    this.init(options);
  }

  init(options = {}) {
    this.duration = options.duration;
  }

  hideXBar(scope) {
    if (this.xBarVanishTimerId !== null) {
      window.clearTimeout(this.xBarVanishTimerId);
    }
    this.xBarVanishTimerId = window.setTimeout(() => {
      scope.isShowXBar = false;
    }, this.duration);
  }

  hideYBar(scope) {
    if (this.yBarVanishTimerId !== null) {
      window.clearTimeout(this.yBarVanishTimerId);
    }
    this.yBarVanishTimerId = window.setTimeout(() => {
      scope.isShowYBar = false;
    }, this.duration);
  }

  showXBar(scope) {
    if (this.xBarVanishTimerId !== null) {
      window.clearTimeout(this.xBarVanishTimerId);
    }
    scope.isShowXBar = true;
  }

  showYBar(scope) {
    if (this.yBarVanishTimerId !== null) {
      window.clearTimeout(this.yBarVanishTimerId);
    }
    scope.isShowYBar = true;
  }

  yBarSize(scope) {
    if (scope.containerHeight === null || scope.contentHeight === null || scope.yRailSize === null) return 0;
    const height = (scope.yRailSize * scope.containerHeight) / scope.contentHeight + scope.size * 1.5;
    return Math.min(scope.containerHeight, height);
  }

  yBarTop(scope) {
    if (
      scope.containerHeight === null ||
      scope.containerScrollTop === null ||
      scope.contentHeight === null ||
      scope.yRailSize === null
    ) {
      return 0;
    }
    const toScrollTopUpperBound = scope.contentHeight - scope.containerHeight;
    const yBarSize = this.yBarSize(scope) //  scope.yBarSize
    const top = (scope.containerScrollTop / (toScrollTopUpperBound)) * (scope.yRailSize - yBarSize)
    // console.log('handleYScrollMouseMove3 yBarTop', top, scope.containerScrollTop, barHeight, scope.yRailSize, yBarSize, scope.yBarSize);
    return top
  }


  xBarSize(scope) {
    if (scope.containerWidth === null || scope.contentWidth === null || scope.xRailSize === null) return 0;
    return (scope.xRailSize * scope.containerWidth / scope.contentWidth + scope.size * 1.5)
  }

  xBarLeft(scope) {
    if (scope.containerWidth === null || scope.containerScrollLeft === null || scope.contentWidth === null) return 0;
    const toScrollLeftUpperBound = scope.contentWidth - scope.containerWidth
    const xBarSize = this.xBarSize(scope) //  scope.xBarSize
    return scope.containerScrollLeft / (toScrollLeftUpperBound) * (scope.xRailSize - xBarSize)
  }
}

export default new ScrollbarClass();
