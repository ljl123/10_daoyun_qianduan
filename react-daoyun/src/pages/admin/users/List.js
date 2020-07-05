import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, message } from 'antd';
import { initUsers, delUserById } from '../../../utils/data';
import { getUserList, delUser } from '../../../services/users'

function List(props) {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        // var data = initUsers();  //获取用户列表API
        // console.log(data);
        // setDataSource(data);

        getUsers();


    }, []);


    function getUsers() {
        //let token = localStorage.getItem("token");
        //let type_1 = localStorage.getItem("type");
        let params = {
            token: window.localStorage.getItem("token"),
            inter_type: '1',
        }
        getUserList(params).then((res) => {
            if (res.result_code == 200) {
                console.log(res.data);
                var dataList = res.data;
                var l = [];
                for (var i = 0; i < dataList.length; i++) {
                    if (dataList[i].type == 1) {
                        let user = {
                            uid: dataList[i].uid,
                            name: dataList[i].name,
                            phone: dataList[i].phone,
                            email: dataList[i].email,
                            stu_code: dataList[i].stu_code,
                            gender: dataList[i].gender,
                            type: '管理员'
                        };
                        l.push(user);

                    }
                    if (dataList[i].type == 2) {
                        let user = {
                            uid: dataList[i].uid,
                            name: dataList[i].name,
                            phone: dataList[i].phone,
                            email: dataList[i].email,
                            stu_code: dataList[i].stu_code,
                            gender: dataList[i].gender,
                            type: '教师'
                        };
                        l.push(user);

                    }
                }
                console.log(l);
                setDataSource(l);

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
        title: '姓名',
        dataIndex: 'name'
    }, {
        title: '手机号',
        dataIndex: 'phone'
    }, {
        title: '邮箱',
        dataIndex: 'email'
    }, {
        title: '学号/工号',
        dataIndex: 'stu_code'
    }, {
        title: '性别',
        dataIndex: 'gender'
    }, {
        title: '角色',
        dataIndex: 'type'
    }, {
        title: '操作',
        render: (txt, record, index) => {
            return (
                <div>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            var path = "/admin/users/edit/" + record.uid;
                            console.log(record.uid);
                            props.history.push({ pathname: path, query: { record: record } });
                        }}
                    >
                        修改
                </Button>

                    <Popconfirm
                        title="确定删除此项？"
                        onCancel={() => console.log("用户取消删除")}
                        onConfirm={() => {
                            // if (delUserById(record.id)) {   //删除用户API
                            //     message.success('删除成功！');
                            //     window.location.reload(true);
                            // } else {
                            //     message.error('删除失败！');
                            // }
                            // let type_2 = localStorage.getItem("type");
                            // let uid_1 = localStorage.getItem("uid");
                            let params = {
                                token: window.localStorage.getItem("token"),
                                inter_type: '3',
                                uid: record.uid,
                            }
                            delUser(params).then((res) => {
                                console.log(res)
                                if (res.result_code == '200') {
                                    message.success('删除成功！');
                                    window.location.reload(true);
                                    // getUsers();
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
            title="用户列表"
            extra={
                <Button
                    type="primary"
                    size="small"
                    onClick={() => props.history.push("/admin/users/new")}
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
