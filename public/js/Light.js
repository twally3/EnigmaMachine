export default class Light {
  constructor(char, x, y, radius) {
    this.char = char;
    this.radius = radius;
    this.pos = { x, y };
    this.isOn = false;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.lineWidth='2';
    ctx.fillStyle = this.isOn ? '#FFFF66' : '#FFFFFF';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.textAlign='center';
    ctx.textBaseline='middle'; 
    ctx.font='20px arial';
    ctx.fillStyle = '#000000';
    ctx.fillText(this.char.toUpperCase(), this.pos.x, this.pos.y);
  }
}