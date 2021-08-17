import React, { useState } from 'react'
import { Badge, Button, Col, Drawer, Row, Space } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
import List from './List'
import {
    EditExpectationProvider,
    ExpectationsProvider,
    useEditExpectations,
    useExpectations,
} from './Provider'
import ExportExpectations from './Export'
import FileImport from './FileImport'

const NewExpectation = () => {
    const DEFAULT_EXPECTATION = {
        httpRequest: {
            path: '/hello',
        },
        httpResponse: {
            statusCode: 200,
            body: {
                message: 'Howdy',
            },
        },
    }

    const { create } = useEditExpectations()
    return (
        <Button
            color="blue"
            icon={<PlusSquareOutlined />}
            type="primary"
            onClick={() => create(DEFAULT_EXPECTATION)}
        >
            New
        </Button>
    )
}

const ExpectationCount = ({ children }) => {
    const expectations = useExpectations()
    return (
        <Badge count={expectations.state.expectations.length}>{children}</Badge>
    )
}

export default () => {
    const [state, setState] = useState({ showExpectationsView: false })

    return (
        <>
            <ExpectationCount>
                <Button
                    type="dashed"
                    onClick={() => setState({ showExpectationsView: true })}
                >
                    Expectations
                </Button>
            </ExpectationCount>
            <Drawer
                title="Expectations"
                placement="left"
                width={750}
                closable
                onClose={() => setState({ showExpectationsView: false })}
                visible={state.showExpectationsView}
            >
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                        maxWidth: '960px',
                        margin: 'auto',
                    }}
                >
                    <Row justify="space-between">
                        <Col>
                            <Space>
                                <NewExpectation />
                                <FileImport />
                            </Space>
                        </Col>
                        <Col>
                            <ExportExpectations />
                        </Col>
                    </Row>

                    <List />
                </Space>
            </Drawer>
        </>
    )
}
