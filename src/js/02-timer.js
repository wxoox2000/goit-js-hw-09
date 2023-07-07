import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const selectors = {
  options: {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = calendar.selectedDates[0].getTime();
      const currentDate = selectors.options.defaultDate.getTime();
      if (selectedDate > currentDate) {
        selectors.start.disabled = false;
        ms = selectedDate - currentDate;
        return ms
      } else {
        selectors.start.disabled = true;
        Notify.failure('Please choose a date in the future');
      }
  
    },
  },
  start: document.querySelector('button[data-start]'),
  timeValues: document.querySelectorAll('.value'),
};

selectors.start.disabled = true;
const calendar = flatpickr('#datetime-picker', selectors.options);
function onStart() {
  selectors.start.disabled = true;
  let id = null;
  console.log(ms);
  id = setInterval(() => {
    ms -=1000;
    convertMs(ms);
    addLeadingZero(value);
    markup(formatedTime);  
    let isEnded = formatedTime.every(time => time === '00');
    if(isEnded){
      clearInterval(id);
      selectors.start.disabled = false;
      Notify.info('timer has ended:)')
    }
  }, 1000)
}

selectors.start.addEventListener('click', onStart);

let value = {};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  value.days = Math.floor(ms / day);
  // Remaining hours
  value.hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  value.minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  value.seconds = Math.floor((((ms % day) % hour) % minute) / second);
}

let formatedTime = [];
function addLeadingZero(value){
  const totalTime = Object.values(value);
  formatedTime = totalTime.map(time => {
    time = time.toString();
    if(time.length < 2){
      return time.padStart(2, '0');
    }
    return time;
  }
  );
};

function markup(formatedTime){
  for(i = 0; i < formatedTime.length; i +=1){
    selectors.timeValues[i].textContent = formatedTime[i];
  }
}
