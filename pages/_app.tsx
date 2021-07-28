import 'antd/dist/antd.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import { Layout, Menu } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function MyApp({ Component, pageProps }) {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="logs">Logs</Menu.Item>
          <Menu.Item key="expectations">Expectations</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Component {...pageProps} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Mock UI Server</Footer>
    </Layout>
  );
}

export default MyApp;
