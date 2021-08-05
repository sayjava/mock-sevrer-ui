import { useLogs } from "../LogsProvider"
import { Button, Space, Table, Tooltip } from 'antd';

import { ApiOutlined, PlusOutlined } from '@ant-design/icons';
import StatusCode from "./StatusCode";
import RequestPath from "./RequestPath";
import LogView from "../Log";
import { useState } from "react";
import Import from "../Expectations/Import";

const columns = [
    {
        title: '',
        dataIndex: 'proxy',
        width: "5%",
        render: (_, record) => {
            if (record.proxy) {
                const [host] = record.request.headers['Host'] || []
                return <Tooltip title={host}>
                    <ApiOutlined color="green" />
                </Tooltip>
            }
            return null
        }
    },
    {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
        width: "15%",
    },
    {
        title: 'Method',
        dataIndex: ['request', 'method'],
        key: 'id',
        width: "10%",
    },
    {
        title: 'User-Agent',
        dataIndex: ['request', 'path'],
        ellipsis: true,
        width: "15%",
        render: (_, record) => {
            const [agent] = record.request.headers['User-Agent'] || ['None']
            return agent
        }
    },
    {
        title: 'Path',
        dataIndex: ['request', 'path'],
        ellipsis: true,
        render: (_, record) => <RequestPath record={record} />
    },
    {
        title: 'Status',
        dataIndex: 'request.path',
        width: "10%",
        render: (_, record) => <StatusCode record={record} />
    }
]


export default () => {
    const { state } = useLogs()
    const [selections, setSelections] = useState([])

    const historySelection: any = {
        selectedRowKeys: selections,
        onChange: setSelections,
        type: 'checkbox'
    }

    return <Space direction="vertical">
        <Import selections={selections} />
        <Table
            columns={columns}
            dataSource={state.logs}
            pagination={false}
            rowSelection={historySelection}
            expandable={{
                expandedRowRender: record => <LogView log={record} />
            }}
        >
        </Table>
    </Space>
}