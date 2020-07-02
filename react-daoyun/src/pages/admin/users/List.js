import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, message } from 'antd';
import { initUsers, delUserById } from '../../../utils/data';
import { UserlistApi } from '../../../services/users';

function List(props) {
    /*const [dataSource, setDataSource] = useState([]); //本地测试
    useEffect(() => {
        var data = initUsers();  //获取用户列表API
        console.log(data);
        setDataSource(data);
    }, []);
    */
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        UserlistApi().then(res => {
            console.log(res);
        });
    }, []);

    const columns = [{
        title: '序号',
        key: 'uid',
        width: 80,
        align: 'center',
        render: (txt, record, index) => index + 1
    }, {
        title: '手机号',
        dataIndex: 'phone'
    }, {
        title: '邮箱',
        dataIndex: 'email'
    }, {
        title: '姓名',
        dataIndex: 'user'
    }, {
        title: '性别',
        dataIndex: 'gender'
    }, {
        title: '学院',
        dataIndex: 'idepartment'
    }, {
        title: '专业',
        dataIndex: 'profession'
    }, {
        title: '操作',
        render: (txt, record, index) => {
            return (
                <div>
                    <Button type="primary" size="small"
                        onClick={() => {
                            var path = "/admin/users/edit/" + record.id;
                            props.history.push(path);
                            //console.log(record.id);
                        }}>修改</Button>
                    <Popconfirm
                        title="确定删除此项？"
                        onCancel={() => console.log("用户取消删除")}
                        onConfirm={() => {
                            if (delUserById(record.id)) {   //删除用户API
                                message.success('删除成功！');
                                window.location.reload(true);
                            } else {
                                message.error('删除失败！');
                            }
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
                    onClick={() => props.history.push("/admin/users/edit")}
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
