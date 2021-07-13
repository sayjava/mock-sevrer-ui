import axios from 'axios'
import React from "react"
import Expectation from '../components/Expectation';

export const BASE_URL = "http://localhost:1080";

export const fetchExpectations = () => {
    return axios(
        {
            url: `${BASE_URL}/retrieve?type=active_expectations`,
            method: 'PUT'
        }
    ).then(response => {
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(response.data)
        }
    })
}

export default class Expectations extends React.Component<null, {error: any, expectations: Array<any>}> {

    constructor(props) {
        super(props)
        this.state = {
            expectations: [],
            error: null
        }
    }

    componentDidMount() {
        fetchExpectations()
            .then((expectations) => {
                this.setState({expectations, error: null})
            }).catch((error) => {
                this.setState({expectations: [], error})
            })
        }
    

    render () {
        const { expectations } = this.state

        return <div className="w-full h-screen">
                    <div className="md:container md:mx-auto">
                    <h2>{expectations.length} Expectations</h2>
                    <p>This is the list of declared expectations ordered by priority</p>
                    {expectations.map(exp => {
                        return <Expectation key={exp.id} expectation={exp} />
                    })}
                </div>
            </div>
        }
}