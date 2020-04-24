import React from 'react'
import { Card, Table, Button, Popconfirm, Modal } from 'antd'

const dataSource = [{
    id: 1,
    value: '0',
    texture: '未知',
    isDefault: 'true'
}, {
    id: 2,
    value: '1',
    texture: '男',
    isDefault: 'false'
}, {
    id: 3,
    value: '2',
    texture: '女',
    isDefault: 'false'

},
];
function info() {
    Modal.info({
        title: '详情',
        content: (
            <div>
                <p>序号：2</p>
                <p> 值：1</p>
                <p>文本：男</p>
                <p>默认值：false</p>
            </div>
        ),
        onOk() { },
    });
}
function gender_List(props) {


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
                    <Button type="primary" size="small" onClick={info}>详情</Button>

                    <Button type="primary" size="small" style={{ marginLeft: "1rem" }} > 修改 </Button>
                    <Popconfirm
                        title="确定删除此项？"
                        onCancel={() => console.log("用户取消删除")}
                        onConfirm={() => {
                            console.log("用户确认删除"); //调用api
                        }}
                    >
                        <Button style={{ margin: "0 1rem" }} type="danger" size="small">删除</Button>
                    </Popconfirm>
                </div >
            );
        }
    }
    ];
    return (
        <Card
            title="性别"
            extra={
                <Button
                    type="primary"
                    size="small"
                    onClick={() => props.history.push("/admin/dic/gender/edit")}
                >
                    新增
                </Button>
            }
        >
            <Table rowKey="id" columns={columns} bordered dataSource={dataSource} />
        </Card>
    )
}

export default gender_List

