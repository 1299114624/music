<template>
    <div class="index">
        <drawer :show.sync="drawerVisibility" show-mode="push" placement="left" :drawer-style="{'background-color':'#fff', width: '340px'}">
            <div class="menu-container" slot="drawer">
                <Menu></Menu>
            </div>
            <div class="main">
                 <x-header>
                     <div slot="overwrite-left">
                        <i :class="headerIcon" @click="showDrawer"></i>
                    </div>
                    <span class="title-icon">
                        <!-- <i class="iconfont icon-yinle"></i> -->
                        <i class="iconfont icon-music"></i>
                        <i class="iconfont icon-video"></i>
                    </span>
                    <div slot="right" class="right">
                        <i class="fa fa-search"></i>
                    </div>
                 </x-header>
                 <tab>
                    <tab-item selected @on-item-click="onItemClick">推荐</tab-item>
                    <tab-item @on-item-click="onItemClick">朋友</tab-item>
                    <tab-item @on-item-click="onItemClick">电台</tab-item>
                </tab>
                <router-view></router-view>
            </div>
        </drawer>
    </div>
</template>

<script>
import { Drawer, XHeader, Tab, TabItem } from "vux";
import Menu from "components/Index/Menu";
import { mapGetters, mapMutations } from "vuex";
export default {
    components: {
        Drawer,
        XHeader,
        Tab,
        TabItem,
        Menu,
    },
    data() {
        return {
            drawerVisibility: false
        }
    },
    methods:{
        showDrawer(){
            if (Object.keys(this.userInfo).length > 0) {
                this.drawerVisibility = true
            } else {
                this.$router.push("/login")
            }
        },
        onItemClick(){
            
        }
    },
    computed: {
        headerIcon() {
            return "fa fa-reorder"
        },
        ...mapGetters(["userInfo"])
    }
}
</script>

<style lang="scss">
@import "../assets/recommend/iconfont.scss";
.vux-header {
    background: #9bca4f !important;
}
.index {
    height: 100%;
    .main {
        height: 100%;
    }
    .fa-reorder {
    font-size: 2rem;
    vertical-align: middle;
  }
  .fa-user-o {
    font-size: 2rem;
    vertical-align: middle;
    color: #ddd;
  }
  .right {
    font-size: 2rem;
    // vertical-align: middle;
  }
  .vux-header-right {
    top: 7px !important;
  }
  .vux-drawer {
    height: 100% !important;
    overflow-x: hidden !important;
  }
  .vux-header-left {
    top: 7px !important;
  }
  .menu-container {
    height: 100%;
    }
}
.title-icon {
  margin-left: -30px; //用负外边距来把第一个padiding fix
  i {
    font-size: 2rem;
    vertical-align: middle;
    padding-left: 30px;
    font-size: 2rem;
  }
}
.vux-tab-item {
    font-size: 1rem !important
}
</style>

