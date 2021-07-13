
import Editor from "@monaco-editor/react";

const JSONBody = ({body}) => {

    const strBody = JSON.stringify(body, null, 2)
    const lines   = Math.min(strBody.split('\n').length + 2, 72)

    return <div style={{ height: `${lines}rem` }}  >
        <Editor
            defaultLanguage="json" 
            defaultValue={JSON.stringify(body, null, 2)}
            theme="vs-dark"
            width="100%"
            options={{ minimap: { enabled: false }, lineNumbers: "off" }}/>
    </div>
}

const Headers = ({headers}) => {
    return <div className="my-4 w-full border rounded-md"> 
            {Object.entries(headers).map(([key, val]: [any, Array<any>]) => {
                return <div className="flex w-full  border" key={key}>
                    <div className="w-1/2 font-bold p-2">{key}</div>
                    <div className="w-1/2 py-2">{val.join(',')}</div>
                </div>
            })}
        </div>
}

const Request = ({request}) => {
    const {headers, method = 'GET', path, body} = request
    return <div className="text-gray-400">
        <div>
            <span className="badge badge-info rounded-none mr-2">{method}</span>
            <span>{path}</span>
        </div>
        {headers && <Headers headers={headers} />}
        {body && <div className="w-full py-2"><JSONBody body={body} /></div>}
    </div>
}


const Response = ({ response }) => {
    const { headers, statusCode = 200, times = { unlimited: true, remainingTimes: 0}, body } = response

    return <div className="text-gray-400">
        <div>
            <span className="badge badge-info rounded-none mr-2">{statusCode}</span>
            {!times.unlimited && <span>{times.remainingTimes}</span>}
        </div>
        {headers && <Headers headers={headers} />}
        {body && <div className="w-full py-2"><JSONBody body={body} /></div>}
    </div>
}


export default ({expectation}) => {
    const { id ="no-id-this"} = expectation
    const [expId] = id.split('-')
    const { httpRequest, httpResponse } = expectation

    return <div className="card shadow-sm bg-white rounded-none my-4 p-4">
        <div className="w-full py-2 my-2 border-b border-dotted">
            <span className="text-primary">ID: {expId}</span>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-1/2">
              <Request request={httpRequest} />
          </div>
          <div className="divider divider-vertical"></div>
         <div className="w-1/2">
              {httpResponse && <Response response={httpResponse} />}
          </div>
        </div>
    </div>
}