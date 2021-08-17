import { Col, Divider, Row } from 'antd'
import React from 'react'
import Expectations from '../components/Expectations/Expectations'
import {
    EditExpectationProvider,
    ExpectationsProvider,
} from '../components/Expectations/Provider'
import Filter from '../components/Filter/Filter'
import History from '../components/History/History'
import { LogsProvider } from '../components/LogsProvider'
import ServerControls from '../components/ServerControls'

export default () => {
    return (
        <div style={{ width: '100%', padding: '20px 0' }}>
            <LogsProvider>
                <ExpectationsProvider>
                    <EditExpectationProvider>
                        <Row justify="space-between">
                            <Col>
                                <Expectations />
                            </Col>
                            <Col>
                                <ServerControls />
                            </Col>
                        </Row>
                        <Divider />
                        <div style={{ padding: '10px 0' }}>
                            <Filter />
                        </div>
                        <History />
                    </EditExpectationProvider>
                </ExpectationsProvider>
            </LogsProvider>
        </div>
    )
}
