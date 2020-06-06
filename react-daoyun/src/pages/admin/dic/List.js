import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Modal, message } from 'antd';
import { initDic, getDicInfoById } from '../../../utils/data';


function List(props) {

    const [dataSource, setDataSource] = useState([]);
    const [dataInfoSource, setDataInfoSource] = useState([]);

    useEffect(() => {
        var data = initDic();   //初始化列表API
        //console.log(data);
        setDataSource(data);
    }, []);

    const columns = [{
        title: '序号',
        key: 'id',
        width: 80,
        align: 'center',
        render: (txt, record, index) => index + 1
    }, {
        title: '中文',
        dataIndex: 'ch'
    }, {
        title: '英文',
        dataIndex: 'en'
    }, {
        title: '描述',
        dataIndex: 'describe'
    }, {
        title: '操作',
        render: (txt, record, index) => {
            return (
                <div>

                    <Button type="primary" size="small"
                        onClick={() => {
                            var path = "/admin/dic/edit/" + record.id;
                            props.history.push(path);
                            //console.log(record.id);
                        }}>修改</Button>
                    <Popconfirm
                        title="确定删除此项？"
                        onCancel={() => console.log("用户取消删除")}
                        onConfirm={() => {
                            // if (delUserById(record.id)) {       //删除API
                            //     message.success('删除成功！');
                            //     window.location.reload(true);
                            // } else {
                            //     message.error('删除失败！');
                            // }
                        }}
                    >
                        <Button style={{ margin: "0 1rem" }} type="danger" size="small">删除</Button>
                    </Popconfirm>
                </div >
            );
        }
    }
    ];

    const columns2 = [{
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

                    <Button type="primary" size="small"  > 修改 </Button>
                    <Popconfirm
                        title="确定删除此项？"
                        onCancel={() => console.log("用户取消删除")}
                        onConfirm={() => {
                            // if (delUserById(record.id)) {       //删除详情API
                            //     message.success('删除成功！');
                            //     window.location.reload(true);
                            // } else {
                            //     message.error('删除失败！');
                            // }
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
            title="字典管理"
            extra={
                <Button
                    type="primary"
                    size="small"
                    onClick={() => props.history.push("/admin/dic/edit")}
                >
                    新增
                </Button>
            }
        >
            <Table rowKey="id" columns={columns} bordered dataSource={dataSource}
                onRow={record => {
                    return {
                        onClick: event => {
                            var data = getDicInfoById(record.id)    //获取详情API
                            setDataInfoSource(data)
                            //console.log(data)
                        }, // 点击行
                    };
                }} />
            <Button
                type="primary"
                size="small"
                onClick={() => props.history.push("/admin/dic/infoedit")}
                style={{ margin: "1rem 0" }}
            >
                新增
                </Button>
            <Table rowKey="id" columns={columns2} bordered dataSource={dataInfoSource} />
        </Card>
    )
}

export default List

