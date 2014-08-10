$(document).ready(function(){
  // Canvas stuff
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();

  // Save the cell width in a variable for easy control
  var cw = 10;

  // Paiting the canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, w, h);

  // Create the snake
  var snake_array; // array of cells to make the snake
  create_snake();
  function create_snake(){
    var length = 5;
    snake_array= []; // start with an empty array
    for(var i=length-1; i>=0; i--){
      snake_array.push({x:i, y:0});// This creates a horizontal snake, starting from top-left
    }
  }

  // Paint the snake
  function paint(){
    // To avoid seeing all old snake body cells colouring up the canvas, we need to repaint it each time:

    // Movement code:
    // Pop the tail cell and place it in front of the head cell
    var nx = snake_array[0].x;
    var ny = snake_array[0].y;
    // This is the head cell position
    // Increment it to get the new head position:
    nx ++;

    var tail = snake_array.pop(); //pops out the last cell
    tail.x = nx;
    snake_array.unshift(tail); // puts the tail back as the first cell

    for(var i=0; i<snake_array.length; i++){
      var c = snake_array[i];
      // paint 10px-wide cells
      ctx.fillStyle = "limegreen";
      ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
      ctx.strokeStyle = "white";
      ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);
    }
  }
  // Move snake using a timer (which will trigger the paint function)
  game_loop = setInterval(paint, 60); //every 60ms

  paint();

})