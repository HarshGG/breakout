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
 
var gameOver = false;
 
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
  if(!gameOver){
    ball.update(player.paddle);
    player.update();
    bricks.update(ball);
  }
};
 
//animation and canvas end

//eventListener
function init(){
  document.getElementById('to-level-2').addEventListener('click', function(evt){
      if(numBricksLeft>0){
        evt.preventDefault();
        alert("Complete this level before proceeding");
        return false;
      }
  });
}

//eventListener end
 
//player and ball logic
 
var player = new Player();
var ball = new Ball(400, 320);
var bricks = new Bricks();
var lives = new Lives();
var numBricksLeft = 32;

var render = function() {
  if(lives.num>0){
    if(numBricksLeft>0){
      context.fillStyle = "#042b38";
      context.fillRect(0, 0, width, height);
      bricks.render();
      player.render();
      ball.render();
      lives.render();
    }
    else{
      gameOver = true;
      context.fillStyle = "#042b38";
      context.fillRect(0, 0, width, height);
      context.fillStyle = "#ffffff";
      context.font = "50px Georgia";
      context.fillText('YOU WON!!!', 250 , 120);
    }
  }
  else{
    gameOver = true;
    context.fillStyle = "#042b38";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "#ffffff";
    context.font = "50px Georgia";
    context.fillText('GAME OVER', 250 , 120);
  }
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
    lives.removeLife();
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
  this.brickWidth = 55;
  this.brickHeight = 25;
  this.spacing = 40;
  this.brickCoords = setBrickCoords(this.rows, this.columns, this.brickWidth, this.brickHeight, this.spacing);
}
 
function setBrickCoords(rows, columns, brickWidth, brickHeight, spacing){
  ///console.log(rows);
  var brickCoords = [];
  for(var r=0; r<rows; r++) {
    //console.log("row = " + r);
    brickCoords[r] = [];
    for(var c=0; c<columns; c++) {
      //console.log("col = " + c);
        if(r%2!=0 && c%2!=0 && c<columns-1){
            brickCoords[r][c] = { x: 0, y: 0, show: 1, type: 1, hitsLeft: 3};
            var brickX = (c*(brickWidth+spacing)+spacing);
            var brickY = (r*(brickHeight+spacing)+spacing);
            brickCoords[r][c].x = brickX;
            brickCoords[r][c].y = brickY;
        }
        else if(r==0 && c==7){
            brickCoords[r][c] = { x: 0, y: 0, show: 1, type: 2, hitsLeft: 1};
            var brickX = (c*(brickWidth+spacing)+spacing);
            var brickY = (r*(brickHeight+spacing)+spacing);
            brickCoords[r][c].x = brickX;
            brickCoords[r][c].y = brickY;
        }
        else{
            brickCoords[r][c] = { x: 0, y: 0, show: 1, type: 0, hitsLeft: 1};
            var brickX = (c*(brickWidth+spacing)+spacing);
            var brickY = (r*(brickHeight+spacing)+spacing);
            brickCoords[r][c].x = brickX;
            brickCoords[r][c].y = brickY;
        }
    }
  }
  return brickCoords;
};

  
Bricks.prototype.render = function(){
  
  for(var r = 0;r<this.rows; r++){
    for(var c = 0; c<this.columns; c++){
      if(this.brickCoords[r][c].show==1){
        if(this.brickCoords[r][c].type==1){
            var brickX = this.brickCoords[r][c].x;
            var brickY = this.brickCoords[r][c].y;
            if(this.brickCoords[r][c].hitsLeft==3)
                context.fillStyle = "#b302aa";
            else if(this.brickCoords[r][c].hitsLeft==2)
                context.fillStyle = "#cc3fc5";
            else
                context.fillStyle = "#d479cf";
            context.fillRect(brickX, brickY, this.brickWidth, this.brickHeight);
            context.font = "14px Georgia";
            context.fillStyle = "#000000";
            context.fillText(""+this.brickCoords[r][c].hitsLeft, (brickX + this.brickWidth/2) - 3, (brickY + this.brickHeight/2) + 2);
        }
        else if(this.brickCoords[r][c].type==2){
            var brickX = this.brickCoords[r][c].x;
            var brickY = this.brickCoords[r][c].y;
            context.fillStyle = "#edaf3b";
            context.fillRect(brickX, brickY, this.brickWidth, this.brickHeight);
        }
        else{
            var brickX = this.brickCoords[r][c].x;
            var brickY = this.brickCoords[r][c].y;
            context.fillStyle = "#10eb18";
            context.fillRect(brickX, brickY, this.brickWidth, this.brickHeight);
            }
        }  
    }
  }
};

Bricks.prototype.update = function(b) {
  for(var r=0; r<this.rows; r++) {
    for(var c=0; c<this.columns; c++) {
        if(this.brickCoords[r][c].show==1){
        var brickX = this.brickCoords[r][c].x;
        var brickY = this.brickCoords[r][c].y;
        var ballX = b.x;
        var ballY = b.y;
        if(brickX<ballX+b.radius && ballX-b.radius<brickX+this.brickWidth && brickY<ballY-b.radius && ballY-b.radius<brickY+this.brickHeight){
          if(this.brickCoords[r][c].type==0){
            b.y_speed = -b.y_speed;
            this.brickCoords[r][c].show = 0;
            numBricksLeft--;
            }
          else if(this.brickCoords[r][c].type==2){
                b.y_speed = -b.y_speed;
                for(var s = 0;s<this.columns;s++){
                  if(this.brickCoords[r][s].show==1){
                    this.brickCoords[r][s].show = 0;
                    numBricksLeft--;
                  }
                }
            }
          else{
            b.y_speed = -b.y_speed;
            this.brickCoords[r][c].hitsLeft = this.brickCoords[r][c].hitsLeft - 1;
            if(this.brickCoords[r][c].hitsLeft == 0){
                  this.brickCoords[r][c].show = 0;
                  numBricksLeft--;
            }
          }
          }
        }
    }
  }
};

//bricks end

//lives

function Lives(){
    this.num = 3;
}

Lives.prototype.render = function(){
    context.font = "18px Georgia";
    context.fillText("Lives: ", 680 , 27);
    for(var x = 0;x<this.num;x++){
    context.beginPath();
    context.arc(750 + 20 * x, 20, 7, 2 * Math.PI, false);
    context.fillStyle = "#f54275";
    context.fill();
        //context.drawImage("\C:\Users\ritzr\Desktop\Senior school\csindepent\labsafterjan1\breakout\textures\heart.png", 800, 20, 15, 15);
    }
}

Lives.prototype.removeLife = function(){
    if(this.num>-1)
        this.num = this.num-1
}

//lives end