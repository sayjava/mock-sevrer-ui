import 'antd/dist/antd.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import './app.css'

import { Badge, Layout, Menu } from 'antd'
import { CopyOutlined, PieChartOutlined } from '@ant-design/icons'
import Link from 'next/link'

const { Header, Footer, Content } = Layout

function MyApp({ Component, pageProps }) {
    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['history']}
                >
                    <Menu.Item key="history" icon={<PieChartOutlined />}>
                        <Link href="/">History</Link>
                    </Menu.Item>
                    <Menu.Item key="expectations" icon={<CopyOutlined />}>
                        <Link href="/expectations">Expectations</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '20px 50px' }}>
                <div className="site-layout-content">
                    <Component {...pageProps} />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Mock UI Server</Footer>
        </Layout>
    )
}

export default MyApp
