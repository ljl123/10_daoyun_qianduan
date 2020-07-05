import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, message } from 'antd';
import { initRole, delRoleById } from '../../../utils/data';

function List(props) {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        var data = initRole();
        //console.log('data', data);
        setDataSource(data);
    }, []);
    const columns = [{
        title: '序号',
        key: 'id',
        width: 80,
        align: 'center',
        render: (txt, record, index) => index + 1
    }, {
        title: '角色',
        dataIndex: 'role'
    }, {
        title: '权限',
        dataIndex: 'authority'
    }, {
        title: '操作',
        render: (txt, record, index) => {
            return (
                <div>
                    <Button type="primary" size="small"
                        onClick={() => {
                            var path = "/admin/role/edit/" + record.id;
                            props.history.push(path);

                        }}>修改</Button>
                    <Popconfirm
                        title="确定删除此项？"
                        onCancel={() => console.log("用户取消删除")}
                        onConfirm={() => {
                            if (delRoleById(record.id)) {
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
            title="角色权限"
            extra={
                <Button
                    type="primary"
                    size="small"
                    onClick={() => props.history.push("/admin/role/edit")}
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
