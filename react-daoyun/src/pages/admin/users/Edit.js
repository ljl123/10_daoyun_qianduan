import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, Select, message } from 'antd';
import { insertUser, getUserById, modifyUserById } from '../../../utils/data';
import { AddUserApi, getUserInfo, modifyUser } from "../../../services/users";

function Edit(props) {
    console.log(props);
    const [currentData, setCurrentData] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        let id = props.match.params.id
        let name_1 = props.match.params.name
        if (id) {
            // var data = getUserById(props.match.params.id);   //修改界面，获取该用户信息API
            // console.log(data);
            // setCurrentData(data);
            // form.setFieldsValue({
            //     phone: data.phone,
            //     email: data.email,
            //     name: data.name,
            //     gender: data.gender,
            //     role: data.role,
            //     idNumber: data.idNumber
            // });
            let type_1 = localStorage.getItem("type");
            let uid_1 = localStorage.getItem("uid");
            let params = {
                token: window.localStorage.getItem("token"),
                uid: uid_1,
                inter_type: type_1,
                name: name_1,
            }
            getUserInfo(params).then((res) => {
                if (res.result_code == 200) {
                    setCurrentData(res.data);
                    form.setFieldsValue(res.data)
                } else {
                    message.error(res.result_desc)
                }
            }).catch((err) => {
                console.log(err);
            })


        } else {
            form.setFieldsValue({
                gender: '未知',
                role: '管理员'
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
        let token = localStorage.getItem("token");
        let uid = localStorage.getItem("uid");
        let type_1 = localStorage.getItem("type");
        if (props.match.params.id) {
            // if (modifyUserById(props.match.params.id, values)) { //修改API
            //     message.success('修改成功！');
            //     props.history.push('/admin/users');
            // } else {
            //     message.error('修改失败！');
            // }

            let params = {
                uid: props.match.params.id,
                ...values,
                token: window.localStorage.getItem("token")
            }
            modifyUser(params).then((res) => {
                if (res.result_code == 200) {
                    message.success('修改成功！');
                    props.history.push('/admin/users');
                } else {
                    message.error('修改失败！');
                }
            }).catch((err) => {
                console.log(err);
            })


        } else {
            /*
            if (insertUser(values)) {   //新建用户API
                message.success('添加用户成功！');
                props.history.push('/admin/users');
            } else {
                message.error('该手机号已使用！');
            }
            */
            AddUserApi(token, type_1, values.phone, values.type, values.email, values.name).then((res) => {
                if (res.data.result_code === '200') {
                    console.log("success add!");
                    message.success('Processing complete!')
                }
                else {
                    console.log("fail add!");
                }
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
            <Form {...layout} form={form} name="userEdit" onFinish={onFinish} validateMessages={validateMessages}
                form={form}>
                <Form.Item name="phone" label="手机号" rules={[{ required: true, message: "请输入手机号" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="邮箱" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="姓名" rules={[{ required: true, message: "姓名" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="gender" label="性别" rules={[{ required: true, message: "请选择性别" }]}>
                    <Select
                    >
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                        <Option value="未知">未知</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="type" label="账号类型" rules={[{ required: true, message: "请选择账号类型"  }]}>
                    <Select
                    >
                        {/* <Option value="学生">学生</Option> */}
                        <Option value="2">教师</Option>
                        <Option value="1">管理员</Option>
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
