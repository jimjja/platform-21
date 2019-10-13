import React from 'react';
import { List } from 'antd';
import ListItem from './ListItem';
import './List.less';

function TrainsList(props) {
  return (
    <section className="list-wrapper">
      <List
        theme="dark"
        itemLayout="horizontal"
        dataSource={props.data}
        bordered
        renderItem={(item) => <ListItem item={item} />}
      />
    </section>
  );
}

export default TrainsList;
