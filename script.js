// Calculations

const getDateInterval = (interval) => ({
  days: Math.floor(interval / HOURS_IN_MILLI_SECONDS),
  hours: Math.floor((interval % HOURS_IN_MILLI_SECONDS) / MINUTES_IN_MILLI_SECONDS),
  minutes: Math.floor((interval % MINUTES_IN_MILLI_SECONDS) / MILLI_SECONDS),
  seconds: Math.floor((interval % MILLI_SECONDS) / MILLI),
});

const isValidDate = (date) => date instanceof Date && !isNaN(date);

const calculateInterval = (dateFrom, dateTo) => dateTo - dateFrom;

// Timer

function timer(selectedDate) {
  const currentDate = new Date();
  const interval = calculateInterval(currentDate, selectedDate);

  if (interval < 0) {
    displayError(MESSAGE_ERROR_PAST_DATE);
  }
  const { days, hours, minutes, seconds } = getDateInterval(interval);
  displayUpdatedInterval(days, SELECTOR_DAY);
  displayUpdatedInterval(hours, SELECTOR_HOUR);
  displayUpdatedInterval(minutes, SELECTOR_MINUTE);
  displayUpdatedInterval(seconds, SELECTOR_SECOND);
}

let sessionTimer;

const initTimer = (selectedDate) => {
  // YYYY-MM-DDTHH:mm:ss.sssZ
  // 2022-06-14T12:34:12.789Z
  window.clearInterval(sessionTimer);
  sessionTimer = null;

  if (!isValidDate(selectedDate)) {
    displayError(MESSAGE_ERROR_INVALID_DATE);
    return;
  }
  const dateToDisplay = selectedDate.toLocaleDateString(locale, options);
  const timeToDisplay =
    timeWithLeadingZero(selectedDate.getHours()) +
    HOUR_LIMITER +
    timeWithLeadingZero(selectedDate.getMinutes());

  updatePageTitleWithDate(dateToDisplay);
  updateSelectedDateMessage(dateToDisplay, timeToDisplay);
  updateDefaultInputValue(formatDateToInputDatetime(selectedDate));

  sessionTimer = window.setInterval(timer, 1000, selectedDate);
};