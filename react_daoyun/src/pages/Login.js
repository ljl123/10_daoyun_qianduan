import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import './Login.css';
import { setToken, setType } from '../utils/auth';
import { Redirect } from 'react-router-dom';
import { loginApi } from '../services/auth';
import { hex_md5 } from '../utils/md5';
import { setEmail, setPwd, getPwd, getUser, setUser } from '../utils/auth';

function Login(props) {
    //const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();
    useEffect(() => {
        var username = getUser();
        var pwd = getPwd();
        // console.log(username);
        // console.log(pwd);
        if (username && pwd) {
            form.setFieldsValue({
                username: username,
                password: pwd
            });
        }

    }, []);

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish = values => {
        loginApi({
            username: values.username,
            password: hex_md5(values.password),
        })
            .then(res => {
                if (res.result_code == 200) {
                    if (res.data.type == 3) {
                        message.error("无权限登录！");
                    } else {
                        message.success("登录成功");
                    }
                    console.log(values)
                    if (values.remember == true) {
                        //console.log('1');
                        setUser(values.username);
                        setPwd(values.password);
                    }
                    //setToken(res.data.token);
                    setEmail(res.data.email);
                    // setPwd(hex_md5(values.password));
                    setType(res.data.type)
                    window.localStorage.setItem("userInfo", JSON.stringify(res.data));
                    //localStorage.setItem("email", res.data.email);
                    //localStorage.setItem("email_pwd", values.password);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("type", res.data.type);
                    localStorage.setItem("uid", res.data.uid);
                    if (res.data.type == 1) {
                        props.history.push("/admin");
                    }
                    if (res.data.type == 2) {
                        props.history.push("/admin/params");
                    }

                } else {
                    message.info('请确认用户名/密码正确！');
                }
            })
            .catch(err => {
                console.log(err);
                message.error("用户不存在");
            });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (

        <Card title="用户登录" className="login-form">
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
                form={form}
            >
                <Form.Item
                    label="账号"
                    name="username"
                    rules={[{ required: true, message: '请输入账号!' }]}
                >
                    <Input placeholder="用户名/邮箱/手机号" />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Form.Item {...tailLayout} name="remember" valuePropName="checked" noStyle>
                        <Checkbox >记住我</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="./#/help" style={{ margin: "0 3rem" }}>
                        帮助
                    </a>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        登录
        </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default Login
