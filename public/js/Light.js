export default class Light {
  constructor(char) {
    this.char = char;
    this.isOn = false;
  }

  draw(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.lineWidth='2';
    ctx.fillStyle = this.isOn ? '#FFFF66' : '#FFFFFF';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.textAlign='center';
    ctx.textBaseline='middle'; 
    ctx.font='20px arial';
    ctx.fillStyle = '#000000';
    ctx.fillText(this.char.toUpperCase(), x, y);
  }
}