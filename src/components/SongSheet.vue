<template>
  <div class="song-sheet">
    <div class="vis-wrapper">
      <div class="header">
        <div class="header-arrow">
          <img
            @click="back"
            id="header-arrow-arrow"
            src="../assets/songsheet/arrow-left.png"
            alt="暂无"
          >
        </div>
        <div class="header-title">
          <div class="header-title-title">{{title}}</div>
          <div class="header-title-description">{{info.description}}</div>
        </div>
      </div>
      <main ref="wrapper">
        <div class="wrapper-container" ref="container">
          <div class="main-top">
            <img class="main-top-image" :src="info.coverImgUrl" alt>
            <div class="main-top-right">
              <div class="main-top-title">{{info.name}}</div>
              <div class="main-top-author">
                <div class="avatar-div">
                  <img id="ct-avatar" :src="info.creator.avatarUrl">
                </div>
                <div class="ct-nickname">{{info.creator.nickname}}</div>
              </div>
            </div>
          </div>
          <div class="main-list">
            <List :list="songList" @select="selectItem"></List>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import scrollMixin from "@/mixin/scrollMixin"
import { getSheetDetail } from "api/api_songsheet.js";
import { mapMutations, mapActions } from "vuex";
import List from "base/List";
export default {
  mixins:[scrollMixin],
  components: {
    List
  },
  data() {
    return {
      title: "歌单",
      info: {
        creator: {}
      },
      songList: []
    };
  },
  activated() {
    let id = this.$route.params.id;
    this.getDetail(id);
  },
  methods: {
    selectItem(index,item) {
        console.log('songlist',this.songList,'songitem',item,index)
        this.selectSong({ list: this.songList, song: item, index });
    },
    back() {
      this.$router.go(-1);
    },
    async getDetail(id) {
      let data = await getSheetDetail(id);
      console.log("getSheetDetail", data);
      let info = {
        coverImgUrl: data.coverImgUrl,
        name: data.name,
        createTime: data.createTime,
        trackCount: data.trackCount,
        playCount: data.playCount,
        description: data.description,
        tags: data.tags,
        creator: {
          avatarUrl: data.creator.avatarUrl || "",
          nickname: data.creator.nickname
        }
      };
      this.info = info;
      data.tracks.forEach(element => {
        element.singer = element.artists.map(t => t.name).join("/"); //歌手
      });
      this.songList = data.tracks;
    },
    ...mapActions({
      selectSong: "SELECT_SONG"
    })
  }
};
</script>

<style lang="scss" scoped>
.song-sheet {
  height: 100%;
  .vis-wrapper {
    height: 100%;
  }
  .header {
    background: #ddd;
    color: #fff;
    display: flex;
    .header-arrow {
      align-self: flex-end;
      flex: 0.2;
      #header-arrow-arrow {
        width: 60%;
      }
    }
    .header-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 0.7;
      width: 50%;
      .header-title-title {
        font-size: 1.2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
      }
      .header-title-description {
        font-size: 0.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
      }
    }
  }
  main {
    background: #ddd;
    height: calc(100% - 49px);
    overflow: auto;
    .wrapper-container {
      // padding-top: 49px;
    }
    .main-top {
      padding-left: 1rem;
      padding-top: 0.5rem;
      overflow: hidden;
      padding-bottom: 1rem;
      .main-top-image {
        float: left;
        width: 35%;
      }
      .main-top-right {
        overflow: hidden;
        padding-left: 0.5rem;
        .main-top-title {
          height: 60px;
          width: 92%;
        }
        .main-top-author {
          font-size: 0.5rem;
          display: flex;
          .avatar-div {
            width: 10%;
            margin-right: 0.5rem;
            #ct-avatar {
              width: 100%;
              display: block;
              border-radius: 50%;
            }
          }
          .ct-nickname {
            align-self: flex-end;
          }
        }
      }
    }
  }
}
</style>

