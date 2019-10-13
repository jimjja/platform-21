import React from 'react';
import { Spin, Card } from 'antd';

function RevealedItem({
  children, isLoading, title, width, isVisible,
}) {
  if (isLoading) {
    return (
      <Card width={width}>
        <Spin />
      </Card>
    );
  }

  return isVisible && (
    <Card className="random-item" title={title} bordered width={width}>
      {children}
    </Card>
  );
}

export default RevealedItem;
