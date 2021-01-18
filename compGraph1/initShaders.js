function initShaders(gl, vertexShaderId, fragmentShaderId){
	  
var vertShdr;
var fragShdr;

var vertElem = document.getElementById( vertexShaderId );
if ( !vertElem ) {
   alert( "Unable to load the vertex shader!" );
   return -1;
}
else {
   vertShdr = gl.createShader( gl.VERTEX_SHADER );
   gl.shaderSource( vertShdr, vertElem.text );
   gl.compileShader( vertShdr );
   if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {
      alert( "Vertex shader failed to compile!" );
      return -1;
   }
}


var fragElem = document.getElementById( fragmentShaderId );
if ( !fragElem ) {
   alert( "Unable to load fragment shader!" );
   return -1;
}
else {
   fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
   gl.shaderSource( fragShdr, fragElem.text );
   gl.compileShader( fragShdr );
   if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
      alert( "Fragment shader failed to compile!" );
      return -1;
   }
}


var program = gl.createProgram();
gl.attachShader( program, vertShdr );
gl.attachShader( program, fragShdr );
gl.linkProgram( program );

if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
   alert( "Shader program failed to link!" );
   return -1;
}
return program;
};