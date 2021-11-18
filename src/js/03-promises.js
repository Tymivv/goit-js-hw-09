// all modules
import Notiflix from 'notiflix';


const btnmRef = document.querySelector('button');
const formRef = document.querySelector('form');
const delayRef = document.querySelector('input[name="delay"]');
const stepRef = document.querySelector('input[name="step"]');
const amountRef = document.querySelector("input[name='amount']");


const make = e => {
  e.preventDefault();
  for (let i = 0; i <  Number(amountRef.value); i += 1) {
    createPromise(i + 1 , Number(delayRef.value) + Number(stepRef.value) * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

formRef.addEventListener('submit', make);

function createPromise(position, delay) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        rejected({ position, delay });
      }
    }, delay);
  });
}


