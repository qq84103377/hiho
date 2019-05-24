import Vue from 'vue'
import axios from 'axios';
import  { Toast } from 'vux'
const baseUrl = process.env.BASE_URL;
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    if(response.data.code !==0 && response.config.url !== 'https://upload-z2.qiniup.com'
        &&response.config.url!== 'https://api.weixin.qq.com/sns/oauth2/access_token'
        &&response.config.url!== 'https://api.weixin.qq.com/sns/userinfo'){
        Vue.$vux.toast.show({
            type:'text',
            text: response.data.msg
        })
    }
    return response.data;
}, function (error) {

    return Promise.reject(error);
});

export default axios;
