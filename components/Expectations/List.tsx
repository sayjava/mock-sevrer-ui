import { Empty, Space } from "antd"
import { useLogs } from "../LogsProvider"
import Expectation from "./Expectation"

export default () => {
    const { state } = useLogs()
    const isEmpty = state.expectations.length === 0

    return <Space direction="vertical" style={{ width: "100%" }}>
        {isEmpty && <Empty />}
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {state.expectations.map(exp => <Expectation key={exp.id} expectation={exp} />)}
        </Space>
    </Space>
}