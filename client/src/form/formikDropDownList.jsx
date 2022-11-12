import * as React from 'react';
import PropTypes from 'prop-types';
import { connect, getIn } from 'formik';
import Select from 'react-select';
import "../styles/button.scss"

const FormikDropDownList = (props) => {
  const {
    formik,
    name,
    id,
    label,
    // disabled,
    values,
    onAfterSet,
    onValueChange,
    enableDefault,
    defaulValuetLabel,
  } = props;

  const error = getIn(formik.errors, name);
  const touch = getIn(formik.touched, name);
  const formikValue = getIn(formik.values, name);
  const isInvalid = error && touch;


  const onHandleBlur = () => {
    formik.setFieldTouched(name, true, true);
    if (onAfterSet) {
      setTimeout(() => onAfterSet(), 0);
    }
  };

  const onHandleChange = (value) => {
    formik.setFieldValue(name, value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  if (enableDefault) {
    if (values.length > 0) {
      if (values[0].label !== 'NONE' && values[0].label !== defaulValuetLabel) {
        values.splice(0, 0, {
          label: defaulValuetLabel || 'NONE',
          value: 0,
          content: null,
        });
      }
    } else if (values.length === 0) {
      values.push({
        label: defaulValuetLabel || 'NONE',
        value: 0,
        content: null,
      });
    }
  }

  return (
    <div className='App'>
      {/* <div className="dropdown-container"> */}
        <label htmlFor={id} className={'text-purple'}>
          {label}
        </label>
        <Select
          id={id}
          name={name}
          options={values}
          multi={true}
          onChange={value => onHandleChange(value)}
          onBlur={onHandleBlur}
          value={formikValue}
          className="dropDown"
        />
        {isInvalid && (<div style={{ color: 'red', marginTop: '.5rem' }}>{error}</div>)}
      {/* </div> */}
    </div>
  );
};

FormikDropDownList.propTypes = {
  formik: PropTypes.any,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.string.isRequired]),
  disabled: PropTypes.bool,
  values: PropTypes.array.isRequired,
  includeDefault: PropTypes.bool,
  onAfterSet: PropTypes.func,
  withoutPortal: PropTypes.bool,
  placeholder: PropTypes.string,
  onValueChange: PropTypes.func,
  hasMarginBottom: PropTypes.bool,
  hasPadding: PropTypes.bool,
  enableDefault: PropTypes.bool,
  isBgWhite: PropTypes.bool,
  textPurple: PropTypes.bool,
  containerStyle: PropTypes.any,
  controlContainer: PropTypes.any,
  defaulValuetLabel: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default connect(FormikDropDownList);