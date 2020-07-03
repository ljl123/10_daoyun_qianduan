import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, message } from 'antd'
import { getCourseList, deleteCourse } from '../../../services/course'

// const dataSource = [{
//     id: 1,
//     lesson: '123',
//     name: '工程训练',
//     college: '福大/计算机'
// }
// ];

function List(props) {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        // var data = initUsers();  API
        // console.log(data);
        // setDataSource(data);

        getCourse();

    }, []);


    function getCourse() {
        let params = {
            token: window.localStorage.getItem("token")
        }
        getCourseList(params).then((res) => {
            if (res.result_code == 200) {
                setDataSource(res.data);
            } else {
                message.error(res.result_desc)
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    const columns = [{
        title: '序号',
        key: 'id',
        width: 80,
        align: 'center',
        render: (txt, record, index) => index + 1
    }, {
        title: '课程号',
        dataIndex: 'course_id',
        key: 'course_id'
    }, {
        title: '课程名',
        dataIndex: 'course_name',
        key: 'course_name'
    }, {
        title: '任课教师',
        dataIndex: 'teacher',
        key: 'teacher'
    }, {
        title: '操作',
        render: (txt, record, index) => {
            return (
                <div>
                    <Button type="primary" size="small"
                        onClick={() => {
                            var path = "/admin/lesson/edit/" + record.course_id;
                            props.history.push(path);
                            //console.log(record.id);
                        }}>修改</Button>
                    <Popconfirm
                        title="确定删除此项？"
                        onCancel={() => console.log("用户取消删除")}
                        onConfirm={() => {
                            // if (delUserById(record.id)) {       api 
                            //     message.success('删除成功！');
                            //     window.location.reload(true);
                            // } else {
                            //     message.error('删除失败！');
                            // }
                            let params = {
                                token: window.localStorage.getItem("token"),
                                type: 3,
                                course_id: record.course_id,
                            }
                            deleteCourse(params).then((res) => {
                                if (res.result_code == 200) {
                                    message.success("删除成功");
                                    getCourse();
                                } else {
                                    message.error(res.result_desc)
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        }}
                    >
                        <Button style={{ margin: "0 1rem" }} type="danger" size="small">删除</Button>
                    </Popconfirm>
                </div>
            );
        }
    }
    ];
    return (
        <Card
            title="课程列表"
            extra={
                <Button
                    type="primary"
                    size="small"
                    onClick={() => props.history.push("/admin/lesson/edit")}
                >
                    新增
                </Button>
            }
        >
            <Table rowKey="id" columns={columns} bordered dataSource={dataSource} />
        </Card>
    )
}

export default List
