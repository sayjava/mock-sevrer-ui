import { UnControlled as CodeMirror } from 'react-codemirror2'

export default ({ body }) => {
    if (!body) {
        return null
    }

    return (
        <div>
            <CodeMirror
                value={JSON.stringify(body, null, 2)}
                options={{
                    mode: 'json',
                    theme: 'material',
                    lineNumbers: true,
                    readOnly: true,
                }}
            />
        </div>
    )
}
