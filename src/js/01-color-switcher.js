const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let id = null;
console.log(start, stop);
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const onclick = function () {
  start.disabled = true;
  stop.disabled = false;
  id = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};
const onStop = function () {
  clearInterval(id);
  start.disabled = false;
  stop.disabled = true;
};
start.addEventListener('click', onclick);
stop.addEventListener('click', onStop);
