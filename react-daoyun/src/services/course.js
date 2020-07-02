import { get, post, del, put } from "../utils/request";

export function CourselistApi(page = 1) { //��ȡ�б�
    return get("api/course/course", { page });
}

export function CourseCreateApi(data) { //��������
    return post("api/course/info", data);
}

export function CourseModifyApi(id, data) { //��������
    return put("api/course/info/${id}", data);
}

export function CourseDelApi(id, data) { //ɾ������
    return del("api/course/info/${id}");
}