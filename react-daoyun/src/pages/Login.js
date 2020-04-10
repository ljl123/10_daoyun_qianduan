import React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import './Login.css';
import { setToken } from '../utils/auth';
import { Redirect } from 'react-router-dom';

function Login(props) {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish = values => {
        console.log('Success:', values);
        setToken(values.username);
        props.history.push("/admin");
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Card title="用户登录" className="login-form">
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout} name="remember" valuePropName="checked" >
                    <Checkbox>记住我</Checkbox>
                </Form.Item>
                {/* <a className="login-form-forgot" href="./#/forgotPwd">
                    Forgot password
                    </a> */}

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
