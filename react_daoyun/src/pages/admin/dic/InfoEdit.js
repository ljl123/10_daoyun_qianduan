import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, InputNumber, Radio, message } from 'antd'
import { modifyDictInfo, createDictInfo, getDictInfos } from "../../../services/dict";

function InfoEdit(props) {
    const [currentData, setCurrentData] = useState({});
    const [dataInfoSource, setDataInfoSource] = useState([]);
    const [form] = Form.useForm();
    useEffect(() => {
        //console.log(props.location.query.typeid)
        if (props.location.query)
            getTypeInfo(props.location.query.typeid);

        if (props.match.params.id && props.location.query) {
            //console.log(props.location.query.record.typeid)
            setCurrentData(props.location.query.record);
            form.setFieldsValue(props.location.query.record);
        } else {
        }

    }, []);


    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        required: '信息不能为空!',


    };
    function getTypeInfo(typeid) {
        let params = {
            token: window.localStorage.getItem("token"),
            typeid,
        }
        getDictInfos(params).then((res) => {
            if (res.result_code == 200) {
                setDataInfoSource(res.data);
                //console.log(res.data)

            } else {
                message.error(res.result_desc)
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const onFinish = values => {
        // for (var i = 0; i < dataInfoSource.length; i++) {
        //     console.log(dataInfoSource[i])
        // }
        var flag = true;
        if (values.typestate == 1) {
            for (var i = 0; i < dataInfoSource.length; i++) {
                if (dataInfoSource[i].typestate == 1) {
                    flag = false;
                    //console.log(flag)
                    break;
                }
            }
        }
        //console.log(flag)
        if (flag) {
            if (props.match.params.id) {
                let params = {
                    token: window.localStorage.getItem("token"),
                    ...values,
                    typeid: currentData.typeid,
                    //typeid: 3,
                    id: props.match.params.id,
                    //mvalue: values.id,
                }
                modifyDictInfo(params).then((res) => {
                    if (res.result_code == 200) {
                        message.success('修改成功！');
                        props.history.push('/admin/dic');
                    } else {
                        //console.log(res)
                        message.error('修改失败！');
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                let params = {
                    token: window.localStorage.getItem("token"),
                    ...values,
                    typeid: props.location.query.typeid,
                }
                createDictInfo(params).then((res) => {
                    if (res.result_code == 200) {
                        message.success('添加成功！');
                        props.history.push('/admin/dic');
                    } else {

                        message.error('添加失败！');
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        } else {
            message.error('默认值只能唯一！');
        }


    };

    return (
        <Card title="字典详情编辑"
            extra={
                <Button

                    size="small"
                    onClick={() => { props.history.push('/admin/dic') }}
                >
                    返回
        </Button>
            }>
            <Form {...layout} form={form} name="DicInfoEdit" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name="mvalue" label="值" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="info" label="文本" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="typestate" label="默认值" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value={1}>true</Radio>
                        <Radio value={0}>false</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default InfoEdit

