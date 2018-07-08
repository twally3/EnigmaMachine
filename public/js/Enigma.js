import Light from './Light.js';
import Rotor from './Rotor.js';

export default class Enigma {
  constructor(ctx, letterOrder = 'qwertyuiopasdfghjklzxcvbnm') {
    this.ctx = ctx;
    this.letterOrder = letterOrder;
    this.letters = this.addLetters();
    this.keyDown = null;
    this.rotors = ['DMTWSILRUYQNKFEJCAZBPGXOHV', 'HQZGPJTMOBLNCIFDYAWVEUSRKX', 'UQNTLSZFMREHDPXKIBVYGJCWOA'].map(string => new Rotor(string));
    // this.rotors = [new Rotor('DMTWSILRUYQNKFEJCAZBPGXOHV'), new Rotor('HQZGPJTMOBLNCIFDYAWVEUSRKX'), new Rotor('UQNTLSZFMREHDPXKIBVYGJCWOA')];
    this.endThing = new Rotor('VKWRGIETFZBUSPQNODMHLACYXJ');

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
    this.letters.forEach(letter => letter.draw(this.ctx));
    
    const rotorSpacing = 50;
    const rotorSize = 30;
    const totalRotorWidth = (this.rotors.length * rotorSize) + (this.rotors.length - 1) * rotorSpacing;

    this.rotors.forEach((rotor, i) => {
      const x = (this.ctx.canvas.width / 2) + (totalRotorWidth / 2 - rotorSize) - (rotorSize + rotorSpacing) * i;
      const y = 100;
      rotor.draw(this.ctx, x, y, rotorSize);
    });
  }
}