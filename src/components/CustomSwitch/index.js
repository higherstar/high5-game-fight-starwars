import React, { useState } from 'react';
import PropTypes from 'prop-types';

const getColorClass = (isOn) => {
  if (!isOn) {
    return 'gray-200';
  } else {
    return 'blue-600';
  }
};

const CustomSwitch = ({ value, label, onChange }) => {
  const colorClass = getColorClass(value);
  
  const handleChange = () => {
    onChange(!value);
  }

  return (
    <button
      type="button"
      aria-pressed="false"
      className={`flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${colorClass}`}
      onClick={handleChange}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className={`bg-${colorClass} absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200`}></span>
      <span aria-hidden="true" className={`${value ? 'translate-x-5' : 'translate-x-0'} absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200`}></span>
    </button>
  );
};

CustomSwitch.propTypes = {
  defaultValue: PropTypes.bool,
  label: PropTypes.string,
};

CustomSwitch.defaultProps = {
  defaultValue: false,
  label: '',
  color: 'default',
};

export default CustomSwitch;
