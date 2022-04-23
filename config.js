const options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const locale = navigator.language;

const SEARCH_PARAM_DATE = "date";

const HOUR_LIMITER = "h";

const SELECTOR_TIMER = "#timer-";
const SELECTOR_DAY = `${SELECTOR_TIMER}day`;
const SELECTOR_HOUR = `${SELECTOR_TIMER}hour`;
const SELECTOR_MINUTE = `${SELECTOR_TIMER}minute`;
const SELECTOR_SECOND = `${SELECTOR_TIMER}second`;
const SELECTOR_DATE = "#date";
const SELECTOR_ERROR_MESSAGE = "#error-message";
const SELECTOR_DATE_INPUT = "#selection-date"
const SELECTOR_DATE_FORM = "#selection-date-form"

const MILLI = 1000;
const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;
const MILLI_SECONDS = MILLI * SECONDS;
const MINUTES_IN_MILLI_SECONDS = MILLI_SECONDS * MINUTES;
const HOURS_IN_MILLI_SECONDS = MINUTES_IN_MILLI_SECONDS * HOURS;

const MESSAGE_INVALID_DATE = "?"
const MESSAGE_ERROR_INVALID_DATE = "This date doesn't seem valid"
const MESSAGE_ERROR_PAST_DATE = "This date is in the past"

const ERROR_CLASSNAME = "error"
