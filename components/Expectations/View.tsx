import React from 'react'
import { Drawer, Button, Menu, Space } from 'antd';
import Create from './Create';
import { PlusSquareOutlined } from '@ant-design/icons';
import List from './List';
import { LogsProvider } from '../LogsProvider';

export default class extends React.Component {
    state = { visible: false, childrenDrawer: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
        });
    };

    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
    };

    render() {
        return (
            <LogsProvider>
                <Button type="link" onClick={this.showDrawer}>
                    Expectations
                </Button>
                <Drawer
                    title="Active Expectations"
                    width={520}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    placement="left"
                >
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <List />
                        <div>
                            <Button type="dashed" icon={<PlusSquareOutlined />} onClick={this.showChildrenDrawer}>
                                New Expectation
                            </Button>
                        </div>
                    </Space>
                    <Drawer
                        title="New Expectation"
                        width={480}
                        closable={false}
                        onClose={this.onChildrenDrawerClose}
                        visible={this.state.childrenDrawer}
                        placement="left"
                    >
                        <Create onDone={() => this.onChildrenDrawerClose()} />
                    </Drawer>
                </Drawer>
            </LogsProvider>
        );
    }
}