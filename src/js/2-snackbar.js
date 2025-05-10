// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateRadios = form.querySelectorAll('input[name="state"]');


form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const delay = Number(delayInput.value); 
  const state = Array.from(stateRadios).find(radio => radio.checked)?.value;

  if (isNaN(delay) || delay <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid delay in milliseconds.',
    });
    return;
  }


  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); 
      } else if (state === 'rejected') {
        reject(delay); 
      }
    }, delay);
  });


  promise
    .then((delay) => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${delay}ms`,
      });
    });
});
