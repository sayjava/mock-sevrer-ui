import React, { Reducer, useEffect, useReducer } from 'react'
import { Log, mapToLogs } from '../lib/logs'

export interface LogsState {
    connected: boolean,
    logs: Array<Log>,
    error: null
}

interface LogsContextState {
    state: LogsState,
    filter: (args: any) => void
}

const startState: LogsState = {
    logs: [],
    error: null,
    connected: false
}

const LogsContext = React.createContext<LogsContextState>({ state: startState, filter: () => console.error('not implemented') })


enum ActionKind {
    Connected = 'CONNECTED',
    Logs = 'LOGS',
    Error = 'ERROR',
    Closed = 'CLOSED'
}

type Action = {
    type: ActionKind,
    payload?: any
}


const reducer = (state: LogsState, action: Action): LogsState => {

    switch (action.type) {
        case ActionKind.Connected:
            return Object.assign({}, state, { connected: true })

        case ActionKind.Error:
            return Object.assign({}, state, { connected: false, ...action.payload })

        case ActionKind.Logs:
            return Object.assign({}, state, action.payload)

        case ActionKind.Closed:
            return Object.assign({}, state, action.payload)

        default:
            return state
    }
}

export const useLogs = () => {
    const ctx = React.useContext(LogsContext)
    if (!ctx) {
        throw new Error('Must be mused withing a LogsProvider')
    }

    return ctx
}

const port = 1080
const secure = 'ws'
const host = 'localhost'

export const LogsProvider = ({ children }) => {
    const [state, dispatch] = useReducer<Reducer<LogsState, Action>>(reducer, startState)
    let socket: WebSocket;

    useEffect(() => {
        // do connect here
        socket = new WebSocket(`${secure}://${host}:${port}/_mockserver_ui_websocket`);

        socket.onerror = (error) => { dispatch({ type: ActionKind.Error, payload: { error } }) }
        socket.onclose = () => { dispatch({ type: ActionKind.Closed, payload: { connected: false } }) }

        // TODO read the filter parameters from some storage
        socket.onopen = () => {
            dispatch({ type: ActionKind.Connected, payload: { connected: true } })
            setTimeout(() => socket.send(JSON.stringify({})), 0)
        }

        socket.onmessage = (event) => {
            dispatch({
                type: ActionKind.Logs,
                payload: {
                    logs: mapToLogs(JSON.parse(event.data))
                }
            })
        };

        return () => {
            socket.close()
        }

    }, [])

    const filter = (values = {}) => {
        // do filter values here
        socket.send(JSON.stringify(values))
    }

    return <LogsContext.Provider value={{ state, filter }}>
        {children}
    </LogsContext.Provider>
}