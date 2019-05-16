// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import {
  ToastPlugin
} from 'vux'
Vue.use(ToastPlugin)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/img/no-pic.png',
  loading: require('./assets/imgLoading.png'),
  attempt: 1
})
FastClick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  mounted () {
    // console.log(this.$children[0].$data)
 
     window.addEventListener('DOMNodeInserted', function () {
       // debugger
       let docEl = window.document.documentElement
       if (window.innerWidth < 768) { // 在768宽度以下使用rem
         let width = docEl.getBoundingClientRect().width
         let rem = width / 25
        //  console.log(rem,width)
         docEl.style.fontSize = rem + 'px'
       } else {
         docEl.style.fontSize = ''
       }
     }, false)
     window.addEventListener('resize', function () {
       // debugger
       let docEl = window.document.documentElement
       if (window.innerWidth < 768) {
         let width = docEl.getBoundingClientRect().width
         let rem = width / 25
         docEl.style.fontSize = rem + 'px'
       } else {
         docEl.style.fontSize = ''
       }
     }, false)
   },
  destroyed () {
   window.removeEventListener('DOMNodeInserted')
   window.removeEventListener('resize')
  },
  render: h => h(App)
}).$mount('#app')
