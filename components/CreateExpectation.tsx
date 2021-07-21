import { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { Error, Success } from "./Alert";

const JSONEditor = ({ body }) => {
  return (
    <div style={{ height: `25rem` }}>
      <Editor
        defaultLanguage="json"
        defaultValue={JSON.stringify(body, null, 2)}
        theme="vs-dark"
        width="100%"
        options={{ minimap: { enabled: false }, lineNumbers: "on" }}
      />
    </div>
  );
};

export default ({ log, onClose }) => {
  const [state, setState] = useState({ error: null, success: false });

  const exp = Object.assign({}, log);
  delete exp.timestamp;

  const createExpectation = async () => {
    return axios({
      url: `${process.env.NEXT_PUBLIC_MOCK_SERVER_ENDPOINT}/expectation?format=json`,
      data: exp,
      method: "PUT",
    })
      .then(() => {
        setState({ error: null, success: true });
        setTimeout(() => onClose(), 500);
      })
      .catch((error) => {
        setState({ error: error.response.data, success: null });
      });
  };

  const style: any = {
    visibility: "visible",
    opacity: 1,
    pointerEvents: "all",
  };

  if (state.success) {
    return (
      <div className="modal" style={style}>
        <div className="modal-box rounded-md">
          <div>
            <Success message="Expectation Saved" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal compact" style={style}>
      <div className="modal-box rounded-md">
        <div className="my-4">
          <h3>Create Expectation {process.env.MOCK_SERVER_ENDPOINT}</h3>
        </div>
        <div className="my-8">
          {state.error && <Error message={state.error} />}
        </div>
        <div>
          <JSONEditor body={exp} />
        </div>
        <div className="modal-action">
          <button
            onClick={createExpectation}
            className="btn btn-primary rounded-md"
          >
            Create Expectation
          </button>
          <button className="btn rounded-md" onClick={() => onClose()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
