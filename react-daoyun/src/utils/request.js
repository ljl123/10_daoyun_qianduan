import axios from 'axios';
import { getToken } from "./auth";
import qs from 'qs';

const instance = axios.create({
    baseURL: 'http://localhost:33333/',//本地服务器端接口—测试用
    //baseURL: 'http://121.89.192.99:33333', //服务器端部署测试
    timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers["authorization"] = "Bearer" + getToken();

    if (config.type == 'formData' || config.method != 'post') {
        return config
    }
    config.data = qs.stringify(config.data)
    return config
    //return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});




// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
//请求发送后执行
export function get(url, params) { //params是url传参，查询条件
    return instance.get(url, { params })
}

export function post(url, data) { //data数据，url请求地址
    return instance.post(url, data)
}

export function put(url, data) {
    return instance.put(url, data)
}

export function del(url) {
    return instance.delete(url)
}