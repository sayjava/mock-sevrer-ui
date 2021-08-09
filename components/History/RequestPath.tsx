import { Space, Typography } from 'antd'
import Link from 'next/link'
import { SelectOutlined } from '@ant-design/icons'

export default ({ record }) => {
    const { expectation } = record

    if (expectation) {
        return (
            <Link href={`/expectation/${expectation.id}`}>
                <Space>
                    <Typography.Text
                        ellipsis={record.request.path.slice('5')}
                        underline
                    >
                        {record.request.path}
                    </Typography.Text>
                    <SelectOutlined />
                </Space>
            </Link>
        )
    }

    return (
        <Typography.Text ellipsis={record.request.path.slice('5')}>
            {record.request.path}
        </Typography.Text>
    )
}
