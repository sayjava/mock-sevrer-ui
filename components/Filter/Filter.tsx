import { RetweetOutlined } from '@ant-design/icons'
import { Form, Input, Collapse, Radio, Row, Col, Button } from 'antd'
import { useRef } from 'react'
import { useLogs } from '../LogsProvider'
import KeyValues from './KeyValues'
const { Panel } = Collapse

export default () => {
    const { filter } = useLogs()

    const initialData = {}

    let form = useRef()

    const onValuesChanged = values => {
        const filterValues = {}
        Object.keys(values).forEach(v => {
            if (values[v]) {
                if (Array.isArray(values[v])) {
                    filterValues[v] = values[v]
                        .filter(vm => vm)
                        .map(vm => {
                            return {
                                name: vm.name,
                                values: (vm.values || '').split(','),
                            }
                        })
                } else {
                    filterValues[v] = values[v].target.value
                }
            }
        })

        filter(filterValues)
    }

    const reset = () => {
        form.current?.resetFields()
        filter({})
    }

    return (
        <Collapse>
            <Panel header="Filter Logs" key="filter">
                <Form
                    ref={form}
                    initialValues={{ initialData }}
                    onValuesChange={(_, v) => onValuesChanged(v)}
                >
                    <Row>
                        <Col span={12} style={{ padding: '0 10px' }}>
                            <Form.Item
                                name="path"
                                label="Path"
                                valuePropName="path"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: '0 10px' }}>
                            <Form.Item
                                name="headers"
                                label="Headers"
                                valuePropName="headers"
                            >
                                <KeyValues fieldName="headers" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12} style={{ padding: '0 10px' }}>
                            <Form.Item
                                name="cookies"
                                label="Cookies"
                                valuePropName="cookies"
                            >
                                <KeyValues fieldName="cookies" />
                            </Form.Item>
                        </Col>

                        <Col span={12} style={{ padding: '0 10px' }}>
                            <Form.Item
                                name="queryStringParameters"
                                label="Query"
                                valuePropName="queryStringParameters"
                            >
                                <KeyValues fieldName="queryStringParameters" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Method"
                        name="method"
                        valuePropName="method"
                    >
                        <Radio.Group>
                            <Radio value="GET">GET</Radio>
                            <Radio value="POST">POST</Radio>
                            <Radio value="PUT">PUT</Radio>
                            <Radio value="DELETE">DELETE</Radio>
                            <Radio value="OPTIONS">OPTIONS</Radio>
                            <Radio value="HEAD">HEAD</Radio>
                            <Radio value="PATCH">PATCH</Radio>
                            <Radio value="TRACE">TRACE</Radio>
                            <Radio value="CONNECT">CONNECT</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                <Row>
                    <Col>
                        <Button
                            type="dashed"
                            icon={<RetweetOutlined />}
                            onClick={reset}
                        >
                            Reset Filter
                        </Button>
                    </Col>
                </Row>
            </Panel>
        </Collapse>
    )
}
