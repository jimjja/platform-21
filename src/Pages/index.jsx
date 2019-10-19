import React from 'react';
// import { Router } from '@reach/router';
import { Layout } from 'antd';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

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
          <Switch>
            {routes.map((page) => (
              <Route key={page.path} path={page.path}>
                <page.component />
              </Route>
            ))}
          </Switch>
        </Router>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©{new Date().getFullYear()} Created by D&J
      </Footer>
    </Layout>
  );
}
