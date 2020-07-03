import { get, post, del, put } from "../utils/request";
import { message } from 'antd'
import axios from 'axios'
import { hex_md5 } from '../utils/md5';
//export const baseURL = 'http://localhost:33333';//本地服务器端接口—测试用
export const baseURL = 'http://121.89.192.99:33333';//服务器端部署测试


export function listApi(page = 1) {
    return get("", { page });
}

export function createApi(data) {
    return post("", data);
}

export function modifyApi(id, data) {
    return put("/${id}", data);
}

export function delApi(id, data) {
    return del("/${id}");
}

export function getUserList(data) {
    return post("api/manage/user", data);
}

export function getUserInfo(data) {
    return post("api/manage/user", data);
}

export function delUser(data) {
    return post("api/manage/user", data);
}

export function modifyUser(data) {
    return put("api/user/info", data);
}

export function AddUserApi(token, inter_type, phone, type, email, name) {
    const register = baseURL + '/api/user/register';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('inter_type', inter_type);
    fd.append('phone', phone);
    fd.append('type', type);
    fd.append('email', email);
    fd.append('name', name);
    return new Promise((resolve, reject) => {
        axios.post(register, fd, { headers: { "Content-Type": "multipart/form-data" } }
        ).then((res) => {
            if (res.data.result_code === '200') {
                message.success("添加成功");
            } else {
                console.log(res.data)
                message.error("添加失败");
            }
            //console.log(res.data);
            resolve(res)
        })
    })
}