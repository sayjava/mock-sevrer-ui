import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
    Button,
    Card,
    Col,
    Divider,
    Popconfirm,
    Row,
    Space,
    Tag,
    Typography,
} from 'antd'
import { Expectation, useEditExpectations } from './Provider'
import JSONBody from '../JSONBody'
import KeyValues from '../KeyValues'

interface Props {
    expectation: Expectation
}
export default ({ expectation }: Props) => {
    const { delete: deleteExp, clone, update } = useEditExpectations()

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Row justify="space-between">
                <Col>
                    <Space>
                        <Button
                            onClick={() => update(expectation)}
                            size="small"
                            type="dashed"
                            icon={<EditOutlined />}
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => clone(expectation)}
                            size="small"
                            type="dashed"
                            icon={<CopyOutlined />}
                        >
                            Clone
                        </Button>
                    </Space>
                </Col>
                <Col>
                    <Popconfirm
                        title="Delete expectation"
                        okText="Yes"
                        cancelText="No"
                        placement="topLeft"
                        onConfirm={() => deleteExp(expectation)}
                    >
                        <Button
                            size="small"
                            type="dashed"
                            icon={<DeleteOutlined />}
                            danger
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Col>
            </Row>
            <Divider dashed />
            <Row>
                <Col span={12} style={{ padding: '10px' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Space direction="horizontal" align="baseline">
                            <Tag color="blue">
                                {expectation.httpRequest.method || 'GET'}
                            </Tag>
                            <Typography.Text
                                title={expectation.httpRequest.path}
                            >
                                {expectation.httpRequest.path}
                            </Typography.Text>
                        </Space>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <KeyValues
                                values={expectation.httpRequest.pathParameters}
                                title="Params"
                            />
                            <KeyValues
                                values={
                                    expectation.httpRequest
                                        .queryStringParameters
                                }
                                title="Query"
                            />
                            <KeyValues
                                values={expectation.httpRequest.cookies}
                                title="Cookies"
                            />
                            <KeyValues
                                values={expectation.httpRequest.headers}
                                title="Headers"
                            />
                            <JSONBody body={expectation.httpResponse.body} />
                        </Space>
                    </Space>
                </Col>
                <Col span={12} style={{ padding: '10px' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Row justify="space-between">
                            <Col>
                                <Tag color="blue">
                                    {expectation.httpResponse.statusCode ||
                                        '200'}
                                </Tag>
                            </Col>
                            <Col>
                                {!expectation.times.unlimited && (
                                    <div>
                                        Remaining:{' '}
                                        {expectation.times.remainingTimes}
                                    </div>
                                )}
                            </Col>
                        </Row>
                        <Space
                            direction="vertical"
                            style={{ width: '100%' }}
                            size="middle"
                        >
                            <KeyValues
                                values={expectation.httpResponse.headers}
                                title="Headers"
                            />
                            <KeyValues
                                values={expectation.httpResponse.cookies}
                                title="Cookies"
                            />
                            <KeyValues
                                values={expectation.httpResponse.delay}
                                title=""
                            />
                            <KeyValues
                                values={
                                    expectation.httpResponse.connectionOptions
                                }
                                title=""
                            />

                            {!expectation.timeToLive.unlimited && (
                                <KeyValues
                                    values={expectation.timeToLive}
                                    title="Time to Live"
                                />
                            )}

                            <KeyValues
                                values={expectation.httpResponse.delay}
                                title=""
                            />
                            <JSONBody body={expectation.httpResponse.body} />
                        </Space>
                    </Space>
                </Col>
            </Row>
        </Space>
    )
}
