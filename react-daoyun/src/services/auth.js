import { post } from "../utils/request";

export function loginApi(username,password) {
    return post("api/user/login", username,password);//��Ҫ���ݵĲ���username,password
}
