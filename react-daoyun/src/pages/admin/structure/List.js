import React, { useEffect, useState } from 'react';
import { Tree, Card, Button, message, Popconfirm } from 'antd';
import { initStructure, delStructureById } from '../../../utils/data';
const { TreeNode } = Tree;

// const treeData = [
//     {
//         title: '学校/学院/专业',
//         key: '0',
//         children: [
//             {
//                 title: '福州大学',
//                 key: '00',
//                 children: [
//                     {
//                         title: '数学与计算机科学学院',
//                         key: '000',
//                         children: [
//                             { title: '数学专业', key: '0000' },
//                             { title: '信息与计算科学专业', key: '0001' },
//                             { title: '计算机科学专业', key: '0002' },
//                             { title: '信息安全与网络工程专业', key: '0003' },
//                             { title: '软件工程专业', key: '0004' },
//                         ]
//                     },
//                     {
//                         title: '电气工程与自动化学院',
//                         key: '001',
//                         children: [
//                             { title: '电气工程专业', key: '0010' },
//                             { title: '电力工程专业', key: '0011' },
//                             { title: '建筑电气专业', key: '0012' },
//                             { title: '自动化专业', key: '0013' },
//                             { title: '应用电子专业', key: '0014' },
//                         ]
//                     },
//                     {
//                         title: '机械工程及自动化学院',
//                         key: '002',
//                         children: [
//                             { title: '机械设计专业', key: '0020' },
//                             { title: '机电工程专业', key: '0021' },
//                             { title: '材料成型专业', key: '0022' },
//                             { title: '车辆工程专业', key: '0023' }
//                         ]
//                     },

//                 ],
//             },
//             {
//                 title: '福建师范大学',
//                 key: '01',
//                 children: [
//                     {
//                         title: '数学与信息学院',
//                         key: '010',
//                         children: [
//                             { title: '数学专业', key: '0100' },
//                             { title: '统计学专业', key: '0101' },
//                             { title: '计算机科学与技术专业', key: '0102' },
//                             { title: '软件工程专业', key: '0103' },
//                             { title: '网络空间安全专业', key: '0104' },
//                         ]
//                     }

//                 ],
//             },
//             {
//                 title: '福建工程学院',
//                 key: '02',
//             },
//         ],
//     }
// ];

function List(props) {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        var data = initStructure();
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
            title="组织结构"

        >
            <Button
                type="primary"
                size="small"
                style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                onClick={() => {
                    if (selectedKeys.length) {
                        var path = "/admin/structure/new/" + selectedKeys;
                        props.history.push(path);
                    } else {
                        message.error('未选择！');
                    }
                }} >

                新增
                </Button>
            <Button
                type="primary"
                size="small"
                style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                onClick={() => {
                    //console.log(selectedKeys.length);
                    if (selectedKeys.length) {
                        var path = "/admin/structure/edit/" + selectedKeys;
                        props.history.push(path);
                    } else {
                        message.error('未选择！');
                    }

                }}
            >
                修改
        </Button>
            <Popconfirm
                title="确定删除此项？"
                onCancel={() => console.log("用户取消删除")}
                onConfirm={() => {
                    // console.log(selectedKeys[0]);
                    // console.log(delStructureById(selectedKeys[0]));
                    if (delStructureById(selectedKeys[0])) {
                        message.success('删除成功！');
                        window.location.reload(true);
                    } else {
                        message.error('删除失败！');
                    }
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
