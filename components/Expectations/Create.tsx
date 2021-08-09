import { Alert, Button, notification, Space } from 'antd'
import { useRef, useState } from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'

export default ({ onDone }) => {
    const editor = useRef()
    const [error, setError] = useState(null)

    let expectation = JSON.stringify(
        {
            httpRequest: {
                path: '/hello',
            },
            httpResponse: {
                statusCode: 200,
                body: {
                    message: 'Howdy',
                },
            },
        },
        null,
        2
    )

    const onCodeChange = (e, v, value) => {
        expectation = value
    }

    const createExpectation = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_MOCK_SERVER_ENDPOINT}/expectation`,
                {
                    method: 'PUT',
                    body: expectation,
                }
            )

            if (res.ok) {
                notification.success({
                    message: 'Success',
                    description: 'Expectation created',
                    placement: 'topLeft',
                    duration: 5,
                })
                onDone()
            } else {
                const body = await res.text()
                setError(body.split('\n').join(''))
            }
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
                    value={expectation}
                    onChange={onCodeChange}
                    options={{
                        mode: 'json',
                        theme: 'material',
                        lineNumbers: true,
                    }}
                    className="create-code-view"
                />
                <Button type="primary" onClick={createExpectation}>
                    Create Expectation
                </Button>
            </Space>
        </div>
    )
}
