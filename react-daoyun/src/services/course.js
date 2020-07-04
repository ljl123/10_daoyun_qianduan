import { get, post, del, put } from "../utils/request";
import { message } from 'antd'
import axios from 'axios'
import { hex_md5 } from '../utils/md5';
//export const baseURL = 'http://localhost:33333';//本地服务器端接口—测试用
export const baseURL = 'http://121.89.192.99:33333';//服务器端部署测试
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

export function CreateCourseApi(token, course_name, place, time, teacher, stu_count, uid, location) { //测试通过，创建课程接口
    const create_course = baseURL + '/api/course/create';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('course_name', course_name);
    fd.append('place', place);
    fd.append('time', time);
    fd.append('teacher', teacher);
    fd.append('stu_count', stu_count);
    //fd.append('course_id', course_id);
    //fd.append('creater_uid', creater_id);
    fd.append('uid', uid);
    fd.append('location', location);
    return new Promise((resolve, reject) => {
        axios.post(create_course, fd, { headers: { "Content-Type": "multipart/form-data" } }
        ).then((res) => {
            if (res.data.result_code === '200') {
                //message.success("创建成功");
            } else {
                console.log(res.data)
                //message.error("创建失败");
            }
            //console.log(res.data);
            resolve(res)
        })
    })
}