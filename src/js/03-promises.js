import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');
const selectors = {
  delayInput: form.delay,
  stepInput: form.step,
  amountInput: form.amount,
  createBtn: document.querySelector('.form button'),
};
console.log(selectors.createBtn);

const handlerSubmit = function (evt) {
  evt.preventDefault()
  let position = 0;
  let step = Number(selectors.stepInput.value);
  let amount = Number(selectors.amountInput.value);
  let delay = Number(selectors.delayInput.value);
  let timeStep = -step;
  let timeId = null;
  setInterval(() => {
    position +=1;
    timeId = setTimeout(() => {
      if(position > 1){
        delay += step;
      }
      createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    }, step)
    if(position > amount){
      clearTimeout(timeId);
    } 
  
  }, delay);
};
form.addEventListener('submit', handlerSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
  return promise;
}
