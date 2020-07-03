import { get, post, del, put } from "../utils/request";

export function getCourseList(data) {
    return get("api/course/course", data);
}

export function getCourseInfo(data) {
    return get("api/course/info", data);
}

export function modifyCourse(data) {
    return put("api/course/info", data);
}

export function createCourse(data) {
    return post("api/course/create", data);
}

export function deleteCourse(data) {
    return post("api/manage/course", data);
}