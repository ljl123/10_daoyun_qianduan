import React, { useEffect, useState } from 'react';
import { Tree, Card, Button, message, Popconfirm } from 'antd';
import { initMenu } from '../../../utils/data';
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


    const onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeys);
        //console.log(selectedKeys);
    };
    return (
        <Card
            title="菜单管理"

        >
            <Button
                type="primary"
                size="small"
                style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                onClick={() => {
                    // if (selectedKeys.length) {
                    //     var path = "/admin/structure/new/" + selectedKeys;
                    //     props.history.push(path);
                    // } else {
                    //     message.error('未选择！');
                    // }
                }} >

                新增
                </Button>
            <Button
                type="primary"
                size="small"
                style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                onClick={() => {
                    // //console.log(selectedKeys.length);
                    // if (selectedKeys.length) {
                    //     var path = "/admin/structure/edit/" + selectedKeys;
                    //     props.history.push(path);
                    // } else {
                    //     message.error('未选择！');
                    // }

                }}
            >
                修改
        </Button>
            <Popconfirm
                title="确定删除此项？"
                onCancel={() => console.log("用户取消删除")}
                onConfirm={() => {
                    // // console.log(selectedKeys[0]);
                    // // console.log(delStructureById(selectedKeys[0]));
                    // if (delStructureById(selectedKeys[0])) {
                    //     message.success('删除成功！');
                    //     window.location.reload(true);
                    // } else {
                    //     message.error('删除失败！');
                    // }
                }}
            >
                <Button style={{ marginLeft: "1rem", marginBottom: "1rem" }} type="danger" size="small">删除</Button>
            </Popconfirm>
            <Tree
                autoExpandParent={autoExpandParent}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={dataSource}
            />

        </Card>
    )
}

export default List
