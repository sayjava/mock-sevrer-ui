import { Divider } from 'antd';
import React from 'react'
import Filter from '../components/Filter/Filter';
import History from '../components/History/History';
import { LogsProvider } from "../components/LogsProvider"
import ServerControls from '../components/ServerControls';

export default () => {
  return <div style={{ width: "100%", padding: "20px 0" }}>
    <LogsProvider>
      <ServerControls />
      <Divider />
      <div style={{ padding: "10px 0" }}>
        <Filter />
      </div>
      <History />
    </LogsProvider>
  </div>
}