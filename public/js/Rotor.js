export default class Rotor {
  constructor(connections = 'abcdefghijklmnopqrstuvwxyz', currentIndex = 0) {
    // TODO: Limit this to 0 - 25 maybe even set by letter!
    this.currentIndex = currentIndex;
    this.letterIndexes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    this.connections = this.convertConnections(connections.toLowerCase());
  }

  convertConnections(connections) {
    return connections.split('').map((connection, i) => [i, this.letterIndexes.indexOf(connection)]);
  }

  pass(char, forward = false) {
    const letterIndex = this.letterIndexes.indexOf(char);

    if (forward) {
      const input = (letterIndex + this.currentIndex) % this.connections.length;
      return this.letterIndexes[this.connections[input][1]];
    } else {
      const connection = this.connections.find(connection => connection[1] === letterIndex);
      let output = connection[0] - this.currentIndex;

      while (output < 0) output = 26 + output;
      output = output % 26;

      return this.letterIndexes[output];
    }
  }

  incriment() {
    if (this.currentIndex === this.letterIndexes.length - 1) {
      this.currentIndex = 0;
      return true;
    }
    this.currentIndex++;
    return false;
  }

  decrement() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.letterIndexes.length - 1;
      return true;
    }
    this.currentIndex--;
    return false;
  }

  draw(ctx, x, y, size) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x, y, size, size);

    ctx.fillStyle = '#AAAAAA';
    ctx.fillRect(x, y + size + 10, size, size);
    ctx.fillRect(x, y - size - 10, size, size);

    ctx.textAlign='center';
    ctx.textBaseline='middle'; 
    ctx.font='20px arial';
    ctx.fillStyle = '#000000';
    ctx.fillText(this.currentIndex, x + size/2, y + size/2);
    
    ctx.fillText(this.currentIndex <=0 ? this.currentIndex + 26 - 1 : this.currentIndex - 1, x + size/2, y + size/2 + size + 10);
    ctx.fillText((this.currentIndex + 1) % this.letterIndexes.length, x + size/2, y + size/2 - size - 10);

  }
}