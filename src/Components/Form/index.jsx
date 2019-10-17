import React, { useEffect, useState } from 'react';
import {
  Form, Button, DatePicker, TimePicker, Row, Col, Collapse,
} from 'antd';
import moment from 'moment';
import DataField from '../DataField';
import './Form.less';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

function SearchDeparturesForms(props) {
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
    props.form.validateFields();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    let time;
    let date;
    let offsetFrom;
    let offsetTo;

    props.form.validateFields(
      (err, {
        timeDeparture, dateDeparture, timeOffsetFrom, timeOffsetTo,
      }) => {
        if (err) {
          return;
        }

        time = timeDeparture;
        date = dateDeparture;
        offsetFrom = timeOffsetFrom;
        offsetTo = timeOffsetTo;
      },
    );

    if (!time || !date || !offsetFrom || !offsetTo) {
      return;
    }

    if (props.onSubmit) {
      props.onSubmit({
        date,
        time,
        offsetFrom,
        offsetTo,
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

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Row>
        <Collapse bordered={false}>
          <Collapse.Panel
            header="Options"
            key="1"
            className="departure-form__options"
          >
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
                      format="HH:mm"
                      onChange={(currTime, currTimeStr) => {
                        setFieldsValue({ timeDeparture: currTimeStr });
                      }}
                    />,
                  )}
                </DataField>
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                label="Offset Time From"
                validateStatus={timeDepartureError ? 'error' : ''}
                help={timeDepartureError || ''}
              >
                <DataField
                  label="Offset Time From"
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
                label="Offset Time To"
                validateStatus={timeDepartureError ? 'error' : ''}
                help={timeDepartureError || ''}
              >
                <DataField
                  label="Offset Time To"
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
      <Row>
        <Col>
          <Button
            size="large"
            block
            className="departure-form__search-button"
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Play
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
