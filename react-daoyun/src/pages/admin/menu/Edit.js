import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, Select, message } from 'antd';
import { insertMenu } from '../../../utils/data';

function Edit(props) {
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
            if (insertMenu(props.match.params.id, values)) {
                message.success('创建成功！');
                props.history.push('/admin/menu');
            } else {
                message.error('菜单最多两级,此菜单已是最小子集！');
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
                    onClick={() => { props.history.push('/admin/menu') }}
                >
                    返回
            </Button>
            }>
            <Form {...layout} name="menuNew" onFinish={onFinish} validateMessages={validateMessages}
                form={form}>
                <Form.Item name="title" label="菜单名" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="url" label="url" rules={[{ required: true }]}>
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
