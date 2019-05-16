<template>
  <div class="slide" ref="slide">
      <div class="slide-group" ref="slideGroup">
            <div v-for="(item,index) in picArray" v-bind:key="index" class="slider-item"><img :src="item.picUrl"/></div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    picArray: {
      type: Array,
      default: []
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.slide {
    width: 90%;
    overflow: hidden;
    margin: 0 auto;
    height: 10.5rem;
    position: relative;
    .slide-group {
        overflow: hidden;
        white-space: nowrap;
        .slider-item {
            width: 154vw;
            float: left;
            img {
                display: block;
                width: 100%;
                margin: 0 auto;
            }
        }
    }
}
</style>

