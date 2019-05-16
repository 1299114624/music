<template>
  <div class="dailysongs">
    <div class="vis-wrapper">
      <m-header :info="info" @back="back" class="m-header"></m-header>
      <main ref="wrapper">
        <div class="wrapper-container" ref="container">
          <div class="main-top" :style="{'background-image':`url(${backgroundUrl})`}" ref="topPic">
            <div class="main-top-tips">根据你的口味每天6:00生成</div>
            <div></div>
          </div>
          <List :list="songList" :showPic="true" @select="selectItem" ref="mainList" style="height:100%;"></List>
        </div>
      </main>
    </div>
  </div>
</template>

<script>

import MHeader from "base/MHeader";
import scrollMixin from "@/mixin/scrollMixin";
import { mapActions } from "vuex";
import List from "base/List";
import { getDailySongs } from "api/api_dailysongs";
export default {
  components: {
    MHeader,
    List,
  },
  data() {
    return {
      songList: []
    };
  },
  mixins: [scrollMixin],
  created() {
      this.getDailySongs()
  },
  methods:{
    back(){
      this.$router.push('/')
    },
    async getDailySongs() {
      let data = await getDailySongs() 
      console.log('dailysongs',data)
      if (data.code === 200) {
        data.recommend.forEach(element => {
        element.singer = element.artists.map(t => t.name).join("/"); //歌手
        });
        this.songList = data.recommend;
      }
    },
    selectItem(index, item) {
      this.selectSong({ list: this.songList, song: item, index });
    },
    ...mapActions({
      selectSong: "SELECT_SONG"
    })
  },
  computed: {
    backgroundUrl() {
      return this.songList.length > 0
        ? this.songList[0].album.blurPicUrl
        : "../static/img/no-pic.png";
    },
    info() {
      return {
        title: "每日推荐",
        description: ""
      };
    }
  },
}
</script>

<style lang="scss" scoped>
.dailysongs {
  height: 100%;
  .vis-wrapper {
    height: 100%;
    .m-header {
      height: 8%;
    }
    main {
      background: #ddd;
      height: 92%;
      overflow: auto;

      .main-top {
        height: 18rem;
        /* width: 100%; */
        opacity: 0.8;
        background-position: center;
        background-size: cover;
        text-align: center;
        color: #fff;
        position: relative;
        .main-top-tips {
          position: absolute;
          bottom: 0;
          left: 0.5rem;
          font-size: 0.8rem;
        }
      }
      .main-list {
        height: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>

