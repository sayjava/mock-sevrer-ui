import React from 'react'
import { Button, Drawer, Space } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
import List from '../components/Expectations/List'
import {
    EditExpectationProvider,
    ExpectationsProvider,
} from '../components/Expectations/Provider'
import Create from '../components/Expectations/Create'

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
                        {/* <Button type="dashed" icon={<PlusSquareOutlined />} onClick={() => this.createView(true)}>
                        New Expectation
                    </Button>
                    <Drawer>
                        <Create onDone={() => this.createView(false)} />
                    </Drawer>
                    <Drawer
                        title="New Expectation"
                        width={480}
                        closable={false}
                        onClose={() => this.createView(false)}
                        visible={this.state.showCreateView}
                        placement="left"
                    >
                        <Create onDone={() => this.createView(false)} />
                    </Drawer> */}
                        <List />
                    </Space>
                </EditExpectationProvider>
            </ExpectationsProvider>
        )
    }
}
