import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import Create from './Create'
import Expectation from './Expectation'
import { expectation as api } from '../../lib/api'

const MOCK_SERVER_URL = `${process.env.NEXT_PUBLIC_MOCK_SERVER_ENDPOINT}`

export interface ExpectationState {
    expectations: Array<any>
    error: string
}

export interface Expectation {
    id?: string
    priority?: number
    httpRequest: {
        path: string
        method?: string
        pathParameters?: any
        queryStringParameters?: any
        cookies?: any
        headers?: any
        body?: any
    }
    httpResponse: {
        statusCode?: number
        headers?: any
        body?: any
        cookies?: any
        delay?: number
        connectionOptions?: any
    }
    times?: {
        unlimited: boolean
        remainingTimes: number
    }
    timeToLive?: {
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
    batch?: (exp: Expectation[]) => void
    reset?: () => void
    clearLogs?: () => void
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
    const {
        load,
        state: { expectations },
    } = useExpectations()
    const [state, setState] = useState({ expectation: null, errors: null })

    const createExp = (expectation: Expectation) => {
        setState({ expectation, errors: null })
    }

    const deleteExp = async (expectation: Expectation) => {
        await api.delete(expectation)
        await load()
    }

    const batchExp = async (expectations: Expectation[]) => {
        await api.batchCreate(expectations)
        await load()
    }

    const updateExp = (expectation: Expectation) => {
        setState({ expectation, errors: null })
    }

    const cloneExp = (expectation: Expectation) => {
        const newExp = Object.assign({}, expectation)
        delete newExp.id
        setState({ expectation: newExp, errors: null })
    }

    const onDrawerDone = async () => {
        try {
            await load()
            setState({ errors: null, expectation: null })
        } catch (error) {
            console.log(error)
        }
    }

    const clearLogs = async () => {
        await api.reset()
        await api.batchCreate(expectations)
        await load()
    }

    const resetServer = async () => {
        await api.reset()
        await load()
    }

    return (
        <EditExpectationContext.Provider
            value={{
                clone: cloneExp,
                delete: deleteExp,
                update: updateExp,
                create: createExp,
                batch: batchExp,
                clearLogs,
                reset: resetServer,
            }}
        >
            <>
                <Drawer
                    title="Expectation Editor"
                    width={580}
                    closable={false}
                    onClose={() =>
                        setState({ expectation: null, errors: null })
                    }
                    visible={!!state.expectation}
                    placement="left"
                >
                    <Create
                        expectation={state.expectation || {}}
                        onDone={onDrawerDone}
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
