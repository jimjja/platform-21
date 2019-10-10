import React, { useState } from 'react';
import './App.css';
import {
  List,
} from 'antd';
import { getTrains } from './api';
import Form from './Components/Form';

import 'antd/dist/antd.css';

function App() {
  const [departures, setDepartures] = useState([]);

  async function getDepartures(date, time) {
    const result = await getTrains(date, time);
    setDepartures(result);
  }

  return (
    <div className="App">
      <Form onSubmit={getDepartures} />
      <List
        itemLayout="horizontal"
        dataSource={departures}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.destination_name}
              description={`Departure: ${item.aimed_departure_time} | Platform: ${item.platform}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
