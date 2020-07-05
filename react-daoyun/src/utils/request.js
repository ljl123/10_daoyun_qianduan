import axios from 'axios';
import { getToken } from "./auth";

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const instance = axios.create({
    baseURL: 'http://121.89.192.99:33333',//服务器端接口
    // baseURL: 'http://localhost:33333/',//服务器端接口
    timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers["authorization"] = "Bearer" + getToken();
    if ( config.method != 'get' ) {
        config.headers["Content-Type"] = "multipart/form-data";
    }
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
    var fd = new FormData();
    for (const key in data) {
        fd.append(key, data[key]);
    }
    return instance.post(url, fd)
}

export function put(url, data) {
    var fd = new FormData();
    for (const key in data) {
        fd.append(key, data[key]);
    }
    return instance.put(url, fd)
}

export function del(url, data) {
    var fd = new FormData();
    for (const key in data) {
        fd.append(key, data[key]);
    }
    return instance.delete(url, { data: fd })
}