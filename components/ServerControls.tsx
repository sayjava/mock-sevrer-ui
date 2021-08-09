import { Space, Button, Row, Col, Popconfirm, message } from 'antd'
import { useLogs } from './LogsProvider'
import SocketState from './SocketState'

export default () => {
    const { state } = useLogs()

    const resetServer = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_MOCK_SERVER_ENDPOINT}/reset`,
                {
                    method: 'PUT',
                }
            )

            if (res.ok) {
                message.success('Server reset successful')
            } else {
                message.warning('Could not reset sever')
            }
        } catch (error) {
            message.error(`${error.message}`)
        }
    }

    const clearLogs = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_MOCK_SERVER_ENDPOINT}/clear`,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        path: '/customer/*',
                    }),
                }
            )

            if (res.ok) {
                message.success('Request logs cleared')
            } else {
                message.warning('Could not clear logs')
            }
        } catch (error) {
            message.error(`${error.message}`)
        }
    }

    return (
        <Row justify="space-between" align="middle">
            <Col>
                <SocketState connected={state.connected} />
            </Col>
            <Col>
                <Space>
                    <Popconfirm
                        title="This will clear server history"
                        onConfirm={clearLogs}
                        placement="topLeft"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="dashed">Clear Logs</Button>
                    </Popconfirm>
                    <Popconfirm
                        title="This reset the server, logs and expectations"
                        onConfirm={resetServer}
                        placement="topLeft"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="dashed" danger>
                            Reset Server
                        </Button>
                    </Popconfirm>
                </Space>
            </Col>
        </Row>
    )
}
