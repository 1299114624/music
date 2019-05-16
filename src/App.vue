<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Loading></Loading>
    <normal-player class="normal-player" :currentTime="currentTime"></normal-player>    
    <mini-player class="mini-player" ref="miniPlayer"></mini-player>
  </div>
</template>

<script>
import NormalPlayer from "components/Player/NormalPlayer";
import MiniPlayer from "components/Player/MiniPlayer";
import Loading from "base/Loading";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: 'App',
  components: {
    MiniPlayer,
    NormalPlayer,
    Loading
  },
  computed: {
    ...mapGetters(["playList"]),
    currentTime() {
      if (this.playList.length > 0) {
        return this.$refs.miniPlayer.currentTime;
      } else {
      }
    }
  },
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
</style>

<style lang="scss">
@import "common/sass/font-awesome.scss";
html {
  height: 100%;
  body {
    height: 100%;
    background-color: #fbf9fe;
    #app {
      height: 100%;
      .mini-player {
        position: absolute;
        bottom: 0;
      }
      .normal-player {
        position: fixed;
        bottom: 0;
        height: 100%;
      }
    }
  }
}
</style>

