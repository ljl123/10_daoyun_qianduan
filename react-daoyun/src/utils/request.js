import axios from 'axios';
import { getToken } from "./auth";

const instance = axios.create({
    baseURL: 'http://localhost:16666/',//服务器端接口
    timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers["authorization"] = "Bearer" + getToken();
    return config;
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

export function get(url, params) { //params是url传参，查询条件
    return instance.get(url, { params })
}

export function post(url, data) {
    return instance.post(url, data)
}

export function put(url, data) {
    return instance.put(url, data)
}

export function del(url) {
    return instance.delete(url)
}