import React from 'react';
import { Form, Card, Input, Button, InputNumber } from 'antd'

function Edit(props) {
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };


    const onFinish = values => {
        console.log(values);
    };

    return (
        <Card title="用户编辑">
            <Form {...layout} name="userEdit" onFinish={onFinish}>
                <Form.Item name="lesson" label="课程号" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="课程名" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="college" label="学校/学院" rules={[{}]}>
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
