import { get, post, del, put } from "../utils/request";

export function UserlistApi(page = 1) { //��ȡ�б�
    return get("api/user/info", { page });
}

export function UserCreateApi(data) { //��������
    return post("api/user/info", data);
}

export function UserModifyApi(uid, data) { //��������
    return put("api/user/info/${uid}", data);
}

export function UserDelApi(uid, data) { //ɾ������
    return del("api/user/info/${uid}");
}