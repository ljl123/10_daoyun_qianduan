import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, Select, message } from 'antd';
import { insertUser, getUserById, modifyUserById } from '../../../utils/data';
import { GetUserInfoApi, AddUserApi, AlterUserApi, getUserInfo, modifyUser } from "../../../services/users";
import { setToken, getToken } from '../../../utils/auth';
import { set, initUsers, getParamById, modifyParamById } from '../../../utils/data';

const userList = 'userList';
function Edit(props) {
    console.log(props);
    const [currentData, setCurrentData] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        if (props.match.params.id && props.location.query) {
            console.log(props.location.query.record);
            var udata = props.location.query.record;
            var gender0;
            if (udata.gender == '') {
                gender0 = '未知'
            } else {
                gender0 = udata.gender
            }
            form.setFieldsValue({
                phone: udata.phone,
                email: udata.email,
                name: udata.name,
                gender: gender0,
                stu_code: udata.stu_code,
            });

        } else {
            props.history.push('/admin/users');
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
        //let token = localStorage.getItem("token");
        //let uid = localStorage.getItem("uid");
        //let type_1 = localStorage.getItem("type");
        //let id = props.match.params.id
        if (props.match.params.id) {
            var gender1;
            if (values.gender == '未知') {
                gender1 = ''
            } else {
                gender1 = values.gender
            }

            let params = {
                token: window.localStorage.getItem("token"),
                uid: props.match.params.id,
                phone: values.phone,
                name: values.name,
                email: values.email,
                gender: gender1,
                stu_code: values.stu_code,

            }
            // console.log(params)
            AlterUserApi(params).then((res) => {
                console.log(res)
                if (res.data.result_code == '200') {
                    message.success('修改成功！');
                    props.history.push('/admin/users');
                } else {
                    if (res.data.result_code == '0') {
                        message.error('此手机号已被使用！');
                    } else if (res.data.result_code == '206') {
                        message.error('无修改！');
                    } else {
                        message.error('修改失败！');
                    }

                    console.log(res)
                }
            }).catch((err) => {
                console.log(err);
            })


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
            <Form {...layout} form={form} name="userEdit2" onFinish={onFinish} validateMessages={validateMessages}
                form={form}>
                <Form.Item name="phone" label="手机号" rules={[{ required: true, message: "请输入手机号" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="姓名" rules={[{ required: true, message: "姓名" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="gender" label="性别" rules={[{ message: "请选择性别" }]}>
                    <Select
                    >
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                        <Option value="未知">未知</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="stu_code" label="学号/工号" rules={[{}]}>
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
