import { get, post, del, put } from "../utils/request";

export function CourselistApi(page = 1) { //获取列表
    return get("api/course/course", { page });
}

export function CourseCreateApi(data) { //创建数据
    return post("api/course/info", data);
}

export function CourseModifyApi(id, data) { //新增数据
    return put("api/course/info/${id}", data);
}

export function CourseDelApi(id, data) { //删除数据
    return del("api/course/info/${id}");
}