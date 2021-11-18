// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';


const btn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

let timeDifference = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeDifference = selectedDates[0].getTime() - Date.now();
  },
};

flatpickr('#datetime-picker', options);


btn.addEventListener('click', () => {
  if (timeDifference > 0) {
    console.log(timeDifference);
    btn.disabled = true;
    input.disabled = true;
  } else {
    window.alert('Please choose a date in the future');
    return;
  }
  timerId = setInterval(() => {
    timeDifference -= 1000;
    if (timeDifference <= 0) {
      clearInterval(timerId);
      input.disabled = false;
      return;
    }
    const timeD = convertMs(timeDifference);
    spanDays.textContent = `${timeD.days}`;
    spanHours.textContent = `${timeD.hours}`;
    spanMinutes.textContent = `${timeD.minutes}`;
    spanSeconds.textContent = `${timeD.seconds}`;
  }, 1000);
});



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = String(Math.floor(ms / day)).padStart(2, '0');
  // Remaining hours
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
  // Remaining minutes
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2, '0');
  // Remaining seconds
  const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2, '0');
  return { days, hours, minutes, seconds };
}


