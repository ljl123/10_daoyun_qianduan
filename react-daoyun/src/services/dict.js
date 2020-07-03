
import { get, post, del, put } from "../utils/request";

export function getDictTypes(data) {//modifyType
    return get("api/dict/types", data);
}

export function getDictInfos(data) {
    return get("api/dict/infos", data);
}

export function modifyType(data) {
    return put("api/dict/type", data);
}

export function createType(data) {
    return post("api/dict/create_type", data);
}

export function deleteType(data) {
    return del("api/dict/type", data);
}

export function modifyDictInfo(data) {
    return put("api/dict/info", data);
}

export function createDictInfo(data) {
    return post("api/dict/create_info", data);
}

export function deleteDictInfo(data) {
    return del("api/dict/info", data);
}