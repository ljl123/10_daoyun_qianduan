import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, Select, message } from 'antd';
import { insertStructure } from '../../../utils/data';

function New(props) {
    console.log(props);

    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        required: '信息不能为空!',


    };


    const onFinish = values => {
        //console.log(insertStructure(props.match.params.id, values));
        if (props.match.params.id) {
            if (insertStructure(props.match.params.id, values)) {
                message.success('创建成功！');
                props.history.push('/admin/structure');
            } else {
                message.error('专业不可细分！');
            }
        } else {
            message.error('创建失败！');
        }
    };

    return (
        <Card title="新增"
            extra={
                <Button

                    size="small"
                    onClick={() => { props.history.push('/admin/structure') }}
                >
                    返回
            </Button>
            }>
            <Form {...layout} name="structureNew" onFinish={onFinish} validateMessages={validateMessages}
                form={form}>
                <Form.Item name="title" label="名称" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default New
