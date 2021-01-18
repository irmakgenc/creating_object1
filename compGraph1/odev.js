var gl;
var theta;
var thetaLoc;
var translationLocX;
var translationLocY;
var translationX;
var translationY;
var scale;
var scaleLoc;
var red;
var green;
var blue;
var redValLoc;
var greenValLoc;
var blueValLoc;
var valueLoc;

window.onload = function init() {

  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
  gl = WebGLUtils.setupWebGL(canvas);
  // Only continue if WebGL is available and working
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
  
var program = initShaders(gl,"vertex-shader","fragment-shader");
gl.useProgram( program );

window.addEventListener("keydown", 
   function(event) {
      switch (event.keyCode) {
         case 107: // ’+’ key
            scale *= 1.2;
            break;
		case 109: // ’-’ key
            scale *= 0.6;
            break;
      }
   });



document.getElementById("redSlider").onchange = function() {red = this.value;};

document.getElementById("greenSlider").onchange = function() {green = this.value;};

document.getElementById("blueSlider").onchange = function() {blue = this.value;};


var m = document.getElementById("mymenu");
m.addEventListener("click", function() {
	switch (m.selectedIndex) {
		case 0:
			theta += 0.1;
			break;
		case 1:
			theta += -0.1;
			break;
		case 2:
			translationX += 0.1;
			break;
		case 3:
			translationX += -0.1;
			break;
		case 4:
			translationY += 0.1;
			break;
		case 5:
			translationY += -0.1;
			break;
	}
});

//initial square vertex coordinates
var vertices = [ vec2(-0.6, 0.6), 
                 vec2(-0.4, 0.6),
                 vec2(-0.6,-0.6),
				 vec2(-0.4, 0.6),
                 vec2(-0.6,-0.6),
				 vec2(-0.4,-0.6),
				 vec2(0.6, 0.2 ),
				 vec2(0.6, 0.4 ),
				 vec2(0.4, 0.4 ),
				 vec2(0.6, 0.4 ),
				 vec2(0.4, 0.4 ),
				 vec2(0.4, 0.6 ),
				 vec2(0.4, 0.4 ),
				 vec2(0.4, 0.6 ),
				 vec2(0.2, 0.6 ),
				 vec2(0.4, 0.4 ),
				 vec2(0.2, 0.6 ),
				 vec2(0.2, 0.4 ),
				 vec2(0.2, 0.6 ),
				 vec2(0.2, 0.4 ),
				 vec2(0.0, 0.4 ),
				 vec2(0.2, 0.4 ),
				 vec2(0.0, 0.4 ),
				 vec2(0.0, -0.4),
				 vec2(0.2, 0.4 ),
				 vec2(0.0, -0.4),
				 vec2(0.2, -0.4),
				 vec2(0.0, -0.4),
				 vec2(0.2, -0.4),
				 vec2(0.2, -0.6),
				 vec2(0.2, -0.4), 
                 vec2(0.2, -0.6),
                 vec2(0.4, -0.4),
				 vec2(0.2, -0.6),
                 vec2(0.4, -0.4),
				 vec2(0.4, -0.6),
				 vec2(0.4, -0.4),
				 vec2(0.4, -0.6),
				 vec2(0.6, -0.4),
				 vec2(0.4, -0.4),
				 vec2(0.6, -0.4),
				 vec2(0.6, -0.2),
				 vec2(0.25, -0.7),
				 vec2(0.25, -0.8),
				 vec2(0.35, -0.8),
				 vec2(0.25, -0.7),
				 vec2(0.35, -0.7),
				 vec2(0.35, -0.8),];
				 

 				 
var bufferId = gl.createBuffer(); // creating a buffer in gpu.
gl.bindBuffer( gl.ARRAY_BUFFER, bufferId ); //changes only state. it represents current buffer.
gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW ); //sending vertices to the gpu.


//associate out shader variables with out data buffer
var vPosition = gl.getAttribLocation( program, "vPosition" ); //we find the vPosition attribute inside the shader program.
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 ); //how vPosition will be send, send 2 float values.
gl.enableVertexAttribArray( vPosition ); //if i have correct buffer(bufferData), it will be enabled.

thetaLoc = gl.getUniformLocation(program, "theta"); //allows us to access uniform variable called theta in the shader program. 
theta = 0; //at first, we will get original points no rotation.
gl.uniform1f(thetaLoc,theta); //sends the data theta(1 float value) to the uniform variable in the shader.

translationLocX = gl.getUniformLocation(program, "translationX"); //allows us to access uniform variable called translationX in the shader program.
translationX = 0; //at first, no translation.
gl.uniform1f(translationLocX,translationX); //sends the translationX to the uniform variable in the shader.

translationLocY = gl.getUniformLocation(program, "translationY"); //allows us to access uniform variable called translationY in the shader program.
translationY = 0; //at first, no translation.
gl.uniform1f(translationLocY,translationY); //sends the translationY to the uniform varible in the shader.

scaleLoc = gl.getUniformLocation(program, "scale"); //allows us to access uniform variable called scale in the shader program.
scale = 1; //scale default value is 1 because it multiply with other values.
gl.uniform1f(scaleLoc, scale); //sends the scale to the uniform variable in the shader.

redValLoc = gl.getUniformLocation(program, "redValue"); //allows us to access uniform variable called redValue in the shader program.
red = 0.0; 
gl.uniform1f(redValLoc,red); //sends the red to the uniform variable in the shader.

greenValLoc = gl.getUniformLocation(program, "greenValue"); //allows us to access uniform variable called greenValue in the shader program.
green = 0.0;
gl.uniform1f(greenValLoc,green); //sends the green to the uniform variable in the shader.

blueValLoc = gl.getUniformLocation(program, "blueValue"); //allows us to access uniform variable called blueValue in the shader program.
blue = 0.0;
gl.uniform1f(blueValLoc,blue); //sends the blue to the uniform variable in the shader.

  gl.clearColor(0.8, 1, 0.8, 1.0);
	requestAnimFrame(render);
};

function render(){
	
	  // Clear the color buffer with specified clear color
	  gl.clear(gl.COLOR_BUFFER_BIT);
	  gl.uniform1f(thetaLoc, theta); //update theta  in the shader.
	  gl.uniform1f(translationLocX,translationX); //update translationX  in the shader.
	  gl.uniform1f(translationLocY,translationY); //update translationY  in the shader.
	  gl.uniform1f(scaleLoc,scale); //update scale  in the shader.
	  gl.uniform1f(redValLoc,red); //update red  in the shader.
	  gl.uniform1f(greenValLoc,green); //update green  in the shader.
	  gl.uniform1f(blueValLoc,blue); //update blue  in the shader.
	  gl.drawArrays( gl.TRIANGLES , 0 , 48); //use 48 points.
	  
	  requestAnimFrame(render);	 
}	