import axios from 'axios'
import {message} from 'antd'
// export const baseURL = 'http://localhost:33333';//本地服务器端接口—测试用
export const baseURL = 'http://121.89.192.99:33333';//服务器端部署测试


export function getParamApi(token) {
    const params = baseURL+'/api/system/infos';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('infoid',"1");
    return new Promise((resolve, reject)=>{
        axios.post(params, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            resolve(res)
        })
    })
}
export function modifyParamApi(token,experience,distance) {
    const params = baseURL+'/api/system/info';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('infoid',"1");
    fd.append('distance',distance);
    fd.append('experience',experience);
    return new Promise((resolve, reject)=>{
        axios.put(params, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            if(res.data.result_code ==='200'){
                message.success("修改成功");
            }else{
                console.log(res.data);
                message.error("修改失败--数值无改动");
            }
            resolve(res)
        })
    })
}
