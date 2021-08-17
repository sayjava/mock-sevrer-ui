import { Alert, Button, Drawer, notification, Space } from 'antd'
import React, { useRef, useState } from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { Expectation } from '../../lib/logs'
import { useLogs } from '../LogsProvider'
import { useEditExpectations } from './Provider'

export default ({ selections }) => {
    const editor = useRef()
    const {
        state: { logs },
    } = useLogs()
    const edit = useEditExpectations()

    const [localState, setLocalState] = useState<{
        imports: any
        errors: Array<any>
    }>({ imports: null, errors: [] })

    const importSelections = async () => {
        const indices = selections.map((s) => parseInt(s.match(/\d+/)[0], 10))

        const exps: Array<Expectation> = indices.map((index) => {
            const log = Object.assign({}, logs[index])

            // @ts-ignore
            delete log.request.forwarded

            let httpResponse = { statusCode: 200 }
            if (log.expectation) {
                httpResponse = log.expectation.httpResponse
            }
            if (log.proxy) {
                httpResponse = log.proxy
            }

            return {
                httpRequest: log.request,
                httpResponse,
                times: { unlimited: true },
                timeToLive: { unlimited: true },
            }
        })

        setLocalState({ imports: exps, errors: [] })
    }

    const doImport = async (expectations) => {
        try {
            await edit.batch(expectations)
            notification.success({
                message: 'Success',
                description: 'Expectations saved',
            })
            setLocalState({ imports: null, errors: [] })
        } catch (error) {
            setLocalState({ imports: localState.imports, errors: [error] })
        }
    }

    let code = JSON.stringify(localState.imports || [], null, 2)
    const onCodeChange = (e, v, value) => {
        code = value
    }

    return (
        <div>
            {selections && (
                <Button
                    onClick={importSelections}
                    type="primary"
                    disabled={selections.length === 0}
                >
                    Mock
                </Button>
            )}
            <Drawer
                onClose={() => setLocalState({ imports: null, errors: [] })}
                visible={!!localState.imports}
                placement="left"
                width={620}
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <CodeMirror
                        ref={editor}
                        value={code}
                        onChange={onCodeChange}
                        options={{
                            mode: 'json',
                            theme: 'material',
                            lineNumbers: true,
                        }}
                        className="create-code-view"
                    />

                    <Button
                        type="primary"
                        onClick={() => doImport(JSON.parse(code))}
                    >
                        Save Expectations
                    </Button>

                    <ul>
                        {localState.errors.map((err) => {
                            return (
                                <li key={err.path}>
                                    <Alert
                                        type="error"
                                        description={err.toString()}
                                        message={`Error: Saving`}
                                        closable
                                        showIcon
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </Space>
            </Drawer>
        </div>
    )
}
