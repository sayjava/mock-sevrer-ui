import React from 'react'
import { Button, Space } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
import List from '../components/Expectations/List'
import {
    EditExpectationProvider,
    ExpectationsProvider,
    useEditExpectations,
} from '../components/Expectations/Provider'

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
            icon={<PlusSquareOutlined />}
            type="dashed"
            onClick={() => create(DEFAULT_EXPECTATION)}
        >
            New Expectation
        </Button>
    )
}

export default class extends React.Component {
    state = { showCreateView: false }

    createView = (visible: boolean) => {
        this.setState({
            showCreateView: visible,
        })
    }

    render() {
        return (
            <ExpectationsProvider>
                <EditExpectationProvider>
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
                </EditExpectationProvider>
            </ExpectationsProvider>
        )
    }
}
