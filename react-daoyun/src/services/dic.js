/*import { stringify } from 'qs';//这里都是固定的
import request from '../utils/request';//这里都是固定的

// 接口调用

// 更新
export async function upCategorySet(params) {
    return request(`/api/user/city/CategorySet/update`, {
        method: 'PUT',
        body: params,
    });
}
// 添加
export async function addCategorySet(params) {
    return request(`/api/user/city/CategorySet/store`, {
        method: 'POST',
        body: params,
    });
}
// 获取数据
export async function getRecordList(params) {
    return request(`/api/user/marketAction/getRecordList?${stringify(params)}`, {
        method: 'GET',
    });
}
// 获取数据
export async function getRecordList(params) {
    return request(`/api/user/marketAction/getRecordList?${stringify(params)}`);
}
// 删除
export async function delCategorySet(params) {
    return request(`/api/user/city/CategorySet/destroy`, {
        method: 'DELETE',
        body: params,
    });
}*/  //测试
import { get, post, del, put } from "../utils/request";

export function CourselistApi(page = 1) { //获取列表
    return get("api/dict/type", { page });
}

export function CourseCreateApi(data) { //创建数据
    return post("api/dict/type", data);
}

export function CourseModifyApi(id, data) { //新增数据
    return put("api/dict/info/${id}", data);
}

export function CourseDelApi(id, data) { //删除数据
    return del("api/dict/info/${id}");
}