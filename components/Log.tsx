import React from 'react'
import { Row, Col, Card, Empty } from 'antd'
import JSONBody from './JSONBody'
import KeyValues from './KeyValues'
import { Log } from '../lib/logs'


const Response = ({ title, headers, body }) => {
    return <Card title={title}>
        <KeyValues values={headers} title="" />
        <JSONBody body={body} />
    </Card>
}

export default ({ log }: { log: Log }) => {
    let response;
    const { request } = log

    if (log.proxy) {
        response = <Response title="Proxy Response" headers={log.proxy.headers} body={log.proxy.body} />
    } else if (log.expectation) {
        response = <Response title="Matched Expectation" headers={log.expectation.httpResponse.headers} body={log.expectation.httpResponse.body} />
    } else {
        response = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No  Matched Expectation" />
    }

    return <div style={{ width: "100%" }}>
        <Row style={{ width: "100%" }}>
            <Col span={12} style={{ padding: "0 5px" }}>
                <Card title={`${request.method} : ${request.path}`}>
                    <KeyValues values={request.headers} title="Headers" />
                    <KeyValues values={request.cookies} title="Cookies" />
                    <KeyValues values={request.queryStringParameters} title="Query Params" />
                    <KeyValues values={request.pathParameters} title="Path Params" />
                    <JSONBody body={request.body} />
                </Card>
            </Col>
            <Col span={12} style={{ padding: "0 10px" }}>{response}</Col>
        </Row>
    </div>
}