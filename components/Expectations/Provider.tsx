import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import Create from './Create'
import Expectation from './Expectation'

const MOCK_SERVER_URL = `${process.env.NEXT_PUBLIC_MOCK_SERVER_ENDPOINT}`

export interface ExpectationState {
    expectations: Array<any>
    error: string
}

export interface Expectation {
    id: string
    httpRequest: {
        path: string
        method: string
        pathParameters: any
        queryStringParameters: any
        cookies: any
        headers: any
        body: any
    }
    httpResponse: {
        statusCode: number
        headers: any
        body: any
        cookies: any
        delay: number
        connectionOptions: any
    }
    times: {
        unlimited: boolean
        remainingTimes: number
    }
    timeToLive: {
        unlimited: boolean
    }
}

interface ExpectationContextState {
    state: ExpectationState
    load: () => Promise<Array<Expectation>>
}

const startState: ExpectationState = {
    expectations: [],
    error: null,
}

const ExpectationsContext = React.createContext<ExpectationContextState>({
    state: startState,
    load: () => Promise.resolve([]),
})

interface EditExpectationContextState {
    clone?: (exp: Expectation) => void
    create?: (exp: Expectation) => void
    delete?: (exp: Expectation) => void
    update?: (exp: Expectation) => void
}

const EditExpectationContext = React.createContext<EditExpectationContextState>(
    {}
)

export const useEditExpectations = () => {
    const ctx = React.useContext(EditExpectationContext)
    if (!ctx) {
        throw new Error('Must be mused withing a EditExpectationProvider')
    }

    return ctx
}

export const EditExpectationProvider = ({ children }) => {
    const { state: expState, load } = useExpectations()
    const [state, setState] = useState({ expectation: null, errors: null })

    const createExp = (expectation: Expectation) => {
        setState({ expectation, errors: null })
    }
    const deleteExp = (expectation: Expectation) => {
        console.log(`Lets delete - - - - >  ${expectation.id}`)
        load()
    }
    const updateExp = (expectation: Expectation) => {
        setState({ expectation, errors: null })
    }
    const cloneExp = (expectation: Expectation) => {
        setState({ expectation, errors: null })
    }

    return (
        <EditExpectationContext.Provider
            value={{
                clone: cloneExp,
                delete: deleteExp,
                update: updateExp,
                create: createExp,
            }}
        >
            <>
                <Drawer
                    title="New Expectation"
                    width={480}
                    closable={false}
                    onClose={() =>
                        setState({ expectation: null, errors: null })
                    }
                    visible={!!state.expectation}
                    placement="left"
                >
                    <Create
                        onDone={() =>
                            setState({ errors: null, expectation: null })
                        }
                    />
                </Drawer>
                {children}
            </>
        </EditExpectationContext.Provider>
    )
}

export const useExpectations = () => {
    const ctx = React.useContext(ExpectationsContext)
    if (!ctx) {
        throw new Error('Must be mused withing a ExpectationProvider')
    }

    return ctx
}

export const ExpectationsProvider = ({ children }) => {
    const [state, setState] = useState<ExpectationState>({
        error: null,
        expectations: [],
    })

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        const res = await fetch(
            `${MOCK_SERVER_URL}/retrieve?type=active_expectations`,
            {
                method: 'PUT',
            }
        )

        if (res.ok) {
            const expectations = await res.json()
            return setState({
                error: null,
                expectations,
            })
        }

        return setState({
            error: `Error - ${res.statusText}`,
            expectations: [],
        })
    }

    return (
        <ExpectationsContext.Provider value={{ state, load }}>
            {children}
        </ExpectationsContext.Provider>
    )
}
