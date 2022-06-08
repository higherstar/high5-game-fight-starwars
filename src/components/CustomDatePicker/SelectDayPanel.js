import React from 'react';
import PropTypes from 'prop-types';

import { getStartWeekDay, getDaysInMonth, weekDays } from "./helper";

export const SelectDayPanel = ({ currentYear, currentMonth, year, month, day, onSetDate }) => (
  <div className="grid grid-cols-7 pb-3">
    {weekDays.map((weekDay, i) => (
      <div key={`weekday-${i}`} className="col-span-1 text-center cursor-pointer text-gray-500 pb-3 text-sm">{weekDay}</div>
    ))}
    {getStartWeekDay(currentYear, currentMonth) > 0 && (
      <div className={`col-span-${getStartWeekDay(currentYear, currentMonth)}`}></div>
    )}
    {[...new Array(getDaysInMonth(currentYear, currentMonth))].map((_, i) => (
      <div
        key={`day-${i}`}
        onClick={() => onSetDate(currentYear, currentMonth, i + 1)}
        className="col-span-1 text-center py-0.5 text-sm"
      >
        <button
          type="button"
          className={`rounded-full ${(day === (i + 1) && month === currentMonth && year === currentYear) ? `bg-blue-600 text-white` : "hover:bg-gray-200"}`}
          style={{width: 30, height: 30, outline: 0}}
        >
          {i + 1}
        </button>
      </div>
    ))}
  </div>
);

SelectDayPanel.propTypes = {
  currentYear: PropTypes.number,
  currentMonth: PropTypes.number,
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  onSetDate: PropTypes.func,
  colorClass: PropTypes.string
};
