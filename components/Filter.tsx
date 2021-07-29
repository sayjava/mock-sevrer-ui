import { Form, Input, Collapse, Radio } from "antd"
import { useLogs } from "./LogsProvider";
const { Panel } = Collapse;

export default () => {

    const { filter, state } = useLogs()

    const initialData = {}

    const onValuesChanged = (values) => {
        const filterValues = {}
        Object.keys(values).forEach(v => {
            if (values[v]) {
                filterValues[v] = values[v].target.value
            }
        })


        if (state.connected) {
            filter(filterValues)
            console.log('New Values', filterValues)
        }
    }

    return <Collapse>
        <Panel header="Filter Logs" key="filter">
            <Form initialValues={{ initialData }} onValuesChange={(_, v) => onValuesChanged(v)}>
                <Form.Item name="path" label="Path" valuePropName="path">
                    <Input />
                </Form.Item>
                <Form.Item label="Method" name="method" valuePropName="method">
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
        </Panel>
    </Collapse>
}