import React, { useEffect } from 'react';
import {
  Form, Button, DatePicker, TimePicker,
} from 'antd';
import moment from 'moment';

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
    props.form.validateFields((err, { timeDeparture, dateDeparture }) => {
      if (err) {
        return;
      }

      time = timeDeparture;
      date = dateDeparture;
    });

    if (!time || !date) {
      return;
    }

    if (props.onSubmit) {
      props.onSubmit(date, time);
    }
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item
        validateStatus={dateDepartureError ? 'error' : ''}
        help={dateDepartureError || ''}
      >
        {getFieldDecorator('dateDeparture', {
          rules: [
            { required: true, message: 'Please input your departure date!' },
          ],
        })(
          <DatePicker
            placeholder="Departure Date"
            initialValue={moment(new Date(), 'DD-MM-YYYY')}
            onChange={(date, dateStr) => {
              setFieldsValue({ dateDeparture: dateStr });
            }}
          />,
        )}
      </Form.Item>
      <Form.Item
        validateStatus={timeDepartureError ? 'error' : ''}
        help={timeDepartureError || ''}
      >
        {getFieldDecorator('timeDeparture', {
          rules: [
            { required: true, message: 'Please input your departure time!' },
          ],
        })(
          <TimePicker
            initialValue={moment(new Date(), 'HH:mm:ss')}
            format="HH:mm"
            onChange={(currTime, currTimeStr) => {
              setFieldsValue({ timeDeparture: currTimeStr });
            }}
          />,

        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
        >
          Search
        </Button>
      </Form.Item>
    </Form>
  );
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(
  SearchDeparturesForms,
);

export default WrappedHorizontalLoginForm;
