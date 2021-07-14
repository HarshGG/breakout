var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };
 
var canvas = document.createElement('canvas');
var width = 825;
var height = 500;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
 
 
window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
  };
 
var step = function() {
    update();
    render();
    animate(step);
};
 
var update = function() {
  ball.update(player.paddle);
  player.update();
  bricks.update(ball);
};
 
//animation and canvas end
 
//player and ball logic
 
var player = new Player();
var ball = new Ball(400, 320);
var bricks = new Bricks();
var render = function() {
  context.fillStyle = "#042b38";
  context.fillRect(0, 0, width, height);
  bricks.render();
  player.render();
  ball.render();
  context.font = "20px Georgia";
  context.fillText(ball.x + " " + ball.y, 600 , 300);
};
 
Ball.prototype.update = function(paddle1) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;
 
  if(this.x - 5 < 0) { // hitting the left wall
    this.x = 5;
    this.x_speed = -this.x_speed;
  } else if(this.x + 5 > 825) { // hitting the right wall
    this.x = 820;
    this.x_speed = -this.x_speed;
  }
 
  if(this.y - 5 < 0) { // top wall
    this.y_speed = -this.y_speed;
    this.y = 5;
  }
 
  if(this.y + 5>500){//bottom wall
    this.y_speed = 3;
    this.x_speed = 0;
    this.x = 400;
    this.y = 250;
  }
 
  if(top_y > 300) {
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      // hit the player's paddle
      this.y_speed = -3;
      this.x_speed += (paddle1.x_speed / 3);
      this.y += this.y_speed;
    }
  } 
};
 
Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 37) { // left arrow
      this.paddle.move(-6, 0);
    } else if (value == 39) { // right arrow
      this.paddle.move(6, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }
};
 
Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.x < 0) { // all the way to the left
    this.x = 0;
    this.x_speed = 0;
  } else if (this.x + this.width > width) { // all the way to the right
    this.x = width-this.width;
    this.x_speed = 0;
  }
}
//player and ball logic end
 
//player and ball declaration
 
function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
  }
  
Paddle.prototype.render = function() {
context.fillStyle = "#fefcff";
context.fillRect(this.x, this.y, this.width, this.height);
};
 
function Player() {
    this.paddle = new Paddle(350, 450, 150, 15);
 }
 
 Player.prototype.render = function() {
    this.paddle.render();
  };
 
  function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 8;
  }
  
  Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#2ed8db";
    context.fill();
  };
 
//player and ball declaration end
 
 
//keyListener
var keysDown = {};
 
window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});
 
window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});
 
//keyListener end

//bricks

function Bricks(){
    var rows, columns, brickWidth, brickHeight, spacing;
    this.rows = 4;
    this.columns = 8;
    this.smallColumns = 16;
    this.brickWidth = 55;
    this.smallWidth = 20;
    this.brickHeight = 25;
    this.spacing = 40;
    this.smallSpacing = 15;
    this.brickCoords = setBrickCoords(this.rows, this.columns, this.brickWidth, this.brickHeight, this.spacing, this.smallColumns,this.smallWidth,this.smallSpacing);
  }
 
function setBrickCoords(rows, columns, brickWidth, brickHeight, spacing, smallColumns, smallWidth, smallSpacing){
  ///console.log(rows);
  var brickCoords = [];
  for(var r=0; r<rows; r+=2) {
    brickCoords[r] = [];
    for(var c=0; c<columns; c++) {
        brickCoords[r][c] = { x: 0, y: 0, show: 1};
        var brickX = (c*(brickWidth+spacing)+spacing);
        var brickY = (r*(brickHeight+spacing)+spacing);
        brickCoords[r][c].x = brickX;
        brickCoords[r][c].y = brickY;
    }
  }
  for(var r=1; r<rows; r+=2) {
    brickCoords[r] = [];
    for(var c=0; c<smallColumns; c++) {
        brickCoords[r][c] = { x: 0, y: 0, show: 1};
        var brickX;
        if(c==0)
            brickX = spacing;
        else if(c%2==0){
            brickX = brickCoords[r][c-1].x+smallWidth+spacing;
        }
        else if(c%2!=0)
            brickX = brickCoords[r][c-1].x+smallWidth+smallSpacing;
        var brickY = (r*(brickHeight+spacing)+spacing);
        brickCoords[r][c].x = brickX;
        brickCoords[r][c].y = brickY;
    }
  }
  return brickCoords;
};

  
Bricks.prototype.render = function(){
  
  for(var r = 0;r<this.rows; r+=2){
    for(var c = 0; c<this.columns; c++){
      if(this.brickCoords[r][c].show==1){
      var brickX = this.brickCoords[r][c].x;
      var brickY = this.brickCoords[r][c].y;
      context.fillStyle = "#10eb18";
      context.fillRect(brickX, brickY, this.brickWidth, this.brickHeight);
      }
    }
  }

  for(var r = 1;r<this.rows; r+=2){
    for(var c = 0; c<this.smallColumns; c++){
      if(this.brickCoords[r][c].show==1){
      var brickX = this.brickCoords[r][c].x;
      var brickY = this.brickCoords[r][c].y;
      context.fillStyle = "#eb6b34";
      context.fillRect(brickX, brickY, this.smallWidth, this.brickHeight);
      }
    }
  }
};

Bricks.prototype.update = function(b) {
  for(var r=0; r<this.rows; r+=2) {
    for(var c=0; c<this.columns; c++) {
        if(this.brickCoords[r][c].show==1){
        var brickX = this.brickCoords[r][c].x;
        var brickY = this.brickCoords[r][c].y;
        var ballX = b.x;
        var ballY = b.y;
        if(brickX<ballX+b.radius && ballX-b.radius<brickX+this.brickWidth && brickY<ballY-b.radius && ballY-b.radius<brickY+this.brickHeight){
          b.y_speed = -b.y_speed;
          this.brickCoords[r][c].show = 0;
          }
        }
    }
  }

  for(var r=1; r<this.rows; r+=2) {
    for(var c=0; c<this.smallColumns; c++) {
        if(this.brickCoords[r][c].show==1){
        var brickX = this.brickCoords[r][c].x;
        var brickY = this.brickCoords[r][c].y;
        var ballX = b.x;
        var ballY = b.y;
        if(brickX<ballX+b.radius && ballX-b.radius<brickX+this.smallWidth && brickY<ballY-b.radius && ballY-b.radius<brickY+this.brickHeight){
          b.y_speed = -b.y_speed;
          this.brickCoords[r][c].show = 0;
          }
        }
    }
  }
};

//bricks end