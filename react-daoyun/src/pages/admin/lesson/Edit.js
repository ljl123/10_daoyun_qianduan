import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, message } from 'antd';
import { getCourseInfo, modifyCourse, createCourse } from '../../../services/course'

function Edit(props) {
    const [currentData, setCurrentData] = useState({});
    const [form] = Form.useForm();
    let { match: { params: { id } } } = props;
    useEffect(() => {
        if (id) {
            let params = {
                course_id: id,
                token: window.localStorage.getItem("token")
            }
            getCourseInfo(params).then((res) => {
                if (res.result_code == 200) {
                    setCurrentData(res.data);
                    form.setFieldsValue(res.data)
                } else {
                    message.error(res.result_desc)
                }
            }).catch((err) => {
                console.log(err);
            })
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
            let params = {
                course_id: id,
                ...values,
                token: window.localStorage.getItem('token')
            }
            modifyCourse(params).then((res) => {
                if (res.result_code == 200) {
                    message.success('修改成功！');
                    props.history.push('/admin/lesson');
                } else {
                    message.error('修改失败！');
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            // if (insertUser(values)) {                   //新建课程API
            //     message.success('添加课程成功！');
            //     props.history.push('/admin/lesson');
            // } else {
            //     message.error('添加课程失败！');
            // }
            let userInfo = window.localStorage.getItem("userInfo");
            if ( userInfo ) {
                userInfo = JSON.parse(userInfo);
                let params = {
                    token: userInfo.token,
                    uid: userInfo.uid,
                    ...values,
                }
                createCourse(params).then((res) => {
                    if (res.result_code == 200) {
                        message.success('添加课程成功！');
                        props.history.push('/admin/lesson');
                    } else {
                        message.error('添加课程失败！');
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
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
            <Form {...layout} form={form} name="userEdit" onFinish={onFinish}>
                <Form.Item name="course_id" label="课程号" rules={[{ required: true, message: '请输入课程号' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="course_name" label="课程名" rules={[{ required: true, message: '请输入课程名' }]}>
                    <Input value={currentData.course_name} />
                </Form.Item>
                <Form.Item name="teacher" label="任课教师" rules={[{}]}>
                    <Input value={currentData.teacher} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Edit
