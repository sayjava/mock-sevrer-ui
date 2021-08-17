import { ImportOutlined } from '@ant-design/icons'
import { Button, notification } from 'antd'
import { useRef } from 'react'
import { useEditExpectations } from './Provider'

export default () => {
    const { batch } = useEditExpectations()
    const refImport = useRef()

    const doImport = () => {
        if (refImport) {
            // @ts-ignore
            refImport.current.click()
        }
    }

    const onFilesChange = async (evt) => {
        const reads = Array.from(evt.target.files).map((file: any) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onerror = (e) => reject(e)
                reader.onloadend = () => {
                    try {
                        resolve(JSON.parse(reader.result as string))
                    } catch (error) {
                        reject(error)
                    }
                }
                reader.readAsText(file, 'utf-8')
            })
        })

        try {
            const exps = await Promise.all(reads)
            await Promise.all(
                exps.map((exps: any) => {
                    return batch(exps)
                })
            )
            notification.success({
                description: 'Success',
                message: 'Expectations imported',
            })
        } catch (error) {
            notification.error({
                message: error.toString(),
                description: 'Error',
            })
        }
    }

    return (
        <>
            <Button icon={<ImportOutlined />} onClick={doImport}>
                Import
            </Button>
            <input
                onChange={onFilesChange}
                ref={refImport}
                type="file"
                style={{ display: 'none' }}
                accept=".json"
            />
        </>
    )
}
