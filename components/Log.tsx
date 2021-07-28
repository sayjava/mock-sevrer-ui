import React, { useState } from 'react'
import { Row, Col, Descriptions, Switch, Card, Empty } from 'antd'
import { Log } from '../lib/logs'

import { UnControlled as CodeMirror } from 'react-codemirror2'

const mapKeyValuesToArray = (values) => {
    return Object.entries(values).map(([key, value]) => {
        return { key, value }
    })
}

const KeyValues = ({ values = {}, title }) => {
    const original = mapKeyValuesToArray(values)
    const compact = original.slice(0, 5)
    const overflow = compact.length < original.length

    const [showAll, setState] = useState(!overflow)
    const showToggle = overflow ? <Switch
        checkedChildren="Compact"
        unCheckedChildren="Show All"
        checked={showAll}
        onChange={() => setState(!showAll)} /> : null

    const descs = showAll ? original : compact


    if (original.length === 0) {
        return null
    }

    return <Descriptions bordered size="small" extra={showToggle} title={title}>
        {descs.map(v => <Descriptions.Item label={v.key} key={v.key} span={3}>{v.value}</Descriptions.Item>)}
    </Descriptions>

}

const JSONBody = ({ body }) => {

    if (!body) {
        return null
    }

    return <Card>
        <CodeMirror
            value={JSON.stringify(body, null, 2)}
            options={{
                mode: 'json',
                theme: 'material',
                lineNumbers: true
            }}
        />
    </Card>
}

export default ({ log }: { log: Log }) => {
    let response;
    const { request } = log

    if (log.proxy) {
        response = <Card title="Proxy Response">
            <KeyValues values={log.proxy.headers} title="" />
            <JSONBody body={log.proxy.body} />
        </Card>
    } else if (log.expectation) {
        response = <Card title="Matched Expectation">
            <KeyValues values={log.expectation.httpResponse.headers} title="Headers" />
            <JSONBody body={log.expectation.httpResponse.body} />
        </Card>
    } else {
        response = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No  Matched Expectation" />
    }

    return <div style={{ width: "100%" }}>
        <Row style={{ width: "100%", padding: "0 10px" }}>
            <Col span={12}>
                <Card title={`${request.method} : ${request.path}`}>
                    <KeyValues values={request.headers} title="Headers" />
                    <KeyValues values={request.cookies} title="Cookies" />
                    <KeyValues values={request.queryStringParameters} title="Query Params" />
                    <KeyValues values={request.pathParameters} title="Path Params" />
                    <JSONBody body={request.body} />
                </Card>
            </Col>
            <Col span={12}>
                {response}
            </Col>
        </Row>
    </div>
}