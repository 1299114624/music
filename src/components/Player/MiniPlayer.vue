<template>
  <div class="player" v-if="playList.length>0" v-show="!fullScreen&&!drawerVis" @click="open">
    <transition name="mini">
      <div class="mini-player">
        <!-- <div class="player-pic"><img :src="_currentSong.album.blurPicUrl||'../static/img/no-pic.png'" alt=""></div> -->
        <div class="player-pic"><img :src="_currentSong.al.picUrl||'../static/img/no-pic.png'" alt=""></div>
        <div class="music-content">
          <!-- <div class="music-content-name">{{_currentSong.name||"暂无歌曲"}}</div> -->
          <div class="music-content-name">{{_currentSong.al.name||"暂无歌曲"}}</div>
          <div class="music-content-artist">{{_currentSong.ar.name||"暂无歌者"}}</div>
        </div>
        <div class="player-play">
          <!-- <i class="fa fa-play-circle-o play-icon"></i> -->
          <img :src="playIcon" alt="" @click.stop="play">
        </div>
        <div class="player-list">
          <img :src="listIcon" alt="">
        </div>
        <audio ref="audio" @canplay="ready" @ended="end" @error="error" @timeupdate="updateTime" :src="`http://music.163.com/song/media/outer/url?id=${_currentSong.id}.mp3`"></audio>
      </div>

    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      listIcon: require("../../assets/player/music list_black.png"),
      playIcon: "../static/img/music_play_black.png",
      currentTime: 0
    };
  },
  computed: {
    ...mapGetters([
      "fullScreen",
      "playing",
      "currentIndex",
      "playList",
      "songIsReady",
      "playerMode",
      "songSequence",
      "currentSong",
      "drawerVis"
    ]),
    _currentSong() {
      let song =
        this.playerMode === 0
          ? this.songSequence[this.currentIndex]
          : this.playerMode === 2
            ? this.playList[this.currentIndex]
            : this.currentSong;
      if (song) {
        this.setCurrentSong(song);
      }
      this.setCurrentSong(song);
      this.$nextTick(() => {
        this.awPlay();
      });
      return song;
    }
  },
  watch: {
    playing(val) {
      this.$nextTick(() => {
        this.playIcon = val
          ? "../static/img/music_pause_black.png"
          : "../static/img/music_play_black.png";
        val ? this.awPlay() : this.$refs.audio.pause();
      });
    },
  },
  methods: {
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayState: "SET_PLAYING_STATE",
      setCurrentSong: "SET_CURRENT_SONG",
      setSongReady: "SET_SONG_READY",
      setCurrentIndex: "SET_CURRENT_INDEX"
    }),
    awPlay() {
      let auidoDom = this.$refs.audio.play();
      if (this.auidoDom !== undefined) {
        promise.catch(error => {
          this.$refs.audio.play();
        }).then(() => {
          this.$refs.audio.play();
        });
      }
    },
    open() {
      this.setFullScreen(true);
    },
    next() {
      if (!this.songIsReady) {
        return;
      }
      let currrentIndex = this.currentIndex + 1;
      if (currrentIndex === this.playList.length) {
        currrentIndex = 0;
      }
      this.setCurrentIndex(currrentIndex);
      this.setSongReady(false);       
    },
    play() {
        this.setPlayState(!this.playing);
    },
    ready() {
        this.setSongReady(true);
    },
    end() {
      if (this.playerMode === 1) {
        this.$refs.audio.currentTime = 0;
        this.awPlay();
      } else {
        this.next();
      }
    },
    error() {
      this.setSongReady(true);
      //有些歌曲有跨域错误,直接跳到下一首
      this.next()
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  width: 100%;
  height: 10%;
  .mini-player {
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.8s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    &.mini-enter-to,
    &.mini-leave {
      opacity: 0.4;
    }
    height: 4rem;
    display: flex;
    background: #fff;
    border-top: 1px solid #ddd;
    width: 100%;
    align-items: center;
    .player-pic {
      padding-left: 0.3rem;
      width: 6rem;
      img {
        width: 100%;
        display: block;
      }
    }
    .music-content {
      width: 45rem;
      padding-left: 3%;
      // .music-content-name {
      // }
      .music-content-artist {
        font-size: 0.5rem;
        color: #ddd;
      }
    }
    .player-list,
    .player-play {
      // color: #a9a2a2;
      // font-size: 1.8rem;
      width: 6rem;
      img {
        width: 65%;

        display: block;
      }
    }
  }
}
@media screen and (min-width: 888px) {
  .player .mini-player .music-content {
    width: 80%;
  }
}
@media screen and (min-width: 690px) {
  .player .mini-player .player-pic {
    width: 3rem;
  }
}
</style>

