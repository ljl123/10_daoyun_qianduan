import React from 'react';
import { Form, Card, Input, Button, InputNumber, Radio } from 'antd'

function gender_Edit() {
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        required: '信息不能为空!',


    };

    const onFinish = values => {
        console.log(values);
    };

    return (
        <Card title="性别编辑">
            <Form {...layout} name="genderEdit" onFinish={onFinish} validateMessages={validateMessages}>
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

export default gender_Edit

