import { get, post, del, put } from "../utils/request";

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