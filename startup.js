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
    startup();
  };

function startup(){
    context.fillStyle = "#042b38";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "#42c2f5"
    context.font = "50px Georgia";
    context.fillText('BREAKOUT', 250 , 60);

    context.font = "16px Georgia";
    context.fillText('ALL TYPES OF BRICKS EXPLAINED', 10 , 200);

    context.fillStyle = "#10eb18";
    context.fillRect(10, 210, 55, 25);
    context.fillStyle = "#eb6b34";
    context.fillRect(70, 210, 20, 25);
    context.fillStyle = "#42c2f5";
    context.fillStyle = "#ffffff";
    context.font = "16px Georgia";
    context.fillText(': Regular bricks', 95 , 230);

    context.fillStyle = "#b302aa";
    context.fillRect(10, 240, 55, 25);
    context.font = "14px Georgia";
    context.fillStyle = "#000000";
    context.fillText("3", 34, 255);
    context.fillStyle = "#0868bd";

    context.fillRect(70, 240, 20, 25);
    context.font = "14px Georgia";
    context.fillStyle = "#ffffff";
    context.fillText("3", 77, 255);
    context.font = "16px Georgia";
    context.fillText(': Bricks that take a specific number of hits (or less if hit with a high velocity)', 95 , 260);


    context.fillStyle = "#edaf3b";
    context.fillRect(10, 270, 55, 25);
    context.fillStyle = "#ffffff";
    context.font = "16px Georgia";
    context.fillText(': Bricks that take out all other bricks in its row', 95 , 290);

    context.fillStyle = "#cf0826";
    context.fillRect(10, 300, 55, 25);
    context.fillStyle = "#ffffff";
    context.font = "16px Georgia";
    context.fillText(': Bricks that revive all other bricks in its row', 95 , 320);

    context.fillStyle = "#fc03ca";
    context.fillRect(10, 330, 20, 25);
    context.fillStyle = "#ffffff";
    context.font = "16px Georgia";
    context.fillText(": Bricks that double the ball's vertical speed", 95 , 350);
}
