import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

import { Tag } from 'antd'

export default ({ connected }) => {
    if (!connected) {
        return (
            <Tag icon={<CloseCircleOutlined />} color="error">
                Not Connected
            </Tag>
        )
    }

    return null
}
