import { get, post, del, put } from "../utils/request";
import { message } from 'antd'
import axios from 'axios'
import { hex_md5 } from '../utils/md5';
//export const baseURL = 'http://localhost:33333';//���ط������˽ӿڡ�������
export const baseURL = 'http://121.89.192.99:33333';//�������˲������


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
    return post("api/manage/user", data);
}

export function AddUserApi(token, phone, type, email, name) {
    const register = baseURL + '/api/manage/user';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('inter_type', '4');
    fd.append('phone', phone);
    fd.append('type', type);
    fd.append('email', email);
    fd.append('name', name);
    return new Promise((resolve, reject) => {
        axios.post(register, fd, { headers: { "Content-Type": "multipart/form-data" } }
        ).then((res) => {

            if (res.data.result_code === '200') {
                //message.success("���ӳɹ�");
            } else {
                console.log(res.data)
                //message.error("����ʧ��");
            }

            //console.log(res.data);
            resolve(res)
        })
    })
}

export function AlterUserApi(data) {
    const alter_user_info = baseURL + '/api/manage/user';
    var fd = new FormData();

    fd.append('token', data.token);
    fd.append('inter_type', '2');
    fd.append('uid', data.uid);
    fd.append('phone', data.phone);
    fd.append('name', data.name);
    fd.append('email', data.email);
    fd.append('gender', data.gender);
    fd.append('stu_code', data.stu_code);
    fd.append('school', '');
    fd.append('department', '');
    fd.append('profession', '');

    return new Promise((resolve, reject) => {
        axios.post(alter_user_info, fd, { headers: { "Content-Type": "multipart/form-data" } }
        ).then((res) => {
            /*
            if (res.data.result_code === '200') {
                message.success("�޸ĳɹ�");
            } else {
                console.log(res.data)
                message.error("�޸�ʧ��");
            }
            */
            resolve(res)
        })
    })
}

export function GetUserInfoApi(token, inter_type) {
    const register = baseURL + '/api/manage/user';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('inter_type', inter_type);
    return new Promise((resolve, reject) => {
        axios.post(register, fd, { headers: { "Content-Type": "multipart/form-data" } }
        ).then((res) => {
            /*
            if (res.data.result_code === '200') {
                message.success("���ӳɹ�");
            } else {
                console.log(res.data)
                message.error("����ʧ��");
            }
            */
            //console.log(res.data);
            resolve(res)
        })
    })
}
