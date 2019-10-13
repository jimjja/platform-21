import React, { useState } from 'react';
import {
  Layout, Row, Col,
} from 'antd';
import List from './Components/List';
import Timer from './Components/Timer';
import Timetable from './Stubs/timetable.json';

import './App.css';
import Form from './Components/Form';
import { getTrains } from './api';

const { Content, Footer } = Layout;

function App() {
  const [departures, setDepartures] = useState(Timetable.departures.all);

  async function getDepartures(date, time) {
    const result = await getTrains(date, time);
    setDepartures(result);
  }

  return (
    <Layout className="layout App" theme="dark">
      <Content
        style={{ padding: '0 50px' }}
        theme="light"
        className="content-wrapper"
      >
        <Row type="flex" justify="center">
          <Col>
            {/* <Timer /> */}
            <Form onSubmit={getDepartures} />
            <List data={departures} />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©2019 Created by D&J
      </Footer>
    </Layout>
  );
}

export default App;
