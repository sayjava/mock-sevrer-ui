import React from 'react'
import Filter from '../components/Filter/Filter';
import History from '../components/History/History';
import { LogsProvider } from "../components/LogsProvider"

export default () => {
    return <div style={{ width: "100%", padding: "20px 0" }}>
        <LogsProvider>
            <div style={{ padding: "5px 0" }}>
                <Filter />
            </div>
            <History />
        </LogsProvider>
    </div>
}