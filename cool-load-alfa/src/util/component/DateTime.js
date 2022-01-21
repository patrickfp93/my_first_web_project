import bulmaCalendar from "bulma-calendar";
import { useEffect } from "react";

function DateTime({ onSelected, options, startDateValue, endDateValue }) {
  const update = () => {
    const element = document.querySelector('#date-time');
    if (element) {
      let dp = element.bulmaCalendar.datePicker;
      if (startDateValue instanceof Date) {
        dp._date.start = startDateValue;
      }
      if (endDateValue instanceof Date){
        dp._date.end = endDateValue;
      }
      if(!element.bulmaCalendar.isOpen())element.bulmaCalendar.save();
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', (datepicker) => {
        if (onSelected) onSelected(datepicker);
      });
    }
  };
  useEffect(() => {
    // Initialize all input of date type.
    const calendars = bulmaCalendar.attach('#date-time', (options) ? options : {});
    update();
    // Loop on each calendar initialized
    calendars.forEach((calendar) => {
      // Add listener to date:selected event
      calendar.on('date:selected', (date) => {
        if (onSelected) onSelected(date);
      });
    });

    // To access to bulmaCalendar instance of an element
    // eslint-disable-next-line no-undef

  }, [onSelected,options,update]);
  update();
  return (
    <input id="date-time" type="date" />
  );
}


export default DateTime;