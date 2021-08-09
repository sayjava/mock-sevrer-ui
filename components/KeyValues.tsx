import React, { useState } from 'react'
import { Descriptions, Switch } from 'antd'

const mapKeyValuesToArray = values => {
    return Object.entries(values).map(([key, value]) => {
        return { key, value }
    })
}

export default ({ values = {}, title }) => {
    const original = mapKeyValuesToArray(values)
    const compact = original.slice(0, 5)
    const overflow = compact.length < original.length

    const [showAll, setState] = useState(!overflow)
    const showToggle = overflow ? (
        <Switch
            checkedChildren="Compact"
            unCheckedChildren="Show All"
            checked={showAll}
            onChange={() => setState(!showAll)}
        />
    ) : null

    const descs = showAll ? original : compact

    if (original.length === 0) {
        return null
    }

    return (
        <Descriptions
            bordered
            size="small"
            extra={showToggle}
            title={title}
            style={{ padding: '10px 0' }}
        >
            {descs.map(v => (
                <Descriptions.Item label={v.key} key={v.key} span={3}>
                    {v.value}
                </Descriptions.Item>
            ))}
        </Descriptions>
    )
}
