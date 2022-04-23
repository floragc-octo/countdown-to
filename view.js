const getSelection = (selector) => document.querySelector(selector)
const getSelectionText = (selector) => getSelection(selector).innerText
const getSelectionClasses = (selector) => getSelection(selector).classList
const getSelectionValue = (selector) => getSelection(selector).value

const editSelectionText = (selector, edition) => getSelection(selector).innerText = edition
const editSelectionClasses = (selector, edition) => getSelection(selector).classList = [...edition]
const addSelectionClass = (selector, edition) => getSelection(selector).classList.add(edition)
const editSelectionValue = (selector, edition) => getSelection(selector).value = edition

const updatePageTitleWithDate = (date) => {
    document.title = date;
  };
  
  const updateSelectedDateMessage = (dateToDisplay, timeToDisplay) => {
    editSelectionText(SELECTOR_DATE, `${dateToDisplay} ${timeToDisplay}`);
  };
  const updateDefaultInputValue = (selectedDate) => {
      editSelectionValue(SELECTOR_DATE_INPUT, selectedDate);
  };
  
  const timeWithLeadingZero = (time) => String(time).padStart(2, "0");
  
  const displayUpdatedInterval = (interval, selector) => {
    const currentInterval = getSelectionText(selector);
    const newInterval = timeWithLeadingZero(interval);
    if (currentInterval !== newInterval) {
      editSelectionText(selector, newInterval);
    }
  };

  const displayError = (errorMessage) => {
    editSelectionText(SELECTOR_DATE, MESSAGE_INVALID_DATE);
    editSelectionText(SELECTOR_ERROR_MESSAGE, errorMessage);
    addSelectionClass(SELECTOR_ERROR_MESSAGE, ERROR_CLASSNAME);
  };
  
  const formatDateToInputDatetime = (dateToFormat) => {
    const formattedDate = 
      [
        dateToFormat.getFullYear(),
        timeWithLeadingZero(dateToFormat.getMonth() + 1),
        timeWithLeadingZero(dateToFormat.getDate()),
      ].join("-") +
      " " +
      [
        timeWithLeadingZero(dateToFormat.getHours()),
        timeWithLeadingZero(dateToFormat.getMinutes()),
        timeWithLeadingZero(dateToFormat.getSeconds()),
      ].join(":")
      const dateForInput = formattedDate.split(' ').join("T");
      return dateForInput
  };