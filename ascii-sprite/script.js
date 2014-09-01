window.onload = function(){
  // some variables
  var r, g, b, gray;
  var character, line = "";

  // sprite stuff
  var sprite = document.getElementById("sprite");
  var W = sprite.width;
  var H = sprite.height;

  // temporary canvas for pixel processing
  var tcanvas = document.createElement("canvas");
  tcanvas.width = W;
  tcanvas.height = H;
  var tc = tcanvas.getContext("2d");
  // painting the canvas white before painting the image to deal with pngs
  tc.fillStyle = "white";
  tc.fillRect(0, 0, W, H);
  // drawing the image on the canvas
  tc.drawImage(sprite, 0, 0, W, H);

  // accessing pixel data
  var pixels = tc.getImageData(0, 0, W, H);
  var colourdata = pixels.data;
  // every pixel gives 4 integers (r g b a)
  // so length of colourdata array is W*H*4
  var ascii = document.getElementById("ascii");
  for(var i=0; i<colourdata.length; i = i+4){
    r = colourdata[i];
    g = colourdata[i+1]
    b = colourdata[i+2]
    //converting the pixel into greyscale
    gray = r*0.2126 + g*0.7152 + b*0.0722;
    // overwriting the colordata array with greyscale values
    colourdata[i] = colourdata[i+1] = colourdata[i+2] = gray;

    // text for ascii art
    // black = dense characters like 'W' and '@'
    // white = lights characters like "'" and ","
    if(gray > 250)character = " "; //almost white
    else if(gray > 230)character = "`";
    else if(gray > 200)character = ":";
    else if(gray > 175)character = "*";
    else if(gray > 150)character = "+";
    else if(gray > 125)character = "#";
    else if(gray > 50)character = "W";
    else character = "@"; // almost black

    //newlines and injection into DOM
    if(i !=0 && (i/4)%W ==0) //if the pointer reaches the end of the pixel line
    {
      ascii.appendChild(document.createTextNode(line));
      // newline
      ascii.appendChild(document.createElement("br"));
      // emptying line for the next row of pixels
      line="";
    }

    line += character;

  }
  // repainting the grey image
  //tc.putImageData(pixels, 0, 0);


  // injecting the canvas into the DOM
  // ... ... insertBefore(newitem, existing item);
  // sprite.parentNode.insertBefore(tcanvas, sprite);



  // animations
  var frames =10; // there are 10 images in this sprite
  var container = document.getElementById("container");
  var frame_width = parseInt(window.getComputedStyle(container).width)/frames; // width of container should allow only 1 frame to be seen

  //window.getComputedStyle is supported in Chrome, FF, Opera, and IE9+
  //The width has "px" at the end so parseInt is used to remove that
  container.style.width = frame_width+"px";

  // change the left of ascii to move it
  ascii.style.marginLeft = "0";

  setInterval(loop, 150)

  function loop(){
    var current_margin_left = parseInt(ascii.style.marginLeft);
    // if the ascii reaches the final frame (9th in this case), margin needs to reset to 0
    // frame_width *(10-1)* -1 (because we are taking the margin negative)
    if(current_margin_left == frame_width*(frames-1)*-1)
      ascii.style.marginLeft ="0";
    else
    ascii.style.marginLeft = parseFloat(ascii.style.marginLeft) - frame_width + "px";
  }

}