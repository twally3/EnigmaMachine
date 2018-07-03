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
}