import { Alert, Empty, Space, Collapse, Tag } from 'antd'
import { useExpectations } from './Provider'
import Expectation from './Expectation'

export default () => {
    const {
        state: { expectations, error },
    } = useExpectations()

    const isEmpty = expectations.length === 0 && !error

    const PanelHeader = ({ exp }) => {
        return (
            <Space>
                <Tag color="blue">{exp.httpRequest.method || 'GET'}</Tag>
                <span>{exp.httpRequest.path}</span>
            </Space>
        )
    }

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            {isEmpty && <Empty description="No active expectations" />}
            {error && (
                <Alert
                    message="Expectations"
                    description={error}
                    type="error"
                    showIcon
                />
            )}

            <Collapse>
                {expectations.map((exp) => (
                    <Collapse.Panel
                        key={exp.id}
                        header={<PanelHeader exp={exp} />}
                    >
                        <Expectation expectation={exp} />
                    </Collapse.Panel>
                ))}
            </Collapse>
        </Space>
    )
}
