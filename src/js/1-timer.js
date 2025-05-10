import flatpickr from "flatpickr";
import iziToast from "izitoast";

import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

// Переміни для кнопки та інпуту
const datePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const timerFields = document.querySelectorAll(".timer .field .value");

// Вибір дати з допомогою flatpickr
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    
   
    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future.',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  }
};


flatpickr(datePicker, options);


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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

// Функція для оновлення інтерфейсу
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}

// Змінні для таймера
let countdownInterval = null;

// Функція для запуску таймера
function startCountdown() {
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeRemaining = userSelectedDate - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      startButton.disabled = true;
      datePicker.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeRemaining);
      updateTimerDisplay({ days, hours, minutes, seconds });
    }
  }, 1000);
}

// Обробка натискання на кнопку Start
startButton.addEventListener("click", () => {
  datePicker.disabled = true;
  startButton.disabled = true;
  startCountdown();
});
