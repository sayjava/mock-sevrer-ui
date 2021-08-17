import { Space, Button, Row, Col, Popconfirm, message } from 'antd'
import { useEditExpectations } from './Expectations/Provider'
import { useLogs } from './LogsProvider'
import SocketState from './SocketState'

export default () => {
    const { state } = useLogs()
    const edit = useEditExpectations()

    return (
        <Row justify="space-between" align="middle">
            <Col>
                <SocketState connected={state.connected} />
            </Col>
            <Col>
                <Space>
                    <Popconfirm
                        title="This will clear server history"
                        onConfirm={() => edit.clearLogs()}
                        placement="topLeft"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="dashed">Clear Logs</Button>
                    </Popconfirm>
                    <Popconfirm
                        title="This reset the server, logs and expectations"
                        onConfirm={() => edit.reset()}
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
