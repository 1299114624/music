import axios from 'axios'
import {debounce} from 'common/js/util'
import store from '@/store/index.js'
import {notLoadingUrl} from 'api/urls'
import {SET_REQUEST_END} from '@/store/mutation-types'

class Api {
    axios () {
        axios.defaults.baseURL = process.env === 'development' ? '/api' : '//yeshuoqiang.cn:3306'
        axios.defaults.withCredentials = true
        axios.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            if(notLoadingUrl.indexOf(config.url) < 0) {
                store.commit(SET_REQUEST_END, false)
                // console.log(store.state.requestEnd)
            }
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        return axios
    }
}

export default new Api()

axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    debounce(()=>{
        store.commit(SET_REQUEST_END, true)
        // console.log(store.state.requestEnd)
    },500)
    return response;
  }, function (error) {
    // 对响应错误做点什么
    store.commit(SET_REQUEST_END, true)
    return Promise.reject(error);
  });