import React from 'react';
import { Form, Card, Input, Button, InputNumber } from 'antd'

function Edit(props) {
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        required: '信息不能为空!',
        types: {
            email: '请输入正确的邮箱!',

        },

    };

    // const handleSubmit = e => {
    //     console.log(e);
    //     e.preventDefault();
    //     props.form.validateFieldsAndScroll((err, values) => {
    //         if (!err) {
    //             console.log(values);
    //             console.log("提交");
    //         } else {
    //             console.log("请输入正确的内容");
    //         }
    //     });
    // };

    const onFinish = values => {
        console.log(values);
    };

    return (
        <Card title="用户编辑">
            <Form {...layout} name="userEdit" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name="phone" label="手机号" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="邮箱" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="idNumber" label="学号/工号" rules={[{}]}>
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
