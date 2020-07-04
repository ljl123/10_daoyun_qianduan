import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, InputNumber, Radio, message } from 'antd'
import { modifyType, createType } from "../../../services/dict";
//编辑
function Edit(props) {
    const [currentData, setCurrentData] = useState({});
    const [form] = Form.useForm();
    
    useEffect(() => {
        if (props.match.params.id) {
            setCurrentData(props.location.query.record);
            form.setFieldsValue(props.location.query.record);
        }
    }, []);

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        required: '信息不能为空!',


    };

    const onFinish = values => {

        if( props.match.params.id ) {
            let params = {
                token: window.localStorage.getItem("token"),
                ...values,
                typeid: currentData.typeid,
            }
            modifyType(params).then((res) => {
                if (res.result_code == 200) {
                    message.success('修改成功！');
                    props.history.push('/admin/dic');
                } else {
                    message.error('修改失败！');
                }
            }).catch((err) => {
                console.log(err);
            })
        }else{
            let params = {
                token: window.localStorage.getItem("token"),
                ...values,
            }
            createType(params).then((res) => {
                if (res.result_code == 200) {
                    message.success('添加成功！');
                    props.history.push('/admin/dic');
                } else {
                    message.error('添加失败！');
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    };

    return (
        <Card title="字典编辑"
            extra={
                <Button

                    size="small"
                    onClick={() => { props.history.push('/admin/dic') }}
                >
                    返回
        </Button>
            }
        >
            <Form {...layout} form={form} name="DicEdit" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name="typenameChinese" label="中文" rules={[{ required: true, message: '请输入中文' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="typenameEnglish" label="英文" rules={[{ required: true, message: '请输入英文' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="描述" >
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

