import 'antd/dist/antd.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import './app.css'

import { Layout } from 'antd'

const { Footer, Content } = Layout

function MyApp({ Component, pageProps }) {
    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
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
