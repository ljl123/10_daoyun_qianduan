import React from 'react';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import './Login.css';

function Help(props) {

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    return (
        <div className="bg">
            <Card title="帮助" className="login-form"
                extra={
                    <Button

                        size="small"
                        onClick={() => { props.history.push('/admin') }}
                    >
                        返回
        </Button>
                }>
                <Form >
                    <Form.Item>
                        <h3>2020工程训练第10小组作品</h3>
                        <h3 style={{ color: "blue" }}>初始管理员登录：</h3>
                        <h3>用户名：admin/15900000001/497409212@qq.com</h3>
                        <h3>密码：123456</h3>
                        <h4 style={{ color: "red" }}>如遇问题（如：忘记密码，系统崩溃）请联系我们：18xxxxxxxxx</h4>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Help
