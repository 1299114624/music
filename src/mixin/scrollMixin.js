import BScroll from 'better-scroll'

const mixinScroll = {
    mounted () {
        /*
        *  BScroll
        *  @parma bounceTime 动画延迟设置,ps: 动画未结束click无效
        *  @parma startY 初始滑动位置
        */
       this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        bounceTime: 400,
        taps: true,
        click: true
      })
    }
}

export default mixinScroll