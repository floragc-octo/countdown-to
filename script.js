const options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const locale = navigator.language;

const SEARCH_PARAM_DATE = "date";

const HOUR_LIMITER = "h";

const SELECTOR_DAY = "timer-day";
const SELECTOR_HOUR = "timer-hour";
const SELECTOR_MINUTE = "timer-minute";
const SELECTOR_SECOND = "timer-second";
const SELECTOR_DATE = "date";
const SELECTOR_ERROR_MESSAGE = "error-message";

const MILLI = 1000;
const SECOND = 60;
const MINUTE = 60;
const HOURS = 24;

// Display methods

const updatePageTitleWithDate = (date) => {
  document.title = date;
};

const updateSelectedDateMessage = (dateToDisplay, timeToDisplay) => {
  document.querySelector(
    `#${SELECTOR_DATE}`
  ).innerText = `${dateToDisplay} ${timeToDisplay}`;
};


const getTimeWithLeadingZero = (time) => String(time).padStart(2, "0");

const updateInterval = (interval, selector) => {
  document.querySelector(`#${selector}`).innerText = getTimeWithLeadingZero(interval);
};

const displayError = (errorMessage) => {
  document.querySelector(`#${SELECTOR_DATE}`).innerText = "?";
  document.querySelector(`#${SELECTOR_ERROR_MESSAGE}`).innerText = errorMessage;
  document.querySelector(`#${SELECTOR_ERROR_MESSAGE}`).className = "error";
};

// Calculations

const getInterval = (interval) => ({
  days: Math.floor(interval / (MILLI * SECOND * MINUTE * HOURS)),
  hours: Math.floor((interval % (MILLI * SECOND * MINUTE * HOURS)) / (MILLI * SECOND * MINUTE)),
  minutes: Math.floor((interval % (MILLI * SECOND * MINUTE)) / (MILLI * SECOND)),
  seconds: Math.floor((interval % (MILLI * SECOND)) / MILLI),
});

const isValidDate = (date) => date instanceof Date && !isNaN(date);

const calculateInterval = (dateFrom, dateTo) => dateTo - dateFrom;

// Timer

  function timer(selectedDate) {
    const currentDate = new Date();
    const interval = calculateInterval(currentDate, selectedDate);

    if (interval < 0) {
      displayError("This date is in the past");
    }
    const { days, hours, minutes, seconds } = getInterval(interval);
    updateInterval(days, SELECTOR_DAY);
    updateInterval(hours, SELECTOR_HOUR);
    updateInterval(minutes, SELECTOR_MINUTE);
    updateInterval(seconds, SELECTOR_SECOND);
  }

const initTimer = (selectedDate) => {

  // YYYY-MM-DDTHH:mm:ss.sssZ
  // 2022-06-14T12:34:12.789Z
  const selectionAsDate = new Date(selectedDate);

  if (!isValidDate(selectionAsDate)) {
    displayError("This date doesn't seem valid");
    return
  } 
    const dateToDisplay = selectionAsDate.toLocaleDateString(locale, options);
    const timeToDisplay = getTimeWithLeadingZero(selectionAsDate.getUTCHours()) + HOUR_LIMITER + getTimeWithLeadingZero(selectionAsDate.getUTCMinutes());

    updatePageTitleWithDate(dateToDisplay);
    updateSelectedDateMessage(dateToDisplay, timeToDisplay);

    return timerInterval = window.setInterval(timer, 1000, selectedDate);
};

// INIT

document.querySelector("#date-selector").onsubmit = (event) => {
  event.preventDefault();
  const value = document.getElementById("selection-date").value;
  const timer = initTimer(new Date(value));
};
