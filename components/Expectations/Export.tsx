import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useExpectations } from './Provider'

export default () => {
    const {
        state: { expectations },
    } = useExpectations()

    const newExpectations = expectations.map((exp) => {
        const ex = Object.assign({}, exp)
        delete ex.id
        return ex
    })

    const blob = new Blob([JSON.stringify(newExpectations, null, 2)])
    const url = URL.createObjectURL(blob)

    return (
        <Button
            icon={<DownloadOutlined />}
            href={url}
            download="expectations.json"
        >
            Export
        </Button>
    )
}
