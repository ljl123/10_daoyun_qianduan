import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, Select, message } from 'antd';
import { getStructureById, modifyStructureById } from '../../../utils/data';

function Edit(props) {
    console.log(props);
    const [currentData, setCurrentData] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        if (props.match.params.id) {
            var data = getStructureById(props.match.params.id);
            console.log(data);
            if (data) {
                setCurrentData(data);
                form.setFieldsValue({
                    title: data.title
                });
            }

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
        //console.log(props.match.params.id.length);
        if (props.match.params.id) {
            if (modifyStructureById(props.match.params.id, values)) {
                message.success('修改成功！');
                props.history.push('/admin/structure');
            } else {
                message.error('修改失败！');
            }
        } else {
            message.error('修改失败！');
        }
    };

    return (
        <Card title="修改"
            extra={
                <Button

                    size="small"
                    onClick={() => { props.history.push('/admin/structure') }}
                >
                    返回
            </Button>
            }>
            <Form {...layout} name="structureEdit" onFinish={onFinish} validateMessages={validateMessages}
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

export default Edit
