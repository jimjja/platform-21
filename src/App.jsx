import React, { useState } from 'react';
import { Layout, Row, Col } from 'antd';
import RevealedItem from './Components/RevealedItem';
import { randomNumber } from './Services/helpers';
import './App.less';
import Form from './Components/Form';
import { getTrains } from './api';

const { Content, Footer } = Layout;

function App() {
  const [departures, setDepartures] = useState([]);
  const [randomDeparture, setRandomDeparture] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  function selectRandomDeparture(currDepartures) {
    const totalDepartures = currDepartures.length;
    const random = randomNumber(totalDepartures) - 1;
    setRandomDeparture(currDepartures[random]);
    setIsVisible(true);
  }

  async function getDepartures({
    date, time, offsetFrom, offsetTo, trainStation,
  }) {
    setIsLoading(true);
    const result = await getTrains(
      trainStation,
      date,
      time,
      offsetFrom,
      offsetTo,
    );
    setDepartures(result);

    selectRandomDeparture(result);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <Layout className="layout App" theme="dark">
      <Content theme="light" className="content-wrapper">
        <Row className="content-wrapper__row">
          <Col sm={{ span: 12, offset: 6 }} xs={{ span: 24, offset: 0 }}>
            <Form onSubmit={getDepartures} />
          </Col>
        </Row>
        <Row className="content-wrapper__row">
          <Col sm={{ span: 12, offset: 6 }} xs={{ span: 24, offset: 0 }}>
            <RevealedItem
              key={randomDeparture.destination_name}
              isVisible={isVisible}
              isLoading={isLoading}
              title={randomDeparture.destination_name}
              departureTime={randomDeparture.aimed_departure_time}
              platform={randomDeparture.platform}
              totalItems={departures.length}
            />
            {/* <List data={departures} /> */}
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2019 Created by D&J</Footer>
    </Layout>
  );
}

export default App;
