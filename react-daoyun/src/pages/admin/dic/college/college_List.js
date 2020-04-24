import React from 'react'
import { Card, Table, Button, Popconfirm } from 'antd'

const dataSource = [{
    id: 1,
    value: '0',
    texture: '请选择',
    isDefault: 'true'
}, {
    id: 2,
    value: '1',
    texture: '福州大学',
    isDefault: 'false'
}, {
    id: 3,
    value: '2',
    texture: '福建师范大学',
    isDefault: 'false'

},
];
function college_List(props) {
    const columns = [{
        title: '序号',
        key: 'id',
        width: 80,
        align: 'center',
        render: (txt, record, index) => index + 1
    }, {
        title: '值',
        dataIndex: 'value'
    }, {
        title: '文本',
        dataIndex: 'texture'
    }, {
        title: '默认值',
        dataIndex: 'isDefault'
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
            title="学校"
            extra={
                <Button
                    type="primary"
                    size="small"
                    onClick={() => props.history.push("/admin/dic/college/edit")}
                >
                    新增
                </Button>
            }
        >
            <Table rowKey="id" columns={columns} bordered dataSource={dataSource} />
        </Card>
    )
}

export default college_List
