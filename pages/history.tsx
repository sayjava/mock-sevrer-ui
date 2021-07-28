import React from 'react'
import History from '../components/History/History';
import { LogsProvider } from "../components/LogsProvider"

export default () => {
    return <div style={{ width: "100%", padding: "20px 0" }}>
        <LogsProvider>
            <History />
        </LogsProvider>
    </div>
}