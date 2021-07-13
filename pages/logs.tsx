import axios from "axios";
import React from "react";
import ReqRes from "../components/RequestResponse";

export const BASE_URL = "http://localhost:1080";

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
  { error: any; logs: Array<any> }
> {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      error: null,
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

  render() {
    const { logs } = this.state;

    return (
      <div className="w-full h-screen">
        <div className="md:container md:mx-auto">
          {logs.map((log) => {
            return (
              <div className="my-8">
                <ReqRes key={log.httpRequest.path} expectation={log} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
