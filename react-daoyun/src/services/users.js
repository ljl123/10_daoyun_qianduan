import { get, post, del, put } from "../utils/request";

export function UserlistApi(page = 1) { //获取列表
    return get("api/user/info", { page });
}

export function UserCreateApi(data) { //创建数据
    return post("api/user/info", data);
}

export function UserModifyApi(uid, data) { //新增数据
    return put("api/user/info/${uid}", data);
}

export function UserDelApi(uid, data) { //删除数据
    return del("api/user/info/${uid}");
}