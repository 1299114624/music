<template>
    <div class="rec-content" :class="{playerRstHeight:playList.length>0}" ref="wrapper">
        <div class="wrapper-container" ref="container">

            <div v-if="picArray.length>0">
                <slide :loop='true' :autoPlay='true' :picArray="picArray" :style="{'margin-top':'10px'}"/>
            </div>

            <circle-icon @click.native="operate(index)" v-for="(item,index) in icons" :icon="item.name" :key="index" :class="'distance'" :style="index===0?{'margin-left':0}:''">
            <!--去掉第一个元素的margin-->
                <div>{{item.text}}</div>
            </circle-icon>

            <div class="song-sheets">
                <sheet-label :title="'推荐歌单'"></sheet-label>
                <grid :col=2 :cols=3>
                    <grid-item label="Grid" v-for="item in contentArray" :key="item.id" :link="{ path: `/songsheets/${item.id}`}">
                    <img slot="icon" v-lazy="item.picUrl">
                    <div slot="label">{{item.name}}</div>
                    <div class="right-top">
                        <i class="fa fa-headphones"></i>
                        <span>{{(item.playCount/10000).toFixed(2)+"W" }}
                        </span>
                    </div>
                    </grid-item>
                </grid>
            </div>

            <div class="song-sheets">
                <sheet-label :title="'最新音乐'"></sheet-label>
                <grid :col=2 :cols=3>
                    <grid-item label="Grid" v-for="item in newsongs" :key="item.id" @click.native="goToSongSheet(item.id)">
                    <img slot="icon" v-lazy="item.coverImgUrl">
                    <div slot="label">{{item.name}}</div>
                    <div class="right-top">
                    </div>
                    </grid-item>
                </grid>
            </div>
        </div>
    </div>
</template>

<script>
import { getFirstScreenData , getSongSheetsData} from "api/api_recomend.js"
import { mapGetters, mapActions } from "vuex";
import { Grid, GridItem } from "vux";
import scrollMixin from "@/mixin/scrollMixin"
import CircleIcon from "components/Recomend/CircleIcon";
import SheetLabel from "components/Recomend/SheetLabel";
import Slide from "components/Index/Slide.vue";
import BScroll from "better-scroll";
export default {
    components: {
        CircleIcon,
        Slide,
        SheetLabel,
        Grid,
        GridItem,
    },
    data() {
        return {
            icons: [
                { name: "iconfont icon-FM", text: "私人FM" },
                { name: "iconfont icon-meirituijian-", text: "每日推荐" },
                { name: "iconfont icon-yinle1", text: "歌单" },
                { name: "iconfont icon-paihangbang", text: "排行榜" }
            ],
            picArray: [],
            videoArray: [],
            contentArray: [],
            newsongs:[]
        }
    },
    created() {
        this.getAllData();
    },
    computed: {
        ...mapGetters(["playList"])
    },
    methods: {
        operate(index) {
            let maps = ["", "/dailysongs"];
            this.$router.push(maps[1]);
        },
        async getAllData() {
            let res = await getFirstScreenData()
            console.log('getFirstScreenData',res)
            let opts = {
                order: "new",
                limit: 6
            };
            let newsongs = await getSongSheetsData(opts, ["playlistData"]);
            let newsong = newsongs[0];
            console.log('getSongSheetsData',newsongs)
            let personalized = res[0];
            let banner = res[1];
            let privateContent = res[2];
            if (newsong.data.code == 200) {
                this.newsongs = newsong.data.playlists;
            }
            if (banner.data.code === 200) {
                this.picArray = banner.data.banners;
            }
            if (personalized.data.code === 200) {
                this.contentArray = personalized.data.result.slice(0, 6); //土鳖法，截取前6
            }
            if (privateContent.data.code === 200) {
                privateContent.data.result.forEach(element => {
                element.picUrl = element.sPicUrl;
                });
                this.videoArray = privateContent.data.result;
            }
        },
        goToSongSheet(id) {
            this.$router.push(`/songsheets/${id}`);
        }
    },
    mixins:[scrollMixin]
}
</script>

<style lang="scss" scoped>
.playerRstHeight {
  height: calc(100% - 155px) !important;
}
.rec-content {
  text-align: center;
  height: calc(100% - 90px);
  overflow: hidden;
  .wrapper-container {
//    padding-top: 90px;
   .distance {
    margin-left: 5%;
    margin-top: 10px;
    }
  }
}
</style>
<style lang="scss">
.weui-grid__label div {
  text-overflow: ellipsis;
  overflow: hidden;
}
.weui-grid__icon {
  width: auto !important;
  height: 7.5rem !important;
  margin: 0 auto !important;
}
@media screen and(min-width: 768px) {
  .weui-grid__icon {
    height: 20rem !important;
    width: 20rem !important;
  }
}
.right-top {
  position: absolute;
  top: 1.2rem;
  right: 0.7rem;
  font-size: 0.6rem;
  color: #fff;
}
</style>

