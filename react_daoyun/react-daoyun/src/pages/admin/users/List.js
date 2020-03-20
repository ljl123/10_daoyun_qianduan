import React from 'react';
import { Card, Table, Button, Popconfirm } from 'antd'

const dataSource = [{
    id: 1,
    phone: '18000000000',
    email: '123@123.com',
    name: 'zxc'
}, {
    id: 2,
    phone: '13800000000',
    email: '',
    name: 'aaa'
}, {
    id: 3,
    phone: '18900000000',
    email: '',
    name: 'zzz',

},
];

function List(props) {
    const columns = [{
        title: '序号',
        key: 'id',
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
        dataIndex: 'name'
    }, {
        title: '操作',
        render: (txt, record, index) => {
            return (
                <div>
                    <Button type="primary" size="small">修改</Button>
                    <Popconfirm
                        title="确定删除此项？"
                        onCancel={() => console.log("用户取消删除")}
                        onConfirm={() => {
                            console.log("用户确认删除"); //调用api
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
            <Table columns={columns} bordered dataSource={dataSource} />
        </Card>
    )
}

export default List
