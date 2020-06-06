import React from 'react';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import './Login.css';
import { setToken, setType } from '../utils/auth';
import { Redirect } from 'react-router-dom';
import { loginApi } from '../services/auth';

function Login(props) {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish = values => {
        console.log('Success:', values);
        setToken(values.username);
        props.history.push("/admin");
        // loginApi({
        //     userName: values.username,
        //     password: values.password
        // })
        //     .then(res => {
        //         //console.log(res);
        //         if (res.code === "success") {
        //             message.success("登录成功");
        //             setToken(res.token);
        //             setType(res.type)
        //             props.history.push("/admin");
        //         } else {
        //             message.info(res.message);
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         message.error("用户不存在");
        //     });
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
