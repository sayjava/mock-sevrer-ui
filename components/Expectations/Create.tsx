import { Alert, Button, notification, Space } from 'antd'
import { useRef, useState } from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { expectation as api, Expectation } from '../../lib/api'

const DEFAULT_EXPECTATION: Expectation = {
    httpRequest: {
        path: '/hello',
    },
    httpResponse: {
        statusCode: 200,
        body: {
            message: 'Howdy',
        },
    },
}

export default ({ onDone, expectation = DEFAULT_EXPECTATION }) => {
    const editor = useRef()
    const [error, setError] = useState(null)

    let jsonValue = JSON.stringify(expectation, null, 2)

    const onCodeChange = (e, v, value) => {
        jsonValue = value
    }

    const createExpectation = async () => {
        try {
            let description = 'Expectation created'
            const exp = JSON.parse(jsonValue)

            if (Array.isArray(exp)) {
                description = 'Expectations created'
                await api.batchCreate(exp)
            } else {
                await api.create(exp)
            }

            notification.success({
                message: 'Success',
                description,
                placement: 'topLeft',
                duration: 3,
            })
            onDone()
        } catch (error) {
            setError(error.toString().split('\n'))
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <Space
                title="New Expectation"
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
            >
                {error && (
                    <Alert
                        type="error"
                        message="Expectation Error"
                        description={error.toString()}
                    />
                )}
                <CodeMirror
                    ref={editor}
                    value={jsonValue}
                    onChange={onCodeChange}
                    options={{
                        mode: 'json',
                        theme: 'material',
                        lineNumbers: true,
                    }}
                    className="create-code-view"
                />
                <Button type="primary" onClick={createExpectation}>
                    Save
                </Button>
            </Space>
        </div>
    )
}
