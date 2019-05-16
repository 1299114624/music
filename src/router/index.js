import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'

Vue.use(Router)
const view = (path, name) => () => import(`@/components/${path}${name}`) //路由按需加载
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component:view('','Index'),
            meta: {requireAuth: false},
            children: [
                {
                    path: '/',
                    name: 'Recomend',
                    component: view('', 'Recomend'),
                    meta: {requireAuth: false}
                },
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: view('', 'Login'),
            meta: {requireAuth: false}
        },
        {
            path: '/songsheets/:id',
            name: 'SongSheet',
            component: view('', 'SongSheet'),
            meta: {requireAuth: false}
        },
        {
            path: '/dailysongs',
            name: 'dailysongs',
            component: view('', 'DailySongs'),
            meta: {requireAuth: true}
        }
    ]
})
export default router