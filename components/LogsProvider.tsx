import React from 'react'
import { Log, mapToLogs } from '../lib/logs'

export interface LogsState {
    connected: boolean
    logs: Array<Log>
    expectations: Array<any>
    error: null
}

interface LogsContextState {
    state: LogsState
    filter: (args: any) => void
}

const startState: LogsState = {
    logs: [],
    expectations: [],
    error: null,
    connected: false,
}

const LogsContext = React.createContext<LogsContextState>({
    state: startState,
    filter: () => console.error('not implemented'),
})

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

export class LogsProvider extends React.Component<any, LogsState> {
    socket: WebSocket

    constructor(args) {
        super(args)

        this.state = {
            connected: false,
            error: null,
            logs: [],
            expectations: [],
        }
    }

    componentDidMount() {
        this.socket = new WebSocket(
            `${secure}://${host}:${port}/_mockserver_ui_websocket`
        )
        this.socket.onerror = error => {
            this.setState(prevState => {
                return Object.assign({}, prevState, { error })
            })
        }

        this.socket.addEventListener('open', () => {
            this.socket.send(JSON.stringify({}))
            this.setState(prevState => {
                return Object.assign({}, prevState, { connected: true })
            })
        })

        this.socket.addEventListener('message', event => {
            this.setState(prevState => {
                const data = JSON.parse(event.data)
                const expectations = (data.activeExpectations || [])
                    .map(exp => exp.value)
                    .reverse()
                return Object.assign({}, prevState, {
                    logs: mapToLogs(data),
                    expectations,
                })
            })
        })

        this.socket.addEventListener('error', err => {
            console.error('SOCKET ERROR ', err)
        })
    }

    filter(values = {}) {
        this.socket.send(JSON.stringify(values))
    }

    render() {
        const { state } = this
        return (
            <LogsContext.Provider
                value={{ state, filter: v => this.filter(v) }}
            >
                {this.props.children}
            </LogsContext.Provider>
        )
    }
}
