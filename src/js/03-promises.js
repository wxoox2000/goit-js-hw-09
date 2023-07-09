import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');
const selectors = {
  delayInput: form.delay,
  stepInput: form.step,
  amountInput: form.amount,
  createBtn: document.querySelector('.form button'),
};
const handlerSubmit = function (evt) {
  evt.preventDefault()
  let delay = Number(selectors.delayInput.value);
  let step = Number(selectors.stepInput.value);
  let amount = Number(selectors.amountInput.value);
    for(let pos = 1; pos <= amount; pos +=1){
      if(pos > 1){
        delay += step;
      };
      createPromise(pos, delay)
    }
};
form.addEventListener('submit', handlerSubmit);

function createPromise(pos, delay) {
 setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ pos, delay });
    } else {
      reject({ pos, delay });
    }
  });
  promise.then(({ pos, delay }) => {
    Notify.success(`✅ Fulfilled promise ${pos} in ${delay}ms`);
  })
  .catch(({ pos, delay }) => {
    Notify.failure(`❌ Rejected promise ${pos} in ${delay}ms`);
  });
;
 }, delay)
}
