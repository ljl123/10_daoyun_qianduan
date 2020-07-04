import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, InputNumber, Radio, message } from 'antd'
import { modifyDictInfo, createDictInfo } from "../../../services/dict";

function InfoEdit(props) {
    const [currentData, setCurrentData] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        if (props.match.params.id) {
            setCurrentData(props.location.query.record);
            form.setFieldsValue(props.location.query.record);
        } else {
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
        if (props.match.params.id) {
            let params = {
                token: window.localStorage.getItem("token"),
                ...values,
                typeid: currentData.typeid,
                infoid: values.id,
            }
            modifyDictInfo(params).then((res) => {
                if (res.result_code == 200) {
                    message.success('修改成功！');
                    props.history.push('/admin/dic');
                } else {
                    message.error('修改失败！');
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            let params = {
                token: window.localStorage.getItem("token"),
                ...values,
                typeid: props.location.query.typeid,
            }
            createDictInfo(params).then((res) => {
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
        // if (props.match.params.id) {
        //     if (modifyUserById(props.match.params.id, values)) { //修改API
        //         message.success('修改成功！');
        //         props.history.push('/admin/dic');
        //     } else {
        //         message.error('修改失败！');
        //     }
        // } else {
        //     if (insertUser(values)) {                       //新建API
        //         message.success('添加成功！');
        //         props.history.push('/admin/dic');
        //     } else {
        //         message.error('修改失败！');
        //     }
        // }
    };

    return (
        <Card title="字典详情编辑"
            extra={
                <Button

                    size="small"
                    onClick={() => { props.history.push('/admin/dic') }}
                >
                    返回
        </Button>
            }>
            <Form {...layout} form={form} name="DicInfoEdit" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name="id" label="值" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="info" label="文本" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="typestate" label="默认值" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value={1}>true</Radio>
                        <Radio value={0}>false</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default InfoEdit

