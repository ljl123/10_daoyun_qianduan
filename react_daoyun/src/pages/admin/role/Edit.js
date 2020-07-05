import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, Checkbox, message } from 'antd';
import { insertRole, getRoleById, modifyRoleById } from '../../../utils/data';

function Edit(props) {
    console.log(props);
    const [currentData, setCurrentData] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        if (props.match.params.id) {
            var data = getRoleById(props.match.params.id);
            console.log(data);
            setCurrentData(data);
            form.setFieldsValue({
                role: data.role,
                authority: data.authority
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



    const onFinish = values => {
        console.log(values);
        if (props.match.params.id) {
            if (modifyRoleById(props.match.params.id, values)) {
                message.success('修改成功！');
                props.history.push('/admin/role');
            } else {
                message.error('修改失败！');
            }
        } else {
            if (insertRole(values)) {
                message.success('添加角色成功！');
                props.history.push('/admin/role');
            } else {
                message.error('该角色已存在！');
            }
        }
    };

    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }

    const options = [
        { label: '用户管理', value: '用户管理' },
        { label: '课程管理', value: '课程管理' },
        { label: '系统参数', value: '系统参数' },
        { label: '组织结构', value: '组织结构' },
        { label: '菜单管理', value: '菜单管理' },
        { label: '角色权限', value: '角色权限' },
        { label: '字典管理', value: '字典管理' },
    ];

    return (
        <Card title="角色编辑"
            extra={
                <Button

                    size="small"
                    onClick={() => { props.history.push('/admin/role') }}
                >
                    返回
            </Button>
            }>
            <Form {...layout} name="roleEdit" onFinish={onFinish} validateMessages={validateMessages}
                form={form}>
                <Form.Item name="role" label="角色" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="authority" label="权限" >
                    <Checkbox.Group options={options} onChange={onChange} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Edit
