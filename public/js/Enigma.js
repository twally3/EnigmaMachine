import Light from './Light.js';
import Rotor from './Rotor.js';

export default class Enigma {
  constructor(ctx, letterOrder = 'qwertyuiopasdfghjklzxcvbnm') {
    this.ctx = ctx;

    this.letterOrder = letterOrder;
    this.letters = this.letterOrder.split('').map((letter) => new Light(letter));
    this.keyDown = null;

    this.rotors = ['DMTWSILRUYQNKFEJCAZBPGXOHV', 'HQZGPJTMOBLNCIFDYAWVEUSRKX', 'UQNTLSZFMREHDPXKIBVYGJCWOA'].map(string => new Rotor(string));
    this.rotorSpacing = 50;
    this.rotorSize = 30;
    this.rotorY = 100;
    this.totalRotorWidth = (this.rotors.length * this.rotorSize) + (this.rotors.length - 1) * this.rotorSpacing;

    this.endThing = new Rotor('VKWRGIETFZBUSPQNODMHLACYXJ');

    this.addKeyListeners();
    this.addRotorClickListener();
  }

  addRotorClickListener() {
    this.ctx.canvas.addEventListener('click', (e) => {
      const { x, y } = e;

      this.rotors.forEach((rotor, i) => {
        const rotorX = (this.ctx.canvas.width / 2) + (this.totalRotorWidth / 2 - this.rotorSize) - (this.rotorSize + this.rotorSpacing) * i;
        if (!(rotorX <= x && rotorX + this.rotorSize >= x)) return;
        // TODO: Fix hardcoded vertical spacing!
        if (this.rotorY - 10 - this.rotorSize <= y && this.rotorY - 10 >= y) rotor.incriment();
        else if (this.rotorY + 10 + this.rotorSize * 2 >= y && this.rotorY + 10 + this.rotorSize <= y) rotor.decrement();
      });
    });
  }

  addKeyListeners() {
    document.addEventListener('keydown', ({ key }) => {
      if (this.keyDown || !this.isValidKey(key, this.letterOrder)) return;
      const encodedKey = this.processLetter(key);
      this.keyDown = this.letters.find(light => light.char === encodedKey);
      if (this.keyDown) this.keyDown.isOn = true;
    });

    document.addEventListener('keyup', ({ key }) => {
      if (!this.keyDown || this.keyDown.char !== this.processLetter(key)) return;
      this.keyDown.isOn = false;
      this.keyDown = null;

      this.rotors.reduce((current, rotor, i) => i === 0 || current === true ? rotor.incriment() : false, false);
    });
  }

  isValidKey(key, lettersString) {
    return lettersString.split('').indexOf(key) !== -1;
  }

  processLetter(letter) {
    const firstPass = this.rotors.reduce((current, rotor) => rotor.pass(current), letter);
    const returnPass = this.endThing.pass(firstPass);
    const endPass = this.rotors.slice(0).reverse().reduce((current, rotor) => rotor.pass(current, true), returnPass);

    return endPass;
  }

  draw() {
    this.letters.forEach((letter, i) => {
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

      letter.draw(this.ctx, x, y, radius);
    });

    this.rotors.forEach((rotor, i) => {
      const x = (this.ctx.canvas.width / 2) + (this.totalRotorWidth / 2 - this.rotorSize) - (this.rotorSize + this.rotorSpacing) * i;
      rotor.draw(this.ctx, x, this.rotorY, this.rotorSize);
    });
  }
}