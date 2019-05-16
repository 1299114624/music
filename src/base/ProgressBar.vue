<template>
  <div class="progress-bar">
    <div class="rogress-bar-sttime">{{sttime}}</div>
    <div class="progress-bar-wrapper">
      <div class="progress-bar-inner" ref="inner">
      </div>
      <div class="progress-bar-btn" ref="btn" @touchstart.prevent.stop="btnOnTouchStart" @touchmove.prevent.stop="btnOnTouchMove" @touchend.prevent.stop="btnOnTouchEnd">
      </div>
    </div>
    <div class="rogress-bar-edtime">{{edtime}}</div>
  </div>
</template>

<script>
export default {
  props: {
    ratio: {
      type: Number,
      default: 0
    },
    sttime: {
      type: String,
      default: ""
    },
    edtime: {
      type: String,
      default: ""
    }
  },
  created() {
    this.touchState = {};
  },
  methods: {
    btnOnTouchStart(e) {
        // console.log(e.touches[0])
        this.touchState.isInit = true;
        this.touchState.startX = e.touches[0].pageX;//手指开始位置
        const progressLength = this.$refs.inner.style.width;//已经播放的长度
        this.touchState.progressWidth =  // 由于width取出来是含有px的，处理一下 =>得到数值
            progressLength.length > 2
            ? progressLength.substring(0, progressLength.length - 2) * 1
            :0;
    },
    btnOnTouchMove(e) {
        if (!this.touchState.isInit) {
            return
        }
        const offsetX = e.touches[0].pageX - this.touchState.startX; //手指在水平方向移动的距离
        const barWidth = window.innerWidth * 0.7; //整个进度条的长度
        const progressWidth = Math.min(
            barWidth,
            Math.max(0, this.touchState.progressWidth + offsetX)
        )
        this.touchState.finalRatio = progressWidth / barWidth //比例
        // console.log(progressWidth, this.touchState.progressWidth)
        this.setOffSetWidth(progressWidth) //设置进度条

    },
    btnOnTouchEnd(e) {
      this.touchState.isInit = false;
      this.$emit("barOnChange", this.touchState.finalRatio);
    },
    setOffSetWidth(width) {
      this.$refs.inner.style.width = width + "px";
      this.$refs.btn.style.left = width - 9 + "px";
    },
  },
  watch: {
    ratio(newRatio) {
      if (!this.touchState.isInit && newRatio >= 0) {
        let currentWidth = window.innerWidth * 0.7 * newRatio;
        this.setOffSetWidth(currentWidth);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  display: flex;
  align-items: center;
  .progress-bar-wrapper {
    //display: inline-block;
    width: 70%;
    height: 4px;
    margin: 0 auto;
    position: relative;
    border-radius: 50px;
    background-color: #a59c9c;
    .progress-bar-inner {
      background: #fff;
      height: 4px;
      width: 0px;
    }
    .progress-bar-btn {
      height: 18px;
      width: 18px;
      border-radius: 50%;
      position: absolute;
      border: solid 6px #9bca4f;
      top: -7px;
      background: #fff;
      box-sizing: border-box;

      left: -9px;
    }
  }
  .rogress-bar-sttime {
    //display: inline-block;

    font-size: 0.5rem;
    color: #fff;
    position: absolute;
    left: 1.2rem;
  }
  .rogress-bar-edtime {
    //display: inline-block;
    font-size: 0.5rem;
    color: #fff;
    position: absolute;
    right: 1.2rem;
  }
}
</style>
