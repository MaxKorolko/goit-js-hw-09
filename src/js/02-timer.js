import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

require('flatpickr/dist/themes/material_blue.css');

const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),
  daysEl: document.querySelector('.value[data-days]'),
  hoursEl: document.querySelector('.value[data-hours]'),
  minutesEl: document.querySelector('.value[data-minutes]'),
  secondsEl: document.querySelector('.value[data-seconds]'),
};

refs.startBtnEl.setAttribute('disabled', true);

refs.startBtnEl.addEventListener('click', startCounter);

let currentDate = new Date();
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= currentDate) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = currentDate;
      return;
    }
    userSelectedDate = new Date(selectedDates);
    refs.startBtnEl.removeAttribute('disabled');
  },
};

flatpickr(refs.inputEl, options);

function startCounter() {
  const timerId = setInterval(() => {
    currentDate = new Date();
    const differenceData = convertMs(userSelectedDate - currentDate);
    updatesCounter(differenceData);

    if (Object.values(differenceData).every(value => value === 0)) {
      clearInterval(timerId);
    }
  }, 1000);

  refs.startBtnEl.setAttribute('disabled', true);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updatesCounter(object) {
  const { days, hours, minutes, seconds } = object;

  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
