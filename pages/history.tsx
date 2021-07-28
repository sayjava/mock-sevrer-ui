import React from 'react'
import { Table, Tag, Space, Tooltip, Typography, Button } from 'antd';
import Link from 'next/link';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    SelectOutlined,
    ApiOutlined,
    PlusOutlined
} from '@ant-design/icons';

import { createSocket } from '../lib/logs'
import Log from '../components/Log';



const SocketState = ({ connected }) => {
    if (!connected) {
        return <Tag icon={<CloseCircleOutlined />} color="error">Not Connected</Tag>
    }

    return <Tag icon={<CheckCircleOutlined />} color="success">Connected</Tag>
}

export default class LogsView extends React.Component {
    private socket: WebSocket = null;

    private columns = [
        {
            title: '',
            dataIndex: 'proxy',
            render: (_, record) => {
                if (record.proxy) {
                    const [host] = record.request.headers['Host'] || []
                    return <Tooltip title={host}>
                        <ApiOutlined color="" />
                    </Tooltip>
                }

                return null
            }
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
        {
            title: 'Method',
            dataIndex: ['request', 'method'],
            key: 'id',
        },
        {
            title: 'User-Agent',
            dataIndex: ['request', 'path'],
            ellipsis: true,
            render: (_, record) => {
                if (record.request.headers['Host']) {
                    return record.request.headers['User-Agent'][0]
                }

                return 'None'
            }
        },
        {
            title: 'Path',
            dataIndex: ['request', 'path'],
            ellipsis: true,
            render: (_, record) => {
                const { expectation } = record

                if (expectation) {
                    return <Link href={`/expectation/${expectation.id}`}>
                        <Space>
                            <Typography.Text
                                ellipsis={record.request.path.slice('5')} underline>
                                {record.request.path}
                            </Typography.Text>
                            <SelectOutlined />
                        </Space>
                    </Link>
                }

                return <Typography.Text ellipsis={record.request.path.slice('5')}>
                    {record.request.path}
                </Typography.Text>

            }
        },
        {
            title: 'Status',
            dataIndex: 'request.path',
            render: (_, record) => {

                const renderTag = (statusCode: any) => {
                    if (statusCode === 404) {
                        return <Tag color="purple" >{statusCode}</Tag>
                    }

                    if (statusCode >= 500) {
                        return <Tag color="error" >{statusCode}</Tag>
                    }

                    if (statusCode >= 400 && statusCode < 500) {
                        return <Tag color="warning" >{statusCode}</Tag>
                    }

                    if (statusCode <= 400) {
                        return <Tag color="success" >{statusCode}</Tag>
                    }

                    return <Tag>{statusCode}</Tag>
                }

                const { expectation, proxy } = record
                if (expectation) {
                    return renderTag(expectation.httpResponse.statusCode || 200)
                }

                if (proxy) {
                    return renderTag(proxy.statusCode)
                }

                return renderTag(404)
            }
        }
    ]

    constructor(args) {
        super(args)
        this.socket = null
        this.state = { logs: [] }
    }

    componentDidMount() {
        this.socket = createSocket(payload => {
            this.setState(payload)
        })
    }

    componentWillUnmount() {
        if (this.socket) {
            this.socket.close()
            this.socket = null
        }
    }

    render() {
        console.log(this.state.logs)
        return <Space direction="vertical" style={{ width: "100%", padding: "20px 0" }}>
            <SocketState connected={this.state.connected} />
            <Table
                columns={this.columns}
                dataSource={this.state.logs}
                pagination={false}
                rowSelection={{ type: 'checkbox' }}
                expandable={{
                    expandedRowRender: record => <div>
                        {!record.expectation && <div style={{ padding: "10px" }}>
                            <Button type="dashed" icon={<PlusOutlined />}> Create Mock </Button>
                        </div>}
                        <Log log={record} />
                    </div>
                }}
            >
            </Table>
        </Space>
    }

}