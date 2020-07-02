import { post } from "../utils/request";
import {message} from 'antd'
import axios from 'axios'
import {hex_md5} from '../utils/md5';
// export const baseURL = 'http://localhost:33333';//本地服务器端接口—测试用
export const baseURL = 'http://121.89.192.99:33333';//服务器端部署测试

export function loginApi(username,password) {
    const login = baseURL+'/api/user/login';
    var fd = new FormData();
    fd.append('username', username);
    fd.append('password', hex_md5(password));
    return new Promise((resolve, reject)=>{
        axios.post(login, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            if(res.data.result_code ==='200'){
                message.success("登录成功");
            }else{
                console.log(res.data);
                message.error("登录失败");
            }
            console.log("sasas"+res.data);
            resolve(res)
        })
    })
    // return post("api/user/login", username,password);//��Ҫ���ݵĲ���username,password
}
