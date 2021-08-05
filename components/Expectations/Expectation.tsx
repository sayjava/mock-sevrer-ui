import { Card, Col, Divider, Row, Space, Tag, Typography } from 'antd'
import { Expectation } from '../../lib/logs'
import JSONBody from '../JSONBody'
import KeyValues from '../KeyValues'

interface Props {
    expectation: Expectation
}
export default ({ expectation }: Props) => {
    return <Card style={{ width: "100%" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
            <Row>
                <Col span={11} style={{ padding: "10px" }}>
                    <Space direction="horizontal" align="baseline">
                        <Tag color="blue">{expectation.httpRequest.method || "GET"}</Tag>
                        <Typography.Text title={expectation.httpRequest.path}>{expectation.httpRequest.path}</Typography.Text>
                    </Space>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <KeyValues values={expectation.httpRequest.pathParameters} title="Params" />
                        <KeyValues values={expectation.httpRequest.queryStringParameters} title="Query" />
                        <KeyValues values={expectation.httpRequest.cookies} title="Cookies" />
                        <KeyValues values={expectation.httpRequest.headers} title="Headers" />
                        <JSONBody body={expectation.httpResponse.body} />
                    </Space>

                </Col>
                <Col span={2}>
                    <Divider dashed type="vertical" />
                </Col>
                <Col span={11} style={{ padding: "10px" }}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Row justify="space-between">
                            <Col>
                                <Tag color="blue">{expectation.httpResponse.statusCode || "200"}</Tag>
                            </Col>
                            <Col>
                                {!expectation.times.unlimited && <div>
                                    Remaining: {expectation.times.remainingTimes}
                                </div>}
                            </Col>
                        </Row>
                        <Space direction="vertical" style={{ width: "100%" }} size="middle">
                            <KeyValues values={expectation.httpResponse.headers} title="Headers" />
                            <KeyValues values={expectation.httpResponse.cookies} title="Cookies" />
                            <KeyValues values={expectation.httpResponse.delay} title="" />
                            <KeyValues values={expectation.httpResponse.connectionOptions} title="" />

                            {!expectation.timeToLive.unlimited && <KeyValues values={expectation.timeToLive} title="Time to Live" />}

                            <KeyValues values={expectation.httpResponse.delay} title="" />
                            <JSONBody body={expectation.httpResponse.body} />
                        </Space>
                    </Space>
                </Col>
            </Row>
        </Space>
    </Card>
}