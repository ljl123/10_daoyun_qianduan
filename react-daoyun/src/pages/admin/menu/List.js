import React, { useEffect, useState } from 'react';
import { Tree, Card, Button, message, Popconfirm, Form, Input } from 'antd';
import { initMenu, modifyMenuById, delMenuById } from '../../../utils/data';
const { TreeNode } = Tree;

function List(props) {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        var data = initMenu();
        console.log(data);
        setDataSource(data);
    }, []);

    //const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    // const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [form] = Form.useForm();

    const onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeys);
        //console.log(selectedKeys);
        form.setFieldsValue({
            title: info.node.title,
            url: info.node.url
        });
    };

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
        style: { float: "right", width: "60%" }
    };
    const validateMessages = {
        required: '信息不能为空!',


    };

    const onFinish = values => {
        if (selectedKeys[0]) {
            if (modifyMenuById(selectedKeys[0], values)) {
                message.success('修改成功！');
                window.location.reload(true);
            } else {
                message.error('修改失败！');
            }
        } else {
            message.error('未选择！');
        }
    };

    return (
        <Card
            title="菜单管理"
            extra={
                <h5 style={{ color: "red" }}>菜单谨慎修改，操作崩溃请联系专员</h5>
            }
        >
            <Button
                type="primary"
                size="small"
                style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                onClick={() => {
                    if (selectedKeys.length) {
                        var path = "/admin/menu/edit/" + selectedKeys;
                        props.history.push(path);
                    } else {
                        message.error('未选择！');
                    }
                }} >

                新增
                </Button>

            <Popconfirm
                title="确定删除此项？"
                onCancel={() => console.log("用户取消删除")}
                onConfirm={() => {
                    if (delMenuById(selectedKeys[0])) {
                        message.success('删除成功！');
                        window.location.reload(true);
                    } else {
                        message.error('删除失败！');
                    }
                }}
            >
                <Button style={{ marginLeft: "1rem", marginBottom: "1rem" }} type="danger" size="small">删除</Button>
            </Popconfirm>
            <Tree style={{ float: "left" }}
                autoExpandParent={autoExpandParent}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={dataSource}
            />
            <Form {...layout} name="structureEdit" onFinish={onFinish} validateMessages={validateMessages} form={form}>
                <Form.Item name="title" label="菜单名" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="url" label="url" >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                    <Button type="primary" htmlType="submit">修改</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default List
