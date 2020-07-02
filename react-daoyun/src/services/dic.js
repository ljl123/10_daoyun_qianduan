/*import { stringify } from 'qs';//���ﶼ�ǹ̶���
import request from '../utils/request';//���ﶼ�ǹ̶���

// �ӿڵ���

// ����
export async function upCategorySet(params) {
    return request(`/api/user/city/CategorySet/update`, {
        method: 'PUT',
        body: params,
    });
}
// ���
export async function addCategorySet(params) {
    return request(`/api/user/city/CategorySet/store`, {
        method: 'POST',
        body: params,
    });
}
// ��ȡ����
export async function getRecordList(params) {
    return request(`/api/user/marketAction/getRecordList?${stringify(params)}`, {
        method: 'GET',
    });
}
// ��ȡ����
export async function getRecordList(params) {
    return request(`/api/user/marketAction/getRecordList?${stringify(params)}`);
}
// ɾ��
export async function delCategorySet(params) {
    return request(`/api/user/city/CategorySet/destroy`, {
        method: 'DELETE',
        body: params,
    });
}*/  //����
import { get, post, del, put } from "../utils/request";

export function CourselistApi(page = 1) { //��ȡ�б�
    return get("api/dict/type", { page });
}

export function CourseCreateApi(data) { //��������
    return post("api/dict/type", data);
}

export function CourseModifyApi(id, data) { //��������
    return put("api/dict/info/${id}", data);
}

export function CourseDelApi(id, data) { //ɾ������
    return del("api/dict/info/${id}");
}