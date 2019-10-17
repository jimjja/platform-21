import React, { useState, useRef } from 'react';
import { Spin, Select } from 'antd';
import { debounce } from '../../Services/helpers';

function SelectCustom({ data, ...rest }) {
  const [currData, setCurrData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const lastFetchId = useRef(0);

  function fetchData(val) {
    if (val.length < 2) {
      return Promise.resolve();
    }

    lastFetchId.current += 1;
    const fetchId = lastFetchId.current;
    setCurrData([]);
    setIsFetching(true);

    return new Promise((resolve) => {
      if (fetchId !== lastFetchId.current) {
        return;
      }

      const valToLower = val.toLowerCase();
      const result = data.filter(
        (t) => t.stationName.toLowerCase().includes(valToLower)
          || t.crsCode.toLowerCase().includes(valToLower),
      );
      setCurrData(result);
      setIsFetching(false);
      resolve();
    });
  }

  return (
    <Select
      {...rest}
      onSearch={debounce(fetchData, 800)}
      notFoundContent={isFetching ? <Spin size="small" /> : null}
      filterOption={false}
    >
      {currData.map((t) => (
        <Select.Option key={t.crsCode} value={t.crsCode}>
          {t.stationName}
        </Select.Option>
      ))}
    </Select>
  );
}

export default SelectCustom;
