$(document).ready(function(){
  // Canvas
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();

  // Save cell width in a variable for easy control
  var cw = 10;
  var d = "right";

  // Create snake
  var snake_array; // array of cells to make the snake



  create_snake();
  function create_snake(){
    var length = 5;
    snake_array= []; // start with an empty array
    for(var i=length-1; i>=0; i--){
      snake_array.push({x:i, y:0});// This creates a horizontal snake, starting from top-left
    }
  }

  // Paint the snake (and canvas)
  function paint(){
    // To avoid seeing all old snake body cells colouring up the canvas, we need to repaint it each time:
    // Paiting the canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

    // Movement code:
    // Pop the tail cell and place it in front of the head cell
    var nx = snake_array[0].x;
    var ny = snake_array[0].y;
    // This is the head cell position
    // Increment it to get the new head position by using nx++
    // Add direction-based movement:
    if(d =="right") nx ++;
    else if(d =="left") nx--;
    else if(d =="up") ny--;
    else if(d == "down") ny++;

    // Game Over clauses
    // If snake hits the wall:
    if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw){
      //restart game
      return;
    }

    var tail = snake_array.pop(); //pops out the last cell
    tail.x = nx;
    tail.y = ny;
    snake_array.unshift(tail); // adds tail to start of array

    for(var i=0; i<snake_array.length; i++){
      var c = snake_array[i];
      // paint 10px-wide cells
      ctx.fillStyle = "limegreen";
      ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
      ctx.strokeStyle = "white";
      ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);
    }
  }

  // Keyboard controls
  $(document).keydown(function(e){
    var key = e.which;
    // the && d!= etc prevents reversing
    if(key == "37" && d != "right") d = "left";
    else if(key == "38" && d != "down") d = "up";
    else if(key == "39" && d != "left") d = "right";
    else if(key == "40" && d != "up") d = "down";
  });

  // Move snake using a timer (which will trigger the paint function)
  game_loop = setInterval(paint, 60); //every 60ms

  paint();

})