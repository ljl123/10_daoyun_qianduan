import axios from 'axios'
import {message} from 'antd'
import {hex_md5} from '../utils/md5';
// export const baseURL = 'http://localhost:33333';//本地服务器端接口—测试用
export const baseURL = 'http://121.89.192.99:33333';//服务器端部署测试



export function modifyPwdApi(token,email,old_pwd,new_pwd) {
    const modifypwd = baseURL+'/api/user/password';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('email',email);
    fd.append('old_pwd',old_pwd);
    fd.append('new_pwd',hex_md5(new_pwd));
    return new Promise((resolve, reject)=>{
        axios.put(modifypwd, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            if(res.data.result_code ==='200'){
                message.success("修改成功");
            }else{
                console.log(res.data);
                message.error("修改失败");
            }
            resolve(res)
        })
    })
}
