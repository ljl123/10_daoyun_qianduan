import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, Select, message } from 'antd';
import { insertUser, getUserById, modifyUserById } from '../../../utils/data';

function Edit(props) {
    console.log(props);
    const [currentData, setCurrentData] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        if (props.match.params.id) {
            var data = getUserById(props.match.params.id);
            console.log(data);
            setCurrentData(data);
            form.setFieldsValue({
                phone: data.phone,
                email: data.email,
                name: data.name,
                gender: data.gender,
                role: data.role,
                idNumber: data.idNumber
            });
        } else {
            form.setFieldsValue({
                gender: '未知',
                role: '学生'
            });
        }

    }, []);

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

    const { Option } = Select;

    const onFinish = values => {

        if (props.match.params.id) {
            if (modifyUserById(props.match.params.id, values)) {
                message.success('修改成功！');
                props.history.push('/admin/users');
            } else {
                message.error('修改失败！');
            }
        } else {
            if (insertUser(values)) {
                message.success('添加用户成功！');
                props.history.push('/admin/users');
            } else {
                message.error('该手机号已使用！');
            }
        }
    };

    return (
        <Card title="用户编辑"
            extra={
                <Button

                    size="small"
                    onClick={() => { props.history.push('/admin/users') }}
                >
                    返回
            </Button>
            }>
            <Form {...layout} name="userEdit" onFinish={onFinish} validateMessages={validateMessages}
                form={form}>
                <Form.Item name="phone" label="手机号" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="邮箱" rules={[{ type: 'email' }]}>
                    <Input defaultValue={currentData.email} />
                </Form.Item>
                <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                    <Input defaultValue={currentData.name} />
                </Form.Item>
                <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
                    <Select
                    >
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                        <Option value="未知">未知</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="role" label="角色" rules={[{ required: true }]}>
                    <Select
                    >
                        <Option value="学生">学生</Option>
                        <Option value="教师">教师</Option>
                        <Option value="管理员">管理员</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="idNumber" label="学号/工号" rules={[{}]}>
                    <Input defaultValue={currentData.idNumber} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Edit
