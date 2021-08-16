import React, { useState } from 'react'
import { Badge, Button, Drawer, Space } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
import List from './List'
import {
    EditExpectationProvider,
    ExpectationsProvider,
    useEditExpectations,
    useExpectations,
} from './Provider'

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
            New Expectation
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
        <ExpectationsProvider>
            <EditExpectationProvider>
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
                        <NewExpectation />
                        <List />
                    </Space>
                </Drawer>
            </EditExpectationProvider>
        </ExpectationsProvider>
    )
}
