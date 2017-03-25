var lock = {
  circles : [],
  lines : [],
  password : ""
};

function Circle (x, y, radius, touched, code) {
  this.x = x;
  this.y = y;
  this.radius = radius; 
  this.touched = touched;
  this.code = code;
}

function Line(startPoint,endPoint){
  this.startPoint = startPoint;
  this.endPoint = endPoint;
}

function drawCircle (ctx, x, y, radius, touched) {
  if (touched) {
    ctx.fillStyle = "#f7b500";
    ctx.strokeStyle = "#fc7814";
  } else {
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#ccc";
  }
  ctx.beginPath();
  ctx.arc(x,y,radius,0,Math.PI*2,true);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#f43030";
  ctx.stroke();
}

//主循环
function loop() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");

  //清空画布
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for (var i = 0; i < lock.lines.length; i++) {
    var line = lock.lines[i];
    var startPoint = line.startPoint;
    var endPoint = line.endPoint;
    drawLine(ctx,startPoint.x,startPoint.y,endPoint.x,endPoint.y);
  }
  for (var i = 0; i < lock.circles.length; i++) {
    var circle = lock.circles[i];
    drawCircle(ctx,circle.x,circle.y,circle.radius,circle.touched);
  }
}

$(function(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;

  init();

  /*
   *  监听用户事件
   */
  canvas.addEventListener("touchstart",function(e){
    e.preventDefault();
    var _x=e.touches[0].pageX;
    var _y=e.touches[0].pageY;
    console.log("start",_x);
  });

  canvas.addEventListener("touchmove",function(e){
    var _x=e.touches[0].pageX;
    var _y=e.touches[0].pageY;
    console.log("move",_x);
  });

  canvas.addEventListener("touchend",function(e){
    var _x=e.changedTouches[0].pageX;
    var _y=e.changedTouches[0].pageY;
    console.log("end",_x);
  });

  //设置主循环
  setInterval(loop, 30);
});
