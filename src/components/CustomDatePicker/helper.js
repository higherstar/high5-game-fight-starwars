export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const yearRange = 12;

export const getTwoDigits = (val) => val < 10 ? `0${val}` : val;

const isLeapYear = y => {
  return ((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0);
};

export const getDaysInMonth = (y, m) => {
  return [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];
};

export const getStartWeekDay = (y, m) => {
  return new Date(y, m).getDay();
};

export const checkValidDate = (text) => {
  for ( const char of Array.from(text) ) {
    if (!(char > -1 && char < 10) && char !== '/') {
      return false;
    }
  }

  if( text.indexOf('//') > 0 || text.split('/').length !== 3 ) {
    return false;
  }

  if ( text.split('/')[0] > 12 || text.split('/')[1] > getDaysInMonth(+text.split('/')[2], text.split('/')[0] - 1) ) {
    return false;
  }

  return true;
}
