import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, Select, message } from 'antd';
import { insertParam, getParamById, modifyParamById } from '../../../utils/data';

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
                Chinese: data.Chinese,
                English: data.English,
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
            if (modifyParamById(props.match.params.id, values)) {
                message.success('修改成功！');
                props.history.push('/admin/params');
            } else {
                message.error('修改失败！');
            }
        } else {
            if (insertParam(values)) {
                message.success('添加参数成功！');
                props.history.push('/admin/params');
            } else {
                message.error('该参数已存在！');
            }
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
                <Form.Item name="Chinese" label="中文" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="English" label="英文" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="value" label="默认值" rules={[{ required: true }]}>
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
