import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, InputNumber, Radio } from 'antd'

function InfoEdit(props) {
    const [currentData, setCurrentData] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        if (props.match.params.id) {
            // var data = getUserById(props.match.params.id);   //修改界面，获取该信息API
            // console.log(data);
            // setCurrentData(data);
            // form.setFieldsValue({
            //     phone: data.phone,
            //     email: data.email,
            //     name: data.name,
            //     gender: data.gender,
            //     role: data.role,
            //     idNumber: data.idNumber
            // });
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
            <Form {...layout} name="DicInfoEdit" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name="value" label="值" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="texture" label="文本" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="isDefault" label="默认值" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="true">true</Radio>
                        <Radio value="false">false</Radio>
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

