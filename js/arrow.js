var Ball = function (x, y, vx, vy) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.dt = 25;  // 1000/25 = 40 frame per second

  // var self = this;
  // in es6
  setInterval(() => {
    this.x +=vx;                 //this inside setInterval is not equal to this inside Ball
    this.y +=vy;
    console.log(this.x, this.y);

  }, this.dt);
  /*
  setInterval( function() {
    this.x +=vx;                 //this inside setInterval is not equal to this inside Ball
    this.y +=vy;
    console.log(this.x, this.y);
    /*
    self.x +=vx;
    self.y +=vy;
    console.log(self.x, self.y);

  }.bind( this ), this.dt);      //bind is callback function
  */
}

//var ball = new Ball (0, 0, 1, 1);

var hello = () => "Hello World";

console.log(hello());
