import Light from './Light.js';

export default class Enigma {
  constructor(ctx, letterOrder='qwertyuiopasdfghjklzxcvbnm') {
    this.ctx = ctx;
    this.letterOrder = letterOrder;
    this.letters = this.addLetters();
    this.keyDown = null;

    document.addEventListener('keydown', ({ key }) => {
      if (this.keyDown) return;
      const encodedKey = this.processLetter(key);
      this.keyDown = this.letters.find(light => light.char === encodedKey);
      if (this.keyDown) this.keyDown.isOn = true;
    });

    document.addEventListener('keyup', ({ key }) => {
      if (!this.keyDown || this.keyDown.char !== this.processLetter(key)) return;
      this.keyDown.isOn = false;
      this.keyDown = null;
      // TODO: Incriment the rotors
    });
  }

  processLetter(letter) {
    return letter;
  }

  addLetters() {
    return this.letterOrder.split('').map((letter, i) => {
      let x, y;
      const radius = 25, spacing = 10;
      const xOffset = this.ctx.canvas.width / 2 - (10 * (radius * 2 + spacing) / 2);
      const yOffset = 0.75 * this.ctx.canvas.height;

      if (i <= 9) {
        x = i * (radius * 2 + spacing) + xOffset;
        y = yOffset + (radius * 2 + spacing) * 0;
      } else if (i <= 18) {
        x = (i % 10) * (radius * 2 + spacing) + 30 + xOffset;
        y = yOffset + (radius * 2 + spacing) * 1;
      } else {
        x = (i % 19) * (radius * 2 + spacing) + 60 + xOffset;
        y = yOffset + (radius * 2 + spacing) * 2;
      }

      return new Light(letter, x, y, radius);
    });
  }

  draw() {
    this.letters.forEach(letter => {
      letter.draw(this.ctx);
    });
  }
}