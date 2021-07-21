import JSONBody from "./Body";
import JSONValues from "./JSONValues";
import Row from "./Row";

const Request = ({ request, timestamp }) => {
  const {
    headers,
    method = "GET",
    path,
    body,
    queryStringParameters,
    pathParameters,
    cookies,
  } = request;
  return (
    <div>
      <div className="flex justify-between p-3 border-b">
        <div className="flex-grow flex items-center truncate">
          <span className="badge badge-info rounded-none">{method}</span>
        </div>
        {timestamp && (
          <div className="px-2">{new Date(timestamp).toLocaleString()}</div>
        )}
      </div>

      <Row title="Path">
        <p className="w-full break-words">{path}</p>
      </Row>

      {queryStringParameters && (
        <Row title="Query Params">
          <JSONValues json={queryStringParameters} />
        </Row>
      )}

      {pathParameters && (
        <Row title="Path Params">
          <JSONValues json={pathParameters} />
        </Row>
      )}

      {cookies && (
        <Row title="Cookies">
          <JSONValues json={cookies} />
        </Row>
      )}

      {headers && (
        <Row title="Headers">
          <JSONValues json={headers} />
        </Row>
      )}

      {body && (
        <Row title="Body">
          <JSONBody name="Body" body={body} />
        </Row>
      )}
    </div>
  );
};

const Response = ({ response, action }) => {
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

  return (
    <div>
      <div className="flex justify-between p-3 border-b">
        <span className={`badge ${codeColor} rounded-none`}>{statusCode}</span>
        <span className="btn btn-xs btn-outline rounded-none" onClick={action}>
          Mock
        </span>
      </div>

      {headers && (
        <Row title="Headers">
          <JSONValues json={headers} />
        </Row>
      )}

      {body && (
        <Row title="Body">
          <JSONBody name="Body" body={body} />
        </Row>
      )}
    </div>
  );
};

export default ({ expectation, action }) => {
  const { httpRequest, httpResponse } = expectation;

  return (
    <div className="shadow-none bg-white rounded-sm my-4 p-0">
      <div className="flex flex-row w-full">
        <div className="w-1/2 border-r-2 border-dotted">
          <Request request={httpRequest} timestamp={expectation.timestamp} />
        </div>
        <div className="w-1/2">
          {httpResponse && <Response response={httpResponse} action={action} />}
        </div>
      </div>
    </div>
  );
};
