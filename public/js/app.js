import Timer from './Timer.js';
import Enigma from './Enigma.js';

const canvas = document.getElementById('enigma');
const ctx = canvas.getContext('2d');

const enigma = new Enigma(ctx);

const timer = new Timer(1 / 60);

timer.update = function update(_deltaTime) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  enigma.draw();
};

timer.start();