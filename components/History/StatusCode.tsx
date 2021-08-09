import { Tag } from 'antd'

export default ({ record }) => {
    const renderTag = (statusCode: any) => {
        if (statusCode === 404) {
            return <Tag color="purple">{statusCode}</Tag>
        }

        if (statusCode >= 500) {
            return <Tag color="error">{statusCode}</Tag>
        }

        if (statusCode >= 400 && statusCode < 500) {
            return <Tag color="warning">{statusCode}</Tag>
        }

        if (statusCode <= 400) {
            return <Tag color="success">{statusCode}</Tag>
        }

        return <Tag>{statusCode}</Tag>
    }

    const { expectation, proxy } = record
    if (expectation) {
        return renderTag(expectation.httpResponse.statusCode || 200)
    }

    if (proxy) {
        return renderTag(proxy.statusCode)
    }

    return renderTag(404)
}
