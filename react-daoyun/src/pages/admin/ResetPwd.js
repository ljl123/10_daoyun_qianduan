import React from 'react'
import { getToken, getEmail,getPwd } from '../../utils/auth';
import { modifyPwdApi } from '../../services/password';
import { hex_md5 } from '../../utils/md5';
import { setEmail, setPwd } from '../../utils/auth';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Card
} from 'antd';
import '../Login.css';

function ResetPwd() {
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const [form] = Form.useForm();

    const onFinish = values => {
        let token= getToken("token");
        let email= getEmail("email");
        let old_pwd= getPwd("pwd");
        console.log("email"+email);
        console.log("old_pwd"+old_pwd);
        let new_pwd=values.password;
        modifyPwdApi(token, email,old_pwd,new_pwd).then((res)=>{
            if(res.data.result_code === '200'){
                setPwd(hex_md5(new_pwd));          
            }
        })
    };

    return (

        <Card title="修改密码" className="reset-form">
            <Form
                {...formItemLayout}
                form={form}
                name="resetPwd"
                onFinish={onFinish}

                scrollToFirstError
            >


                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('两次密码不一致！');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        提交
                 </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default ResetPwd
