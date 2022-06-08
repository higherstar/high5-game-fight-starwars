import React from 'react';
import PropTypes from 'prop-types';

import { yearRange } from "./helper";

export const SelectYearPanel = ({ year, showedYear, rangeStartYear, onChangeCurrentYear }) => (
  <div className="grid grid-cols-3">
    {[...new Array(yearRange)].map((_, i) => (
      <div key={`year-${i}`} className="col-span-1 text-center font-medium px-2 py-4">
        <button
          type="button"
          onClick={() => onChangeCurrentYear(i + rangeStartYear)}
          className={`rounded-full ${((i + rangeStartYear) === year) ? `bg-blue-600 text-white` : ((i + rangeStartYear) === showedYear) ? "bg-gray-200" : "hover:bg-gray-200"}`}
          style={{width: 70, height: 30, outline: 0}}
        >
          {i + rangeStartYear}
        </button>
      </div>
    ))}
  </div>
);

SelectYearPanel.propTypes = {
  year: PropTypes.number,
  showedYear: PropTypes.number,
  rangeStartYear: PropTypes.number,
  onChangeCurrentYear: PropTypes.func,
  colorClass: PropTypes.string,
};
