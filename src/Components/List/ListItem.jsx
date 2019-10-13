import React from 'react';
import { List } from 'antd';
import './ListItem.less';

function ListItem({ item }) {
  return (
    <List.Item key={item.aimed_departure_time} className="list-item">
      <List.Item.Meta
        title={<h3>{item.destination_name}</h3>}
        description={(
          <>
            <p className="list-item__paragraph">
              <strong>Departure:</strong>
              {' '}
              {item.aimed_departure_time}
            </p>
            <p className="list-item-paragraph">
              <strong>Platform:</strong>
              {' '}
              {item.platform}
            </p>
          </>
)}
      />
    </List.Item>
  );
}

export default ListItem;
