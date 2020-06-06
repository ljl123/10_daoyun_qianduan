import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, message } from 'antd';

function Edit(props) {
    console.log(props);
    const [currentData, setCurrentData] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        if (props.match.params.id) {
            //var data = getUserById(props.match.params.id);      //修改功能，获取选中课程信息API
            // console.log(data);
            // setCurrentData(data);
            // form.setFieldsValue({
            //     lesson: data.lesson,
            //     name: data.name,
            //     teacher: data.teacher
            // });
        } else {
            // form.setFieldsValue({
            //     gender: '未知',
            //     role: '学生'
            // });
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

        if (props.match.params.id) {
            // if (modifyUserById(props.match.params.id, values)) { //修改课程API
            //     message.success('修改成功！');
            //     props.history.push('/admin/lesson');
            // } else {
            //     message.error('修改失败！');
            // }
        } else {
            // if (insertUser(values)) {                   //新建课程API
            //     message.success('添加课程成功！');
            //     props.history.push('/admin/lesson');
            // } else {
            //     message.error('添加课程失败！');
            // }
        }
    };

    return (
        <Card title="课程编辑"
            extra={
                <Button

                    size="small"
                    onClick={() => { props.history.push('/admin/lesson') }}
                >
                    返回
            </Button>
            }>
            <Form {...layout} name="userEdit" onFinish={onFinish}>
                <Form.Item name="lesson" label="课程号" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="课程名" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="teacher" label="任课教师" rules={[{}]}>
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
