import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Collapse,
} from 'antd';
import moment from 'moment';
import DataField from '../DataField';
import './Form.less';
import Trains from '../../Data/trains.json';
import Select from '../Select';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

function SearchDeparturesForms(props) {
  const [manualTimeSetup, setManualTimeSetup] = useState(false);

  const {
    form: {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
      setFieldsValue,
      getFieldValue,
    },
  } = props;

  const dateDepartureError = isFieldTouched('date-departure') && getFieldError('date-departure');
  const timeDepartureError = isFieldTouched('time-departure') && getFieldError('time-departure');

  useEffect(() => {
    if (manualTimeSetup) {
      return () => {};
    }

    const interval = setInterval(() => {
      setFieldsValue({ timeDeparture: moment() });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    props.form.validateFields();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    let time;
    let date;
    let offsetFrom;
    let offsetTo;
    let station;

    props.form.validateFields(
      (
        err,
        {
          timeDeparture,
          dateDeparture,
          timeOffsetFrom,
          timeOffsetTo,
          trainStation,
        },
      ) => {
        if (err) {
          return;
        }

        time = timeDeparture;
        date = dateDeparture;
        offsetFrom = timeOffsetFrom;
        offsetTo = timeOffsetTo;
        station = trainStation;
      },
    );

    if (!time || !date || !offsetFrom || !offsetTo || !station) {
      return;
    }

    if (props.onSubmit) {
      props.onSubmit({
        date,
        time,
        offsetFrom,
        offsetTo,
        trainStation: station,
      });
    }
  }

  function getDataValue(field, format) {
    const fieldValue = getFieldValue(field);
    if (fieldValue) {
      return fieldValue.format(format);
    }
    return fieldValue;
  }

  function disabledDate(current) {
    return (
      current
      && current
        < moment()
          .subtract(1, 'days')
          .endOf('day')
    );
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Row>
        <Collapse
          bordered={false}
        >
          <Collapse.Panel
            header="Options"
            key="1"
            className="departure-form__options"
          >
            <Row>
              <Form.Item
                placeholder="Enter train station"
                label="Train Station"
                validateStatus={dateDepartureError ? 'error' : ''}
                help={dateDepartureError || ''}
              >
                <DataField
                  label="Train Station"
                  value={getFieldValue('trainStation')}
                  isDisabled={false}
                >
                  {getFieldDecorator('trainStation', {
                    initialValue: 'KGX',
                    rules: [
                      {
                        required: true,
                        message: 'Please input departure train station!',
                      },
                    ],
                  })(
                    <Select
                      style={{ width: 200 }}
                      showSearch
                      placeholder="Select train station"
                      onChange={(station) => {
                        setFieldsValue({ trainStation: station });
                      }}
                      data={Trains}
                    />,
                  )}
                </DataField>
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                label="Departure Date"
                validateStatus={dateDepartureError ? 'error' : ''}
                help={dateDepartureError || ''}
              >
                <DataField
                  label="Departure Date"
                  value={getDataValue('dateDeparture', 'DD-MM-YYYY')}
                  isDisabled={false}
                >
                  {getFieldDecorator('dateDeparture', {
                    initialValue: moment(),
                    rules: [
                      {
                        required: true,
                        message: 'Please input your departure date!',
                      },
                    ],
                  })(
                    <DatePicker
                      placeholder="Departure Date"
                      disabledDate={disabledDate}
                      onChange={(date, dateStr) => {
                        setFieldsValue({ dateDeparture: dateStr });
                      }}
                    />,
                  )}
                </DataField>
              </Form.Item>
              <Form.Item
                label="Departure Time"
                validateStatus={timeDepartureError ? 'error' : ''}
                help={timeDepartureError || ''}
              >
                <DataField
                  value={getDataValue('timeDeparture', 'HH:mm')}
                  isDisabled={false}
                >
                  {getFieldDecorator('timeDeparture', {
                    initialValue: moment(),
                    rules: [
                      {
                        required: true,
                        message: 'Please input your departure time!',
                      },
                    ],
                  })(
                    <TimePicker
                      format="HH:mm:ss"
                      onOpenChange={() => {
                        setManualTimeSetup(true);
                      }}
                      onChange={(t, currTimeStr) => {
                        setFieldsValue({ timeDeparture: currTimeStr });
                      }}
                    />,
                  )}
                </DataField>
              </Form.Item>
            </Row>
            <Row>
              <p style={{ margin: 0 }}>Time range for train departures</p>
            </Row>
            <Row>
              <Form.Item
                label="From"
                validateStatus={timeDepartureError ? 'error' : ''}
                help={timeDepartureError || ''}
              >
                <DataField
                  label="From"
                  value={getDataValue('timeOffsetFrom', 'HH:mm')}
                  isDisabled={false}
                >
                  {getFieldDecorator('timeOffsetFrom', {
                    initialValue: moment()
                      .seconds(0)
                      .minutes(15)
                      .hours(0),
                    rules: [
                      {
                        required: true,
                        message: 'Please input from time offset!',
                      },
                    ],
                  })(
                    <TimePicker
                      format="HH:mm"
                      onChange={(currTime, currTimeStr) => {
                        setFieldsValue({ timeOffsetFrom: currTimeStr });
                      }}
                    />,
                  )}
                </DataField>
              </Form.Item>
              <Form.Item
                label="To"
                validateStatus={timeDepartureError ? 'error' : ''}
                help={timeDepartureError || ''}
              >
                <DataField
                  label="To"
                  value={getDataValue('timeOffsetTo', 'HH:mm')}
                  isDisabled={false}
                >
                  {getFieldDecorator('timeOffsetTo', {
                    initialValue: moment()
                      .seconds(0)
                      .minutes(45)
                      .hours(0),
                    rules: [
                      {
                        required: true,
                        message: 'Please input from time offset!',
                      },
                    ],
                  })(
                    <TimePicker
                      format="HH:mm"
                      onChange={(currTime, currTimeStr) => {
                        setFieldsValue({ timeOffsetTo: currTimeStr });
                      }}
                    />,
                  )}
                </DataField>
              </Form.Item>
            </Row>
          </Collapse.Panel>
        </Collapse>
      </Row>
      <Row type="flex" justify="center">
        <Col>
          <Button
            shape="circle"
            size="large"
            // block
            className="departure-form__search-button"
            type="switch"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            GO
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

const WrappedHorizontalLoginForm = Form.create({ name: 'departure-form' })(
  SearchDeparturesForms,
);

export default WrappedHorizontalLoginForm;
