import React, { useState } from 'react';
import { Tag, Button } from 'antd';

function DataField({ isDisabled, value, children }) {
  const [readOnly, setReadOnly] = useState(true);

  function getTag() {
    return <Tag>{value}</Tag>;
  }

  function getStatefulField() {
    if (readOnly) {
      return <Tag closable onClose={() => { setReadOnly(!readOnly); }}> {value}</Tag>;
    }
    return (
      <>
        <span>{children}</span>
        <span>
          <Button type="default" icon="close" />
        </span>
      </>
    );
  }

  return isDisabled ? getTag() : getStatefulField();
}

export default DataField;
