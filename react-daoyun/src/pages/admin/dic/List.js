import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Modal, message } from 'antd';
import { initDic, getDicInfoById } from '../../../utils/data';
import { getDictTypes, getDictInfos, deleteType, deleteDictInfo } from "../../../services/dict";


function List(props) {

    const [dataSource, setDataSource] = useState([]);
    const [dataInfoSource, setDataInfoSource] = useState([]);
    let [typeid, setTypeid] = useState('');

    useEffect(() => {
        getTypes();
    }, []);

    function getTypes() {
        let params = {
            token: window.localStorage.getItem("token"),
        }
        getDictTypes(params).then((res) => {
            if (res.result_code == 200) {
                setDataSource(res.data);
            } else {
                message.error(res.result_desc)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    function getTypeInfo(typeid) {
        let params = {
            token: window.localStorage.getItem("token"),
            typeid,
        }
        getDictInfos(params).then((res) => {
            if (res.result_code == 200) {
                setDataInfoSource(res.data);
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
        title: '中文',
        dataIndex: 'typenameChinese'
    }, {
        title: '英文',
        dataIndex: 'typenameEnglish'
    }, {
        title: '描述',
        dataIndex: 'description'
    }, {
        title: '操作',
        render: (txt, record, index) => {
            return (
                <div>

                    <Button type="primary" size="small"
                        onClick={(e) => {
                            var path = "/admin/dic/edit/" + record.typeid;
                            props.history.push({ pathname: path, query:{record : record } });
                            e.stopPropagation();
                        }}>修改</Button>
                    <Popconfirm
                        title="确定删除此项？"
                        onCancel={(e) => e.stopPropagation()}
                        onConfirm={(e) => {
                            e.stopPropagation();
                            // if (delUserById(record.id)) {       //删除API
                            //     message.success('删除成功！');
                            //     window.location.reload(true);
                            // } else {
                            //     message.error('删除失败！');
                            // }
                            let params = {
                                token: window.localStorage.getItem("token"),
                                typeid: record.typeid,
                            }
                            deleteType(params).then((res) => {
                                if (res.result_code == 200) {
                                    message.success('删除成功！');
                                    getTypes();
                                    setDataInfoSource([])
                                } else {
                                    message.error('删除失败！');
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        }}
                    >
                        <Button style={{ margin: "0 1rem" }} onClick={(e) => e.stopPropagation()} type="danger" size="small">删除</Button>
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
        dataIndex: 'id'
    }, {
        title: '文本',
        dataIndex: 'info'
    }, {
        title: '默认值',
        dataIndex: 'typestate'
    }, {
        title: '操作',
        render: (txt, record, index) => {
            return (
                <div>

                    <Button type="primary" size="small" 
                        onClick={(e) => {
                            var path = "/admin/dic/infoedit/" + record.id;
                            props.history.push({ pathname: path, query:{record : record } });
                            e.stopPropagation();
                        }}> 修改 </Button>
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
                            let params = {
                                token: window.localStorage.getItem("token"),
                                infoid: record.id,
                            }
                            deleteDictInfo(params).then((res) => {
                                if (res.result_code == 200) {
                                    message.success('删除成功！');
                                    getTypeInfo(typeid);
                                } else {
                                    message.error('删除失败！');
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
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
                            getTypeInfo(record.typeid);
                            setTypeid(record.typeid);
                        }, // 点击行
                    };
                }} />
            <Button
                type="primary"
                size="small"
                onClick={() =>{
                    if ( !typeid ) {
                        message.error("请选择主字典管理")
                        return;
                    }
                    props.history.push({ pathname: "/admin/dic/infoedit", query: { typeid } })
                }}
                style={{ margin: "1rem 0" }}
            >
                新增
                </Button>
            <Table rowKey="id" columns={columns2} bordered dataSource={dataInfoSource} />
        </Card>
    )
}

export default List

