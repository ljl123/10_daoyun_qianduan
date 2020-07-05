import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, Select, message } from 'antd';
import { set,getParamById, modifyParamById } from '../../../utils/data';
import { modifyParamApi,getParamApi } from '../../../services/params';
import { setToken, getToken } from '../../../utils/auth';


const paramsList = 'paramsList';
function Edit(props) {
    console.log(props);
    const [currentData, setCurrentData] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        if (props.match.params.id) {
            var data = getParamById(props.match.params.id);
            console.log(data);
            setCurrentData(data);
            form.setFieldsValue({
                chinese: data.chinese,
                english: data.english,
                value: data.value
            });
        }

    }, []);

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        required: '信息不能为空!',


    };

    const { Option } = Select;

    const onFinish = values => {

        if (props.match.params.id) {  
            var experence,distance=0;
            if(props.match.params.id==1){
                experence=values.value;
                var data1 = getParamById(2);
                distance=data1.value;
            }else{
                distance=values.value;
                var data1 = getParamById(1);
                experence=data1.value;
            }
            let token= getToken("token");
            modifyParamApi(token, experence,distance).then((res)=>{
                if(res.data.result_code === '200'){
                    let token= getToken("token");
                    let param_list=[];
                    getParamApi(token).then((res)=>{
                        if(res.data.result_code === '200'){
                            console.log("success get params list!");
                            for (let i = 0; i < res.data.data.length; i++) {
                                let dataInfo1 = {
                                    id: 1,
                                    chinese:"经验值",
                                    english: "experience",
                                    value: res.data.data[i].experience
                                };
                                let dataInfo2 = {
                                    id: 2,
                                    chinese:"距离",
                                    english: "distance",
                                    value: res.data.data[i].distance
                                };
                                param_list.push(dataInfo1);
                                param_list.push(dataInfo2);
                                set(paramsList, param_list); 
                                props.history.push('/admin/params');  
                            }
                        }
                        else if(res.data.result_code === '206'){
                            console.log("token time out!");
                            message.error("token time out!");
                        }else{
                            console.log(res.data);
                        }
                    })                 
                }
            })
        } 
    };

    return (
        <Card title="参数编辑"
            extra={
                <Button

                    size="small"
                    onClick={() => { props.history.push('/admin/params') }}
                >
                    返回
            </Button>
            }>
            <Form {...layout} name="paramsEdit" onFinish={onFinish} validateMessages={validateMessages}
                form={form}>
                <Form.Item name="chinese" label="中文" rules={[{ required: true }]}>
                    <Input disabled={true}/>
                </Form.Item>
                <Form.Item name="english" label="英文" rules={[{ required: true }]}>
                    <Input disabled={true}/>
                </Form.Item>
                <Form.Item name="value" label="值" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Edit
