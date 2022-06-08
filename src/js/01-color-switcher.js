import getRandomHexColor from './random-color';

const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

let timerId = null;

refs.startButton.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  refs.startButton.setAttribute('disabled', true);
});

refs.stopButton.addEventListener('click', () => {
  clearInterval(timerId);
  refs.startButton.removeAttribute('disabled');
});
