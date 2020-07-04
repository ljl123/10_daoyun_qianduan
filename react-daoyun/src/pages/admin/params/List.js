import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, message } from 'antd';
import { get,set,initParams } from '../../../utils/data';
import { setToken, getToken } from '../../../utils/auth';
import { getParamApi } from '../../../services/params';

const paramsList = 'paramsList';
export function getParams(){
    let token= getToken("token");
    // set(paramsList, []);
    let param_list=[];
    getParamApi(token).then((res)=>{
        if(res.data.result_code === '200'){
            console.log("success get params list!");
            for (let i = 0; i < res.data.data.length; i++) {
                let dataInfo1 = {
                    id: 1,
                    chinese:"经验值",
                    english: "experience",
                    value: res.data.data[i].experience
                };
                let dataInfo2 = {
                    id: 2,
                    chinese:"距离",
                    english: "distance",
                    value: res.data.data[i].distance
                };
                param_list.push(dataInfo1);
                param_list.push(dataInfo2);
                set(paramsList, param_list);   
            }
        }
        else if(res.data.result_code === '206'){
            console.log("token time out!");
            message.error("token time out!");
        }else{
            console.log(res.data);
        }
    })
}

function List(props) {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        getParams();
        var data = initParams();
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
        dataIndex: 'chinese'
    },{
        title: '英文',
        dataIndex: 'english'
    }, {
        title: '值',
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
