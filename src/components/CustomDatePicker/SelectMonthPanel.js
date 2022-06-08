import React from 'react';
import PropTypes from 'prop-types';

import { monthNames } from "./helper";

export const SelectMonthPanel = ({ currentYear, currentMonth, year, month, showedYear, onChangeCurrentMonth }) => (
  <div className="grid grid-cols-3">
    {monthNames.map((monthName, i) => (
      <div key={`month-${i}`} className="col-span-1 text-center font-medium px-2 py-4">
        <button
          type="button"
          onClick={() => onChangeCurrentMonth(i)}
          className={`rounded-full ${(currentYear === year && i === month) ? `bg-blue-600 text-white` : (showedYear === currentYear && i === currentMonth) ? "bg-gray-200" : "hover:bg-gray-200"}`}
          style={{width: 70, height: 30, outline: 0}}
        >
          {monthName.substr(0, 3).toUpperCase()}
        </button>
      </div>
    ))}
  </div>
);

SelectMonthPanel.propTypes = {
  currentYear: PropTypes.number,
  currentMonth: PropTypes.number,
  year: PropTypes.number,
  month: PropTypes.number,
  showedYear: PropTypes.number,
  onChangeCurrentMonth: PropTypes.func,
  colorClass: PropTypes.string,
};
