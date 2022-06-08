import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { SelectDayPanel } from "./SelectDayPanel";
import { SelectMonthPanel } from "./SelectMonthPanel";
import { SelectYearPanel } from "./SelectYearPanel";

import { getTwoDigits, monthNames, yearRange, checkValidDate } from "./helper";

const CustomDatePicker = ({ value, defaultValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [showedYear, setShowedYear] = useState(new Date().getFullYear());
  const [selectMode, setSelectMode] = useState("day");
  const [rangeStartYear, setRangeStartYear] = useState(new Date().getFullYear() - 10);
  const [dateLabel, setDateLabel] = useState('');
  const toggleContainer = React.createRef();

  useEffect(() => {
    const dateValue = value || defaultValue;
    if (dateValue) {
      setYear(dateValue.getFullYear());
      setMonth(dateValue.getMonth());
      setDay(dateValue.getDate());
      setDateLabel(`${getTwoDigits(dateValue.getMonth() + 1)}/${getTwoDigits(dateValue.getDate())}/${dateValue.getFullYear()}`);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", onClickOutsideHandler);

    return () => {
      window.removeEventListener("click", onClickOutsideHandler);
    }
  });

  const onClickOutsideHandler = event => {
    if (isOpen && toggleContainer.current && !toggleContainer.current.contains(event.target)) {
      setIsOpen(false);
      setSelectMode("day");
    }
  }

  const handleSwitchDropdown = () => {
    if (!isOpen) {
      setCurrentYear(year ? year : new Date().getFullYear());
      setCurrentMonth(month >= 0 ? month : new Date().getMonth());
      setRangeStartYear((year ? year : new Date().getFullYear()) - 10)
    }
    setIsOpen(!isOpen);
  };

  const handlePrev = () => {
    if (selectMode === "day") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
        setShowedYear(currentYear);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else if (selectMode === "month") {
      setCurrentYear(currentYear - 1);
    } else if (selectMode === "year") {
      setRangeStartYear(rangeStartYear - yearRange);
    }
  };

  const handleNext = () => {
    if (selectMode === "day") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
        setShowedYear(currentYear);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (selectMode === "month") {
      setCurrentYear(currentYear + 1);
    } else if (selectMode === "year") {
      setRangeStartYear(rangeStartYear + yearRange);
    }
  };

  const setDate = (y, m, d) => {
    setYear(y);
    setMonth(m);
    setDay(d);
    setDateLabel(`${getTwoDigits(m + 1)}/${getTwoDigits(d)}/${y}`);
    onChange(new Date(y, m, d));
    handleSwitchDropdown();
  };

  const setDateFromTextInput = (text) => {
    if (checkValidDate(text)) {
      setYear(+text.split('/')[2]);
      setMonth(text.split('/')[0] - 1);
      setDay(+text.split('/')[1]);
      setDateLabel(`${getTwoDigits(+text.split('/')[0])}/${getTwoDigits(+text.split('/')[1])}/${+text.split('/')[2]}`);
    } else {
      setYear();
      setMonth();
      setDay();
      setDateLabel("");
    }
  };

  const changeCurrentMonth = m => {
    setCurrentMonth(m);
    setShowedYear(currentYear);
    setSelectMode("day");
  };

  const changeCurrentYear = y => {
    setCurrentYear(y);
    setSelectMode("month");
  };

  return (
    <div className="relative inline-block text-left w-56">
        <div
            className="inline-flex justify-between items-center w-full border-b-1 border-black shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            aria-haspopup="true" aria-expanded="true"
        >
          <input onBlur={(e) => setDateFromTextInput(e.target.value)} onChange={(e) => setDateLabel(e.target.value)} value={dateLabel} placeholder="MM/dd/YYYY" type="text" className="w-full h-full font-semibold hover:bg-gray-50 focus:outline-none px-4 py-2" />
          <button type="button" onClick={handleSwitchDropdown} className="absolute right-4 focus:outline-none">
            <svg
                className="-mr-1 ml-2 h-5 w-5 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
              <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
            </svg>
          </button>
        </div>
        <transition
            enter-active-class="transition ease-out duration-200"
            leave-active-class="transition ease-in duration-150"
            enter-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
            ref={toggleContainer}
        >
          <div
              style={{display: isOpen ? "block" : "none"}}
              className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 px-4 z-10"
          >
            <div className="py-1">
              <div className="flex justify-between py-4">
                <button type="button" onClick={handlePrev}  className="focus:outline-none hover:bg-gray-200 rounded-full p-1">
                  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g
                        id="Stockholm-icons-/-Navigation-/-Angle-left"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                    >
                      <polygon points="0 0 24 0 24 24 0 24"/>
                      <path
                          d="M6.70710678,15.7071068 C6.31658249,16.0976311 5.68341751,16.0976311 5.29289322,15.7071068 C4.90236893,15.3165825 4.90236893,14.6834175 5.29289322,14.2928932 L11.2928932,8.29289322 C11.6714722,7.91431428 12.2810586,7.90106866 12.6757246,8.26284586 L18.6757246,13.7628459 C19.0828436,14.1360383 19.1103465,14.7686056 18.7371541,15.1757246 C18.3639617,15.5828436 17.7313944,15.6103465 17.3242754,15.2371541 L12.0300757,10.3841378 L6.70710678,15.7071068 Z"
                          id="Path-94" fill="#000000" fillRule="nonzero"
                          transform="translate(12.000003, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-12.000003, -11.999999) ">
                      </path>
                    </g>
                  </svg>
                </button>

                <p className="text-lg py-0.5 px-4 hover:bg-gray-200 rounded-full">
                  {selectMode === "day" && <span className="cursor-pointer" onClick={() => setSelectMode("month")}>{monthNames[currentMonth]} {currentYear}</span>}
                  {selectMode === "month" && <span className="cursor-pointer" onClick={() => setSelectMode("year")}>{currentYear}</span>}
                  {selectMode === "year" && <span className="cursor-pointer" onClick={() => setSelectMode("day")}>{rangeStartYear} - {rangeStartYear + yearRange - 1}</span>}
                </p>

                <button type="button" onClick={handleNext} className="focus:outline-none hover:bg-gray-200 rounded-full p-1">
                  <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g id="Stockholm-icons-/-Navigation-/-Angle-right" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <polygon points="0 0 24 0 24 24 0 24"/>
                      <path
                          d="M6.70710678,15.7071068 C6.31658249,16.0976311 5.68341751,16.0976311 5.29289322,15.7071068 C4.90236893,15.3165825 4.90236893,14.6834175 5.29289322,14.2928932 L11.2928932,8.29289322 C11.6714722,7.91431428 12.2810586,7.90106866 12.6757246,8.26284586 L18.6757246,13.7628459 C19.0828436,14.1360383 19.1103465,14.7686056 18.7371541,15.1757246 C18.3639617,15.5828436 17.7313944,15.6103465 17.3242754,15.2371541 L12.0300757,10.3841378 L6.70710678,15.7071068 Z"
                          id="Path-94" fill="#000000" fillRule="nonzero"
                          transform="translate(12.000003, 11.999999) rotate(-270.000000) translate(-12.000003, -11.999999) ">
                      </path>
                    </g>
                  </svg>
                </button>
              </div>
              {selectMode === "day" && (
                  <SelectDayPanel
                      currentYear={currentYear}
                      currentMonth={currentMonth}
                      year={year}
                      month={month}
                      day={day}
                      onSetDate={setDate} />
              )}

              {selectMode === "month" && (
                  <SelectMonthPanel
                      currentYear={currentYear}
                      currentMonth={currentMonth}
                      year={year}
                      month={month}
                      showedYear={showedYear}
                      onChangeCurrentMonth={changeCurrentMonth} />
              )}

              {selectMode === "year" && (
                  <SelectYearPanel
                      year={year}
                      showedYear={showedYear}
                      rangeStartYear={rangeStartYear}
                      onChangeCurrentYear={changeCurrentYear} />
              )}
            </div>
          </div>
        </transition>
      </div>
  );
};

CustomDatePicker.propTypes = {
  defaultValue: PropTypes.object
};

export default CustomDatePicker;
