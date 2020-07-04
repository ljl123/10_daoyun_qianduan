import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, message } from 'antd';
import { CreateCourseApi, getCourseInfo, modifyCourse, createCourse } from '../../../services/course'

function Edit(props) {
    const [currentData, setCurrentData] = useState({});
    const [form] = Form.useForm();
    let { match: { params: { id } } } = props;
    useEffect(() => {
        if (props.match.params.id) {
            console.log(props.match.params.id)
            // setCurrentData(props.location.query.record);
            // form.setFieldsValue(props.location.query.record);
            let params = {
                token: window.localStorage.getItem("token"),
                course_id: props.match.params.id,
            }
            getCourseInfo(params).then((res) => {
                if (res.result_code == 200) {
                    // console.log(res);
                    // console.log(res.data.course_name);
                    form.setFieldsValue({
                        course_name: res.data.course_name,
                        place: res.data.place,
                        time: res.data.time,
                        teacher: res.data.teacher,
                        stu_count: res.data.stu_count,
                    });
                } else {
                    message.error(res.result_desc)
                }
            }).catch((err) => {
                console.log(err);
            })
        }

        // if (id) {
        //     let params = {
        //         course_id: id,
        //         token: window.localStorage.getItem("token")
        //     }
        //     getCourseInfo(params).then((res) => {
        //         if (res.result_code == 200) {
        //             setCurrentData(res.data);
        //             form.setFieldsValue(res.data)
        //         } else {
        //             message.error(res.result_desc)
        //         }
        //     }).catch((err) => {
        //         console.log(err);
        //     })
        //     //var data = getUserById(props.match.params.id);      //修改功能，获取选中课程信息API
        //     // console.log(data);
        //     // setCurrentData(data);
        //     // form.setFieldsValue({
        //     //     lesson: data.lesson,
        //     //     name: data.name,
        //     //     teacher: data.teacher
        //     // });
        // } else {
        //     // form.setFieldsValue({
        //     //     gender: '未知',
        //     //     role: '学生'
        //     // });
        // }

    }, []);

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        required: '信息不能为空!',

    };


    const onFinish = values => {
        let token = localStorage.getItem("token");
        let uid = localStorage.getItem("uid");
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
            /*
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
            */
            CreateCourseApi(token, values.course_name, values.place, values.time, values.teacher, values.stu_count, uid).then((res) => {
                if (res.data.result_code === '200') {
                    console.log("success add!");
                    message.success('添加成功!');
                    props.history.push("/admin/lesson")
                }
                else {
                    message.success('添加失败!')
                }
            })
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
            <Form {...layout} name="lessonEdit" onFinish={onFinish} form={form}>
                <Form.Item name="course_name" label="课程名称" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="place" label="上课地点" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="time" label="时间" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="teacher" label="任课教师" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="stu_count" label="学生人数" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                {/* <Form.Item name="location" label="坐标" rules={[{ required: true }]}>
                    <Input />
                </Form.Item> */}
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Edit