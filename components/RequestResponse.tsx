import Editor from "@monaco-editor/react";

const JSONBody = ({ body }) => {
  const strBody = JSON.stringify(body, null, 2);
  const lines = Math.min(strBody.split("\n").length + 2, 72);

  return (
    <div style={{ height: `${lines}rem` }}>
      <Editor
        defaultLanguage="json"
        defaultValue={JSON.stringify(body, null, 2)}
        theme="vs-dark"
        width="100%"
        options={{ minimap: { enabled: false }, lineNumbers: "off" }}
      />
    </div>
  );
};

const Headers = ({ headers }) => {
  return (
    <div className="my-4 w-full border rounded-md">
      {Object.entries(headers).map(([key, val]: [any, Array<any>]) => {
        return (
          <div className="flex w-full  border" key={key}>
            <div className="w-1/2 font-bold p-2">{key}</div>
            <div className="w-1/2 py-2 overflow-ellipsis overflow-hidden">
              {val.join(",")}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Request = ({ request, timestamp }) => {
  const { headers, method = "GET", path, body } = request;
  return (
    <div className="text-gray-400">
      <div className="flex justify-between">
        <div>
          <span className="badge badge-info rounded-none mr-2">{method}</span>
          <span>{path}</span>
        </div>
        {timestamp && (
          <div className="font-semibold">
            {new Date(timestamp).toLocaleString()}
          </div>
        )}
      </div>

      {headers && <Headers headers={headers} />}
      {body && (
        <div className="w-full py-2">
          <JSONBody body={body} />
        </div>
      )}
    </div>
  );
};

const Response = ({ response }) => {
  const {
    headers,
    statusCode = 200,
    times = { unlimited: true, remainingTimes: 0 },
    body,
  } = response;

  let codeColor = "badge-primary";

  if (statusCode === 404) {
    codeColor = "badge-warning";
  }

  if (statusCode >= 499) {
    codeColor = "badge-error";
  }

  const notFound = statusCode === 404;

  return (
    <div className="text-gray-400">
      <div className="flex justify-between">
        <div>
          <span className={`badge ${codeColor} rounded-none mr-2`}>
            {statusCode}
          </span>
          {!times.unlimited && <span>{times.remainingTimes}</span>}
        </div>
        <div>{!times.unlimited && <span>{times.remainingTimes}</span>}</div>
      </div>

      <div className="my-4 w-full">
        <button className="btn btn-sm rounded-none h-1 w-full lowercase">
          Create Mock from response
        </button>
      </div>

      {headers && <Headers headers={headers} />}
      {body && (
        <div className="w-full py-2">
          <JSONBody body={body} />
        </div>
      )}
      {notFound && (
        <p className="py-6">
          <h3>Not Found</h3>
        </p>
      )}
    </div>
  );
};

export default ({ expectation }) => {
  const { httpRequest, httpResponse } = expectation;

  return (
    <div className="card shadow-sm bg-white rounded-none my-4 p-4">
      <div className="flex flex-row w-full">
        <div className="w-1/2 border-r-2 px-4 border-dotted">
          <Request request={httpRequest} timestamp={expectation.timestamp} />
        </div>
        <div className="w-1/2 px-4">
          {httpResponse && <Response response={httpResponse} />}
        </div>
      </div>
    </div>
  );
};
