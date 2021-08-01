import 'antd/dist/antd.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import './app.css';

import { Layout, Space, Typography } from 'antd';
import ExpectationsView from '../components/Expectations/View';
import { CloudServerOutlined } from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

function MyApp({ Component, pageProps }) {

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <Typography.Text strong style={{ color: "white" }}>Mock-Server</Typography.Text>
        <CloudServerOutlined />
        <Space>
          <ExpectationsView />
        </Space>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <div className="site-layout-content">
          <Component {...pageProps} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Mock UI Server</Footer>
    </Layout>
  );
}

export default MyApp;
