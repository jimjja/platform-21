import React, { useState } from 'react';
import {
  Spin, Card, Button, Row, Col,
} from 'antd';
import moment from 'moment';
import Timer from '../Timer';
import './RevealedItem.less';

const TIMER_SECS = 5;

function RevealedItem({
  isLoading = false,
  title,
  width,
  isVisible = true,
  departureTime,
  totalItems,
  platform,
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isTimerFinished, setTimerFinished] = useState(false);
  if (!isVisible) {
    return null;
  }

  if (isLoading) {
    return (
      <Card width={width} className="loading-card">
        <Spin />
      </Card>
    );
  }

  function getTimeToDeparture() {
    const time = departureTime.split(':');
    return moment().hours(time[0]).minutes(time[1]).fromNow();
  }

  function getTitle() {
    return (
      <div>
        <Row type="flex" justify="space-between" align="middle">
          <Col>{isRevealed ? title : ''}</Col>
          <Col>
            <Button
              onClick={() => setIsRevealed(!isRevealed)}
              className="revealed-item__reveal-title_btn"
            >
              {isRevealed ? 'Hide' : 'Reveal'}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <>
      {!isTimerFinished && (
        <Timer
          timeSeconds={TIMER_SECS}
          displayButtons={false}
          onFinished={() => setTimerFinished(true)}
        />
      )}
      {isTimerFinished && isVisible && (
        <Card
          className="revealed-item"
          title={getTitle()}
          bordered
          width={width}
        >
          <Row type="flex" justify="space-between">
            <Col>
              <p>
                <strong>Departure:</strong> {departureTime}
              </p>
              <p>
                <strong>Platform:</strong> {platform}
              </p>
            </Col>
            <Col>
              <p>
                <strong>Total Items:</strong> {totalItems}
              </p>
            </Col>
            <Col>
              <p>
                <strong>Departs</strong> {getTimeToDeparture()}
              </p>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
}

export default RevealedItem;
