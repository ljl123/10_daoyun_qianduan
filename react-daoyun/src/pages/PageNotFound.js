import React from 'react';
import { Result, Button } from 'antd';

function PageNotFound(props) {
    return (
        <Result
            status="404"
            title="404"
            subTitle="您访问的页面不存在"
            extra={<Button type="primary" onClick={p => props.history.push('/admin')}>返回</Button>}
        />
    )
}

export default PageNotFound
