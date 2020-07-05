import React from 'react';
import { Result, Button } from 'antd';

function NoAuth(props) {
    return (
        <Result
            status="403"
            title="403"
            subTitle="您没有该操作权限"
            extra={<Button type="primary" onClick={p => props.history.push('/admin/params')}>返回</Button>}
        />
    )
}

export default NoAuth
