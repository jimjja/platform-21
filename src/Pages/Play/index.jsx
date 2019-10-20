
import React, { useState } from 'react';
import {
  Row, Col, Alert,
} from 'antd';
import moment from 'moment';
import RevealedItem from '../../Components/RevealedItem';
import { randomNumber } from '../../Services/helpers';
import Form from '../../Components/Form';
import TrainsAPI from '../../Apis/trainApi';
import PlatformLogo from '../../assets/platform.png';

const trainsApi = new TrainsAPI();

export default function PlayGame() {
  const [departures, setDepartures] = useState([]);
  const [randomDeparture, setRandomDeparture] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function selectRandomDeparture(currDepartures) {
    const totalDepartures = currDepartures.length;
    const random = randomNumber(totalDepartures) - 1;
    setRandomDeparture(currDepartures[random]);
    setIsVisible(true);
  }

  async function getDepartures({
    date, time, offsetFrom, offsetTo, trainStation,
  }) {
    try {
      setIsLoading(true);
      const result = await trainsApi.getTrains(
        trainStation,
        date,
        time,
        offsetFrom,
        offsetTo,
      );
      setDepartures(result);

      selectRandomDeparture(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message || error);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Row type="flex" justify="center">
        <Col>
          <h1
            style={{
              fontWeight: 'bold',
              fontVariantCaps: 'all-small-caps',
              fontSize: '1.5em',
            }}
          >
            <img
              alt="Platform 21 logo"
              style={{ width: '3.5em' }}
              src={PlatformLogo}
            />
            Platform 21
          </h1>
        </Col>
      </Row>

      <Row className="content-wrapper__row">
        <Col sm={{ span: 12, offset: 6 }} xs={{ span: 24, offset: 0 }}>
          <Form onSubmit={getDepartures} />
        </Col>
      </Row>
      {errorMessage && errorMessage.length && (
        <Row className="content-wrapper__row">
          <Col sm={{ span: 12, offset: 6 }} xs={{ span: 24, offset: 0 }}>
            <Alert
              message="Error"
              description={errorMessage}
              type="error"
              showIcon
            />
          </Col>
        </Row>
      )}
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
    </>
  );
}
