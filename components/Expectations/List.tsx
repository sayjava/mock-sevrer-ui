import { Alert, Empty, Space } from 'antd'
import { useExpectations } from './Provider'
import Expectation from './Expectation'

export default () => {
    const {
        state: { expectations, error },
    } = useExpectations()

    const isEmpty = expectations.length === 0 && !error

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
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {expectations.map(exp => (
                    <Expectation key={exp.id} expectation={exp} />
                ))}
            </Space>
        </Space>
    )
}
