import React from 'react';
import { Router, Link } from '@reach/router';
import { Layout, Menu } from 'antd';

import Play from './Play';
import HowTo from './HowTo';

const { Content, Footer } = Layout;

const routes = [
  {
    component: Play,
    path: '/',
    label: 'Home',
  },
  {
    component: HowTo,
    path: '/how-to',
    label: 'How to play',
  },
];

export default function Page() {
  return (
    <Layout className="layout App" theme="light">
      {/* <Menu mode="inline" selectedKeys={[routes[0].path]}>
        {routes.map((page) => (
          <Menu.Item key={page.path}>
            <Link to={page.path}>{page.label}</Link>
          </Menu.Item>
        ))}
      </Menu> */}
      <Content theme="light" className="content-wrapper">
        <Router>
          {routes.map((page) => (
            <page.component key={page.path} path={page.path} />
          ))}
        </Router>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©{new Date().getFullYear()} Created by D&J
      </Footer>
    </Layout>
  );
}
