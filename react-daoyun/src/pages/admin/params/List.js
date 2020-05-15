import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, message } from 'antd';
import { initParams, delParamById } from '../../../utils/data';

function List(props) {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        var data = initParams();
        console.log(data);
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
        dataIndex: 'Chinese'
    }, {
        title: '英文',
        dataIndex: 'English'
    }, {
        title: '默认值',
        dataIndex: 'value'
    }, {
        title: '操作',
        render: (txt, record, index) => {
            return (
                <div>
                    <Button type="primary" size="small"
                        onClick={() => {
                            var path = "/admin/params/edit/" + record.id;
                            props.history.push(path);
                            //console.log(record.id);
                        }}>修改</Button>


                </div>
            );
        }
    }
    ];
    return (
        <Card
            title="系统参数"

        >
            <Table rowKey="id" columns={columns} bordered dataSource={dataSource} />
        </Card>
    )
}

export default List
