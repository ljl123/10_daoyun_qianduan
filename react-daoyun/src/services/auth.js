import { post } from "../utils/request";

export function loginApi(username,password) {
    return post("api/user/login", username,password);//需要传递的参数username,password
}
