import React, { useState } from 'react';
import { Tag } from 'antd';

function DataField({ isDisabled, value, children }) {
  const [readOnly, setReadOnly] = useState(true);

  function getTag() {
    return <Tag>{value}</Tag>;
  }

  function getStatefulField() {
    if (readOnly) {
      return <Tag closable onClose={() => { setReadOnly(!readOnly); }}> {value}</Tag>;
    }
    return children;
  }

  return isDisabled ? getTag() : getStatefulField();
}

export default DataField;
