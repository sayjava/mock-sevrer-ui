import axios from "axios";
import React from "react";
import ReqRes from "../components/RequestResponse";
import CreateExpectation from "../components/CreateExpectation";

export const BASE_URL = "http://localhost:1080";

const Modal = ({ log }) => {
  return (
    <div
      className="modal compact"
      style={{ visibility: "visible", opacity: 1, pointerEvents: "all" }}
    >
      <div className="modal-box rounded-sm">
        <div className="my-4">
          <h3>Create Expectation</h3>
        </div>
        <div>
          <Body body={log} />
        </div>
        <div className="modal-action">
          <a href="/components/modal#" className="btn btn-primary rounded-sm">
            Create Expectation
          </a>
          <a href="/components/modal#" className="btn rounded-sm">
            Close
          </a>
        </div>
      </div>
    </div>
  );
};

export const fetchLogs = () => {
  return axios({
    url: `${BASE_URL}/retrieve?type=request_responses`,
    method: "PUT",
  }).then((response) => {
    if (response.status === 200) {
      return response.data.reverse();
    } else {
      throw new Error(response.data);
    }
  });
};

export default class Logs extends React.Component<
  null,
  { error: any; logs: Array<any>; selected: any; success: boolean }
> {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      error: null,
      selected: null,
      success: false,
    };
  }

  componentDidMount() {
    fetchLogs()
      .then((logs) => {
        this.setState({ logs, error: null });
      })
      .catch((error) => {
        this.setState({ logs: [], error });
      });
  }

  createExpectation(log) {
    this.setState({ selected: log, success: false });
  }

  onClose() {
    this.setState({ selected: null });
  }

  render() {
    const { logs, selected, success } = this.state;

    return (
      <div className="w-full h-screen">
        {selected && (
          <CreateExpectation log={selected} onClose={() => this.onClose()} />
        )}

        <div className="md:container md:mx-auto">
          {logs.map((log) => {
            return (
              <div className="my-8">
                <ReqRes
                  key={log.httpRequest.path}
                  expectation={log}
                  action={() => this.createExpectation(log)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
